"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { GLTFLoader, DRACOLoader, GLTF } from "three-stdlib";

const TYPING_BONES = [
  "thighL", "thighR", "shinL", "shinR", "forearmL", "forearmR",
  "handL", "handR", "f_pinky03R", "f_pinky02L", "f_pinky02R", "f_pinky01L",
  "f_pinky01R", "palm04L", "palm04R", "f_ring01L", "thumb01L", "thumb01R",
  "thumb03L", "thumb03R", "palm02L", "palm02R", "palm01L", "palm01R",
  "f_index01L", "f_index01R", "palm03L", "palm03R", "f_ring02L", "f_ring02R",
  "f_ring01R", "f_ring03L", "f_ring03R", "f_middle01L", "f_middle02L",
  "f_middle03L", "f_middle01R", "f_middle02R", "f_middle03R", "f_index02L",
  "f_index03L", "f_index02R", "f_index03R", "thumb02L", "f_pinky03L",
  "upper_armL", "upper_armR", "thumb02R", "toeL", "heel02L", "toeR", "heel02R",
];

/* ============================================================
   Scroll progress — a single source of truth, smoothed.
   Phase 0 = Landing (centered, close).
   Phase 1 = About (slide left, zoom out).
   Phase 2 = WhatIDo (slide up off screen).
   ============================================================ */
const scrollState = {
  raw: 0,
  smoothed: 0,
};

function useGlobalScrollTracker() {
  useEffect(() => {
    const update = () => {
      scrollState.raw = window.scrollY / window.innerHeight;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ============================================================
   Decryption — friend's AES-CBC scheme
   ============================================================ */
async function deriveAesKey(password: string) {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashed = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashed.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
}

async function loadEncryptedGLB(url: string, password: string): Promise<GLTF> {
  const res = await fetch(url);
  const encrypted = await res.arrayBuffer();
  const iv = new Uint8Array(encrypted.slice(0, 16));
  const body = encrypted.slice(16);
  const key = await deriveAesKey(password);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    body
  );

  const blob = new Blob([decrypted]);
  const blobUrl = URL.createObjectURL(blob);

  const loader = new GLTFLoader();
  const draco = new DRACOLoader();
  draco.setDecoderPath("/draco/");
  loader.setDRACOLoader(draco);

  return new Promise<GLTF>((resolve, reject) => {
    loader.load(
      blobUrl,
      (gltf) => {
        URL.revokeObjectURL(blobUrl);
        draco.dispose();
        resolve(gltf);
      },
      undefined,
      (err) => {
        URL.revokeObjectURL(blobUrl);
        reject(err);
      }
    );
  });
}

function filterClipByBones(clip: THREE.AnimationClip, bones: string[]) {
  const filtered = clip.tracks.filter((t) => bones.some((b) => t.name.includes(b)));
  return new THREE.AnimationClip(clip.name + "_filtered", clip.duration, filtered);
}


/* ============================================================
   Scroll-driven camera + character rotation (inside Canvas)
   ============================================================ */
function ScrollDrivenCamera({
  modelRef,
  monitorMatRef,
  screenLightRef,
}: {
  modelRef: React.MutableRefObject<THREE.Group | null>;
  monitorMatRef: React.MutableRefObject<THREE.Material[] | null>;
  screenLightRef: React.MutableRefObject<THREE.Material | null>;
}) {
  const { camera, size } = useThree();

  useEffect(() => {
    const pc = camera as THREE.PerspectiveCamera;
    pc.fov = 14.5;
    pc.aspect = size.width / size.height;
    pc.near = 0.1;
    pc.far = 1000;
    pc.position.set(0, 13.1, 24.7);
    pc.zoom = 1.1;
    pc.rotation.set(0, 0, 0);
    pc.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  useFrame(() => {
    // Smooth the scroll value for buttery animation
    scrollState.smoothed = lerp(scrollState.smoothed, scrollState.raw, 0.1);
    const s = scrollState.smoothed;

    const pc = camera as THREE.PerspectiveCamera;

    // Camera Z & Y: phase 0→1 (Landing→About) zoom slightly,
    // phase 1→2 (About→WhatIDo) zoom WAY out to show full desk.
    let targetZ = 24.7;
    let targetY = 13.1;
    if (s < 1) {
      targetZ = lerp(24.7, 22, s);
    } else if (s < 2) {
      const t = s - 1;
      targetZ = lerp(22, 75, t);
      targetY = lerp(13.1, 8.4, t);
    } else {
      targetZ = 75;
      targetY = 8.4;
    }
    pc.position.z = lerp(pc.position.z, targetZ, 0.1);
    pc.position.y = lerp(pc.position.y, targetY, 0.1);

    // Character body rotation — matches friend's GSAP timeline
    if (modelRef.current) {
      let targetRotY = 0;
      let targetRotX = 0;
      if (s < 1) {
        targetRotY = s * 0.7;
      } else if (s < 2) {
        const t = s - 1;
        targetRotY = lerp(0.7, 0.92, t);
        targetRotX = lerp(0, 0.12, t);
      } else {
        targetRotY = 0.92;
        targetRotX = 0.12;
      }
      modelRef.current.rotation.y = lerp(modelRef.current.rotation.y, targetRotY, 0.1);
      modelRef.current.rotation.x = lerp(modelRef.current.rotation.x, targetRotX, 0.1);
    }

    // Monitor + screen light: invisible during Landing, fade in during About
    let targetMonitorOpacity = 0;
    if (s >= 1.2) {
      targetMonitorOpacity = Math.min(1, (s - 1.2) / 0.4);
    }
    if (monitorMatRef.current) {
      monitorMatRef.current.forEach((mat) => {
        mat.opacity = lerp(mat.opacity, targetMonitorOpacity, 0.1);
      });
    }
    if (screenLightRef.current) {
      screenLightRef.current.opacity = lerp(
        screenLightRef.current.opacity,
        targetMonitorOpacity,
        0.1
      );
    }
  });

  return null;
}

/* ============================================================
   Loaded model — plays the same clips friend's project plays
   ============================================================ */
function LoadedModel({
  gltf,
  groupRef,
  monitorMatRef,
  screenLightRef,
}: {
  gltf: GLTF;
  groupRef: React.MutableRefObject<THREE.Group | null>;
  monitorMatRef: React.MutableRefObject<THREE.Material[] | null>;
  screenLightRef: React.MutableRefObject<THREE.Material | null>;
}) {
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const headRef = useRef<THREE.Object3D | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    gltf.scene.traverse((c) => {
      const mesh = c as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        mesh.frustumCulled = true;
      }
    });

    const footR = gltf.scene.getObjectByName("footR");
    const footL = gltf.scene.getObjectByName("footL");
    if (footR) footR.position.y = 3.36;
    if (footL) footL.position.y = 3.36;

    headRef.current = gltf.scene.getObjectByName("spine006") || null;

    // Friend's trick: hide the monitor and screen light initially.
    // They fade in only during the About scroll, so the character's
    // face is fully visible at Landing.
    const monitorMats: THREE.Material[] = [];
    const plane004 = gltf.scene.getObjectByName("Plane004");
    if (plane004) {
      plane004.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.Material;
        if (mat) {
          mat.transparent = true;
          mat.opacity = 0;
          monitorMats.push(mat);
        }
      });
    }
    monitorMatRef.current = monitorMats;

    const screenLight = gltf.scene.getObjectByName("screenlight") as THREE.Mesh;
    if (screenLight) {
      const mat = screenLight.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.transparent = true;
        mat.opacity = 0;
        screenLightRef.current = mat;
      }
    }

    const mixer = new THREE.AnimationMixer(gltf.scene);
    mixerRef.current = mixer;

    const intro = gltf.animations.find((c) => c.name === "introAnimation");
    if (intro) {
      const introAction = mixer.clipAction(intro);
      introAction.setLoop(THREE.LoopOnce, 1);
      introAction.clampWhenFinished = true;
      introAction.play();
    } else {
      console.warn(
        "introAnimation not found. Available clips:",
        gltf.animations.map((a) => a.name)
      );
    }

    ["key1", "key2", "key5", "key6"].forEach((name) => {
      const clip = THREE.AnimationClip.findByName(gltf.animations, name);
      if (clip) {
        const action = mixer.clipAction(clip);
        action.play();
        action.timeScale = 1.2;
      }
    });

    const typing = THREE.AnimationClip.findByName(gltf.animations, "typing");
    if (typing) {
      const filtered = filterClipByBones(typing, TYPING_BONES);
      const action = mixer.clipAction(filtered);
      action.enabled = true;
      action.timeScale = 1.2;
      action.play();
    }

    const blinkTimer = setTimeout(() => {
      const blink = gltf.animations.find((c) => c.name === "Blink");
      if (blink) mixer.clipAction(blink).play().fadeIn(0.5);
    }, 2500);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      clearTimeout(blinkTimer);
      window.removeEventListener("mousemove", onMove);
      mixer.stopAllAction();
    };
  }, [gltf]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
    if (headRef.current) {
      // mouse.current.y is +1 at bottom, -1 at top.
      // For the head bone, positive rotation.x tilts the chin DOWN,
      // negative tilts UP. So we want: rotation.x = mouse.y * scale.
      // (Friend's convention is the opposite mouse normalisation, but
      // the math collapses to the same sign here.)
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        mouse.current.y * 0.25,
        0.08
      );
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mouse.current.x * 0.3,
        0.08
      );
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function CharacterScene({
  modelRef,
  monitorMatRef,
  screenLightRef,
}: {
  modelRef: React.MutableRefObject<THREE.Group | null>;
  monitorMatRef: React.MutableRefObject<THREE.Material[] | null>;
  screenLightRef: React.MutableRefObject<THREE.Material | null>;
}) {
  const [gltf, setGltf] = useState<GLTF | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadEncryptedGLB("/character.enc", "Character3D#@")
      .then((g) => {
        if (!cancelled) setGltf(g);
      })
      .catch((e) => console.error("Character load failed:", e));
    return () => {
      cancelled = true;
    };
  }, []);

  return gltf ? (
    <LoadedModel
      gltf={gltf}
      groupRef={modelRef}
      monitorMatRef={monitorMatRef}
      screenLightRef={screenLightRef}
    />
  ) : null;
}

/* ============================================================
   Outer wrapper — drives the CSS transform/opacity (sits OUT of canvas)
   ============================================================ */
function useScrollDrivenWrapper(elRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let currentX = 0;
    let currentY = 0;
    let currentOpacity = 1;
    let rafId = 0;

    const tick = () => {
      const s = scrollState.smoothed;
      const vw = window.innerWidth;

      // Match friend's GSAP timeline:
      // s 0→1 (Landing): .character-model x: 0 → -25%
      // s 1→2 (About): x: -25% → -12% (settles)
      // s 2→3 (WhatIDo): y: 0 → -100% (slides up off-screen)
      let targetX = 0;
      let targetY = 0;
      let targetOpacity = 1;

      if (s < 1) {
        targetX = -0.25 * vw * s;
      } else if (s < 2) {
        const t = s - 1;
        targetX = lerp(-0.25 * vw, -0.12 * vw, t);
      } else if (s < 3) {
        const t = s - 2;
        targetX = -0.12 * vw;
        targetY = -window.innerHeight * t;
        targetOpacity = lerp(1, 0, t);
      } else {
        targetX = -0.12 * vw;
        targetY = -window.innerHeight;
        targetOpacity = 0;
      }

      currentX = lerp(currentX, targetX, 0.12);
      currentY = lerp(currentY, targetY, 0.12);
      currentOpacity = lerp(currentOpacity, targetOpacity, 0.12);

      el.style.setProperty("--char-x", `${currentX}px`);
      el.style.setProperty("--char-y", `${currentY}px`);
      el.style.setProperty(
        "--char-opacity",
        String(Math.max(0, Math.min(1, currentOpacity)))
      );
      el.style.visibility = currentOpacity < 0.01 ? "hidden" : "visible";

      rafId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(rafId);
  }, [elRef]);
}

const Character = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const monitorMatRef = useRef<THREE.Material[] | null>(null);
  const screenLightRef = useRef<THREE.Material | null>(null);

  useGlobalScrollTracker();
  useScrollDrivenWrapper(wrapRef);

  return (
    <div className="character-model" aria-hidden ref={wrapRef}>
      <div className="character-rim" />
      <Canvas
        shadows={false}
        dpr={[1, 1.5]}
        camera={{
          position: [0, 13.1, 24.7],
          fov: 14.5,
          near: 0.1,
          far: 1000,
          rotation: [0, 0, 0],
        }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
      >
        <ScrollDrivenCamera
          modelRef={modelRef}
          monitorMatRef={monitorMatRef}
          screenLightRef={screenLightRef}
        />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 7]}
          intensity={1.6}
          color="#d8c4ff"
        />
        <directionalLight
          position={[-6, 6, -4]}
          intensity={0.9}
          color="#7f40ff"
        />
        <pointLight position={[0, 6, 4]} intensity={1.4} color="#c2a4ff" />
        <Suspense fallback={null}>
          <Environment
            files="/char_enviorment.hdr"
            environmentIntensity={0.45}
          />
        </Suspense>
        <CharacterScene
          modelRef={modelRef}
          monitorMatRef={monitorMatRef}
          screenLightRef={screenLightRef}
        />
      </Canvas>
    </div>
  );
};

export default Character;

"use client";

import { useEffect } from "react";
import { profile } from "@/lib/data";
import { ResumeIcon } from "./Icons";

type Props = {
  onClose: () => void;
};

export default function ResumeModal({ onClose }: Props) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="resume-modal" role="dialog" aria-modal="true" aria-label="Resume">
      <div className="resume-modal-backdrop" onClick={onClose} aria-hidden />

      <div className="resume-modal-panel">
        <header className="resume-modal-header">
          <button type="button" className="resume-modal-return" onClick={onClose}>
            ← Return
          </button>

          <div className="resume-modal-title">
            <ResumeIcon />
            <span>Resume — {profile.name}</span>
          </div>

          <a
            className="resume-modal-download"
            href={profile.resume}
            download="Darshan_Shinde_Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Download PDF
          </a>
        </header>

        <div className="resume-modal-body">
          <iframe
            title="Darshan Shinde Resume"
            src={`${profile.resume}#toolbar=0&navpanes=0`}
            className="resume-modal-frame"
          />
        </div>
      </div>
    </div>
  );
}

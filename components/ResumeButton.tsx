"use client";

import { ResumeIcon } from "./Icons";
import { useResume } from "./ResumeContext";

type Props = {
  variant?: "navbar" | "landing" | "compact";
};

export default function ResumeButton({ variant = "navbar" }: Props) {
  const { openResume } = useResume();

  return (
    <button
      type="button"
      className={`resume-cta resume-cta--${variant}`}
      onClick={openResume}
      aria-label="Open resume"
    >
      <span className="resume-cta-glow" aria-hidden />
      <span className="resume-cta-inner">
        <ResumeIcon />
        <span>Resume</span>
      </span>
    </button>
  );
}

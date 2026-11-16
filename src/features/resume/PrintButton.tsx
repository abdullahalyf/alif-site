"use client";
import { resumeContent } from "@/content/resume";
export function PrintButton() {
  return (
    <button
      className="button button--secondary resume-print"
      onClick={() => window.print()}
    >
      {resumeContent.print}
    </button>
  );
}

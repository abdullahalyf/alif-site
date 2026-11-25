import { Resume } from "@/features/resume/Resume";
import { resumeContent as c } from "@/content/resume";
import { pageMetadata } from "@/seo/metadata";
import "./cv.css";

export const metadata = pageMetadata(c.title, c.description, "/cv");

export default function CvPage() {
  return (
    <div className="container page-shell cv-page">
      <Resume />
    </div>
  );
}

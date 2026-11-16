import { Resume } from '@/features/resume/Resume';
import { PrintButton } from '@/features/resume/PrintButton';
import { resumeContent as c } from '@/content/resume';
import { pageMetadata } from '@/seo/metadata';
import './resume.css';
export const metadata = pageMetadata(c.title, c.description, '/resume');
export default function ResumePage() { return <div className="container page-shell resume-page"><PrintButton/><Resume/></div>; }

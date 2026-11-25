import { aboutPage } from "@/content/site";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/motion";
import { AchievementPhoto } from "./achievement-photo";

export function AchievementsTable() {
  const a = aboutPage.achievements;
  return <section aria-labelledby="achievements-title" className="achievements">
    <SectionLabel>{a.label}</SectionLabel>
    <Reveal><h2 id="achievements-title" className="section-title">{a.title}</h2></Reveal>
    <div className="achievements-table-wrap">
      <table className="achievements-table">
        <thead><tr><th scope="col">{a.columns.year}</th><th scope="col">{a.columns.title}</th><th scope="col">{a.columns.org}</th><th scope="col">{a.columns.result}</th><th scope="col">{a.columns.photo}</th></tr></thead>
        <tbody>{a.rows.map((row) => <tr key={row.title}>
          <td data-label={a.columns.year}>{row.year}</td>
          <th scope="row" data-label={a.columns.title}>{row.title}</th>
          <td data-label={a.columns.org}>{row.org}</td>
          <td data-label={a.columns.result}>{row.result}</td>
          <td data-label={a.columns.photo}>{row.photo && <AchievementPhoto photo={row.photo} title={row.title} view={a.view} close={a.close} />}</td>
        </tr>)}</tbody>
      </table>
    </div>
  </section>;
}

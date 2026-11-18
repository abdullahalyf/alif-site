import { countryOutline, divisionBorders } from "./bangladesh-paths";

export function BangladeshOutline() {
  return <g>
    <path className="bangladesh-outline" d={countryOutline} fillRule="evenodd" vectorEffect="non-scaling-stroke" />
    <path className="bangladesh-divisions" d={divisionBorders} vectorEffect="non-scaling-stroke" />
  </g>;
}

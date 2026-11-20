type SystemDiagramProps = {
  /** Box labels, left to right. */
  steps: string[];
  /** Accessible label for the diagram. */
  label: string;
  /** Marks the diagram as a floating element that animates in. */
  float?: boolean;
  className?: string;
};

const BOX_WIDTH = 74;
const BOX_HEIGHT = 40;
const BOX_Y = 16;
const GAP = 18;
/** Padding so the box strokes and the longest label are not clipped. */
const PAD = 6;
/** Width of the diagram: four boxes, the gaps between them and side padding. */
const VIEWBOX_WIDTH = 4 * BOX_WIDTH + 3 * GAP + 2 * PAD;
const VIEWBOX_HEIGHT = BOX_Y + BOX_HEIGHT + 18;

export function SystemDiagram({ steps, label, float = false, className }: SystemDiagramProps) {
  const boxes = steps.map((text, index) => ({
    text,
    x: PAD + index * (BOX_WIDTH + GAP),
  }));

  const connectors = boxes.slice(0, -1).map((box, index) => {
    const from = box.x + BOX_WIDTH;
    const to = boxes[index + 1].x;
    const y = BOX_Y + BOX_HEIGHT / 2;
    return { id: `sync-${index}`, from, to, y };
  });

  return (
    <div className={className} role="img" aria-label={label} data-float={float ? "true" : undefined}>
      <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} width="100%" height="100%" focusable="false">
        {connectors.map((connector) => (
          <g key={connector.id}>
            <line
              x1={connector.from}
              y1={connector.y}
              x2={connector.to}
              y2={connector.y}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.5"
            />
            <circle
              data-travel="true"
              r="2.5"
              cx={connector.from}
              cy={connector.y}
              fill="currentColor"
            />
          </g>
        ))}
        {boxes.map((box) => (
          <g key={box.text}>
            <rect
              x={box.x}
              y={BOX_Y}
              width={BOX_WIDTH}
              height={BOX_HEIGHT}
              rx="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.65"
            />
            <text
              x={box.x + BOX_WIDTH / 2}
              y={BOX_Y + BOX_HEIGHT / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="13"
              fill="currentColor"
            >
              {box.text}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

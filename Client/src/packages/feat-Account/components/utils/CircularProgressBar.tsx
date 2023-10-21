import { CSSProperties, FC } from "react";


/* CircularProgressBar.css */
const style: Record<string, CSSProperties> = {
  circularprogressbar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: '0 2% 0 1%',
    paddingBottom: '16px',
  },
  svg: {
    transform: "rotate(-90deg)",
  },
  circle: {
    fill: "rgba(215, 227, 239, 0.804)",
    stroke: "#dde7f2",
    strokeWidth: "6",
    strokeLinecap: "round",
    transition: "stroke-dashoffset 0.3s",
  },
  percentage: {
      fontSize: "29px",
  },
};

interface CircularProgressBarProps {
  progress: number;
}

const  CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress }) => {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div style={style.circularprogressbar}>
      <svg style={style.svg} width="120" height="120">
        <circle
          r="50"
          cx="60"
          cy="60"
        />
        <circle
          style={Object.assign({
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            },
            style.circle
          )}
          r="47.2"
          cx="60"
          cy="60"
        />
        <text
          style={style.percentage}
          x="60"
          y="60"
          textAnchor="middle"
          dominantBaseline="middle"
          transform="rotate(90 60 60)"
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
};

export default CircularProgressBar;

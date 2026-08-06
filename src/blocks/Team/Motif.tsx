import React from "react";

/**
 * The woven-ribbon motif that runs down the right edge of the team section.
 *
 * The export is 302x2440: three straight ribbons, one stretch where they cross,
 * then the three ribbons again with cyan and purple on swapped sides. Drawn once
 * it gives a single crossing however tall the section is, so instead the crossing
 * is cut out and tiled down the whole column.
 *
 * The crop is 840..2010: it has to hold the whole weave (outermost points y=844
 * and y=1997) and still have every ribbon present at both edges so consecutive
 * tiles have something to meet. Everything outside it is clipped away, which is
 * what stops each tile from also painting the full-length bars.
 *
 * Tiles alternate with a mirrored copy, because one pass swaps cyan and purple —
 * so a plain repeat would jump colours at every seam. Mirroring about x=305 (not
 * 302: the artwork's top and bottom ribbons sit 3 units apart) lands all three
 * ribbons exactly on their neighbours, and the pair then repeats indefinitely.
 */
const VIEW_W = 302;
const WEAVE_TOP = 840;
const WEAVE_BOTTOM = 2010;

/** One crossing. Also the pitch: the zig-zag repeats every TILE_H user units. */
export const TILE_H = WEAVE_BOTTOM - WEAVE_TOP;

/** Mirror axis that makes a flipped tile interlock with an unflipped one. */
const MIRROR_X = 305;

/**
 * Straight ribbon between one crossing and the next, in the same user units as
 * TILE_H — raise it to space the crossings further apart, drop it to nothing to
 * have them run back to back. At the lane widths used here 600 works out to
 * roughly 260px of straight run on desktop.
 */
const STRAIGHT_RUN = 600;

/** Distance from one crossing to the next. */
const PITCH = TILE_H + STRAIGHT_RUN;

const RIBBON_W = 73;

/**
 * Where the three ribbons sit in the straight stretches. A crossing swaps cyan
 * and purple, so the run below an upright tile is the mirror of the run below a
 * flipped one — these are the two tile exits, and each gap uses whichever its
 * tile handed it.
 */
const RUN_AFTER_UPRIGHT = [
  { x: 5, fill: "#5F0058" },
  { x: 116, fill: "#E84935" },
  { x: 229, fill: "#5ED9FC" },
];

const RUN_AFTER_MIRRORED = [
  { x: 3, fill: "#5ED9FC" },
  { x: 116, fill: "#E84935" },
  { x: 227, fill: "#5F0058" },
];

/**
 * How many crossings are drawn. They are `<use>` references to a single group,
 * so the cost is a few nodes rather than a copy of the artwork each time; the
 * column clips whatever it does not need.
 */
const TILES = 16;

const WEAVE_PATHS = (
  <>
    <path d="M300 962L300 719.788L300 242.212L300 -2.56426e-05L227 -3.19389e-05L227 242.212L227 719.788L227 962L300 962Z" fill="#5F0058"/>
    <path d="M300 1755.56L236.97 1693.75L112.69 1571.88L49.6601 1510.07L1.00046 1557.79L64.0308 1619.6L188.31 1741.47L251.34 1803.28L300 1755.56Z" fill="#5F0058"/>
    <path d="M300 1359.31L236.97 1297.5L112.69 1175.63L49.6601 1113.82L1.00046 1161.53L64.0308 1223.34L188.31 1345.21L251.34 1407.02L300 1359.31Z" fill="#5F0058"/>
    <path d="M301 1216.11L237.97 1154.3L113.69 1032.43L50.6601 970.62L2.00046 1018.34L65.0308 1080.15L189.31 1202.02L252.34 1263.83L301 1216.11Z" fill="#E84935"/>
    <path d="M189 929.512L189 695.845L189 234.155L189 1.57611e-05L116 9.4648e-06L116 234.155L116 695.845L116 930L189 929.512Z" fill="#E84935"/>
    <path d="M189.004 1898L154.274 1863.94L85.7965 1796.79L51.0669 1762.74L2.00538 1810.85L36.7351 1844.9L105.213 1912.05L139.942 1946.11L189.004 1898Z" fill="#E84935"/>
    <path d="M301 1612.36L237.97 1550.55L113.69 1428.68L50.6601 1366.87L2.00046 1414.59L65.0308 1476.4L189.31 1598.27L252.34 1660.08L301 1612.36Z" fill="#E84935"/>
    <path d="M76 892L76 670.183L76.0001 232.817L76.0001 11L3 11L2.99998 232.817L2.99994 670.183L2.99992 892L76 892Z" fill="#5ED9FC"/>
    <path d="M302 1089.47L238.97 1027.75L114.69 906.052L51.6601 844.331L3.00046 891.98L66.0308 953.701L190.31 1075.4L253.34 1137.12L302 1089.47Z" fill="#5ED9FC"/>
    <path d="M3 1287.08L66.0304 1225.36L190.31 1103.66L253.34 1041.94L302 1089.59L238.969 1151.31L114.69 1273.01L51.6596 1334.73L3 1287.08Z" fill="#5ED9FC"/>
    <path d="M302 1881.04L238.97 1819.32L114.69 1697.62L51.6601 1635.9L3.00046 1683.55L66.0308 1745.27L190.31 1866.97L253.34 1928.69L302 1881.04Z" fill="#5ED9FC"/>
    <path d="M3 1682.96L66.0304 1621.23L190.31 1499.53L253.34 1437.81L302 1485.46L238.969 1547.18L114.69 1668.88L51.6596 1730.6L3 1682.96Z" fill="#5ED9FC"/>
    <path d="M302 1485.35L238.97 1423.63L114.69 1301.93L51.6601 1240.21L3.00046 1287.85L66.0308 1349.58L190.31 1471.27L253.34 1533L302 1485.35Z" fill="#5ED9FC"/>
    <path d="M2 1017.56L36.8577 983.38L105.588 915.982L140.445 881.799L189 929.5L154.247 963.698L85.5173 1031.1L50.6596 1065.28L2 1017.56Z" fill="#E84935"/>
    <path d="M2 1413.99L65.0304 1352.18L189.31 1230.31L252.34 1168.5L301 1216.22L237.969 1278.03L113.69 1399.9L50.6596 1461.71L2 1413.99Z" fill="#E84935"/>
    <path d="M2 1810.25L65.0304 1748.44L189.31 1626.57L252.34 1564.76L301 1612.48L237.969 1674.29L113.69 1796.16L50.6596 1857.97L2 1810.25Z" fill="#E84935"/>
    <path d="M5 2440L4.99999 2316.38L4.99997 2072.62L4.99996 1949L78 1949L78 2072.62L78 2316.38L78 2440L5 2440Z" fill="#5F0058"/>
    <path d="M116 2439.72L116 2303.54L116 2034.46L116 1898L189 1898L189 2034.46L189 2303.54L189 2440L116 2439.72Z" fill="#E84935"/>
    <path d="M229 2440L229 2299.26L229 2021.74L229 1881L302 1881L302 2021.74L302 2299.26L302 2440L229 2440Z" fill="#5ED9FC"/>
    <path d="M5 1949L66.9558 1888.24L189.116 1768.45L251.072 1707.7L300 1755.68L238.044 1816.43L115.884 1936.22L53.9278 1996.98L5 1949Z" fill="#5F0058"/>
    <path d="M0 1557.3L63.0483 1495.48L187.363 1373.57L250.411 1311.75L299.339 1359.72L236.29 1421.55L111.976 1543.46L48.9278 1605.28L0 1557.3Z" fill="#5F0058"/>
    <path d="M1 1159.56L64.003 1097.78L188.228 975.958L251.231 914.176L300 962L236.997 1023.78L112.772 1145.6L49.7688 1207.38L1 1159.56Z" fill="#5F0058"/>
  </>
);

/**
 * `uid` keeps the clip and group ids unique — two team blocks on one page would
 * otherwise both answer to the same `#weave`.
 */
export const TeamMotif: React.FC<{ className?: string; uid: string }> = ({
  className,
  uid,
}) => {
  const weaveId = `team-weave-${uid}`;
  const clipId = `team-weave-clip-${uid}`;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${VIEW_W} ${PITCH * TILES}`}
      preserveAspectRatio="xMidYMin meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        {/* Half a unit of slack top and bottom. The ribbons run straight through
            the seam, so neighbouring tiles overlapping by that much is invisible —
            whereas clipping exactly on the boundary leaves a hairline of
            antialiased edge showing at every join. */}
        <clipPath id={clipId}>
          <rect x="0" y="-0.5" width={VIEW_W} height={TILE_H + 1} />
        </clipPath>
        <g id={weaveId} clipPath={`url(#${clipId})`}>
          <g transform={`translate(0, ${-WEAVE_TOP})`}>{WEAVE_PATHS}</g>
        </g>
      </defs>

      {Array.from({ length: TILES }, (_, i) => {
        const top = i * PITCH;
        const upright = i % 2 === 0;

        return (
          <React.Fragment key={i}>
            <use
              href={`#${weaveId}`}
              transform={
                upright
                  ? `translate(0, ${top})`
                  : `translate(${MIRROR_X}, ${top}) scale(-1, 1)`
              }
            />
            {/* The straight run below this crossing, in whichever order the
                crossing left the ribbons. Overlapped by half a unit at the join
                for the same reason the tile clip is. */}
            {(upright ? RUN_AFTER_UPRIGHT : RUN_AFTER_MIRRORED).map((r) => (
              <rect
                key={r.fill}
                x={r.x}
                y={top + TILE_H - 0.5}
                width={RIBBON_W}
                height={STRAIGHT_RUN + 1}
                fill={r.fill}
              />
            ))}
          </React.Fragment>
        );
      })}
    </svg>
  );
};

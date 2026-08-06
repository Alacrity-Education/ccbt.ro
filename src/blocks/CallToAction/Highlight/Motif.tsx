import React from "react";

/**
 * Decorative woven-ribbon motif for the Highlight CTA. Verbatim from the export.
 * Colors are the brand palette used in the artwork. Purely decorative, so aria-hidden.
 */
export const HighlightMotif: React.FC<{ className?: string; viewBoxHeight?: number }> = ({
  className,
  viewBoxHeight = 975,
}) => (
  <svg
    className={className}
    viewBox={`0 0 204 ${viewBoxHeight}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    preserveAspectRatio="xMidYMin meet"
  >
    <path d="M202.004 826L202.004 863.515L202.004 937.485L202.004 975L153.004 975L153.004 937.485L153.004 863.515L153.004 826L202.004 826Z" fill="#E84935" />
    <path d="M202.41 290.553L159.885 332.254L76.0355 414.479L33.5099 456.18L0.680082 423.986L43.2056 382.285L127.055 300.061L169.58 258.359L202.41 290.553Z" fill="#E84935" />
    <path d="M202.41 557.898L159.885 599.599L76.0355 681.824L33.5099 723.525L0.680082 691.332L43.2056 649.63L127.055 567.406L169.58 525.704L202.41 557.898Z" fill="#E84935" />
    <path d="M203.082 654.511L160.556 696.213L76.7074 778.437L34.1818 820.139L1.35196 787.945L43.8775 746.243L127.727 664.019L170.252 622.318L203.082 654.511Z" fill="#5F0058" />
    <path d="M128 848.067L128 879.976L128 943.024L128 975L78 975L78 943.024L78 879.976L78 848L128 848.067Z" fill="#5F0058" />
    <path d="M127.52 194.451L104.088 217.428L57.8872 262.734L34.4557 285.711L1.35471 253.252L24.7862 230.274L70.987 184.969L94.4186 161.991L127.52 194.451Z" fill="#5F0058" />
    <path d="M203.082 387.166L160.556 428.868L76.7074 511.092L34.1818 552.793L1.35196 520.6L43.8775 478.898L127.727 396.674L170.252 354.972L203.082 387.166Z" fill="#5F0058" />
    <path d="M51 873L51 898.681L51 949.319L51 975L2 975L2 949.319L1.99999 898.681L1.99999 873L51 873Z" fill="#5ED9FC" />
    <path d="M203.758 739.951L161.232 781.593L77.3831 863.701L34.8576 905.344L2.02774 873.196L44.5533 831.553L128.402 749.445L170.928 707.803L203.758 739.951Z" fill="#5ED9FC" />
    <path d="M2.02734 606.627L44.5529 648.27L128.402 730.378L170.928 772.02L203.757 739.872L161.232 698.23L77.3828 616.122L34.8572 574.479L2.02734 606.627Z" fill="#5ED9FC" />
    <path d="M203.758 205.891L161.232 247.533L77.3831 329.641L34.8576 371.284L2.02774 339.136L44.5533 297.493L128.402 215.385L170.928 173.742L203.758 205.891Z" fill="#5ED9FC" />
    <path d="M2.02734 339.538L44.5529 381.18L128.402 463.288L170.928 504.931L203.757 472.782L161.232 431.14L77.3828 349.032L34.8572 307.389L2.02734 339.538Z" fill="#5ED9FC" />
    <path d="M203.758 472.861L161.232 514.503L77.3831 596.611L34.8576 638.254L2.02774 606.106L44.5533 564.463L128.402 482.355L170.928 440.713L203.758 472.861Z" fill="#5ED9FC" />
    <path d="M1.35156 788.467L24.8695 811.529L71.2405 857.002L94.7584 880.064L127.517 847.882L104.07 824.808L57.6993 779.336L34.1814 756.274L1.35156 788.467Z" fill="#5F0058" />
    <path d="M1.35156 521.003L43.8771 562.704L127.726 644.929L170.252 686.63L203.082 654.437L160.556 612.735L76.707 530.511L34.1814 488.809L1.35156 521.003Z" fill="#5F0058" />
    <path d="M1.35156 253.654L43.8771 295.355L127.726 377.58L170.252 419.281L203.082 387.087L160.556 345.386L76.707 263.162L34.1814 221.46L1.35156 253.654Z" fill="#5F0058" />
    <path d="M3 20L3 55.2491L2.99999 124.751L2.99999 160L53 160L53 124.751L53 55.2491L53 20L3 20Z" fill="#E84935" />
    <path d="M78 0.102833L78 49.3487L78 146.651L78 196L128 196L128 146.651L128 49.3487L128 3.7725e-06L78 0.102833Z" fill="#5F0058" />
    <path d="M155 20L155 66.8309L155 159.169L155 206L204 206L204 159.169L204 66.8309L204 20L155 20Z" fill="#5ED9FC" />
    <path d="M3.375 160.042L45.1756 201.032L127.595 281.855L169.396 322.845L202.407 290.474L160.606 249.484L78.1864 168.661L36.3858 127.67L3.375 160.042Z" fill="#E84935" />
    <path d="M0 424.313L42.5376 466.026L126.411 548.274L168.948 589.987L201.959 557.616L159.421 515.903L75.5484 433.655L33.0108 391.942L0 424.313Z" fill="#E84935" />
    <path d="M0.675781 692.665L43.1829 734.348L126.996 816.537L169.503 858.22L202.406 825.955L159.899 784.271L76.0864 702.083L33.5793 660.399L0.675781 692.665Z" fill="#E84935" />
  </svg>
);

/**
 * The phone-sized motif: a chain of diagonals stepping down and to the right,
 * rather than the woven column the wide layout uses. Verbatim from the export
 * apart from the drop shadows — the three filters there are identical except for
 * their bounds, so one region generous enough to cover every path replaces all
 * three (the same trim the timeline's vertical rail got).
 *
 * The artwork's own paths run past the right edge of the 612-wide viewBox; that
 * is by design, the chain is meant to be cut off there.
 */
export const HighlightMotifMobile: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    className={className}
    viewBox="0 0 612 2025"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    preserveAspectRatio="xMinYMin meet"
  >
    <g filter="url(#cta_hl_mobile_shadow)">
      <path d="M257.937 581.513L263.728 587.313L516.305 840.29L603.736 752.72L351.16 499.743L345.368 493.943L342.43 491L254.999 578.57L257.937 581.513Z" fill="#5F0058" />
      <path d="M23.0293 -3.77994L34.2651 7.47368L524.305 498.29L611.736 410.72L121.696 -80.0961L110.461 -91.3497L104.76 -97.0593L17.3287 -9.48958L23.0293 -3.77994Z" fill="#5F0058" />
      <path d="M275.937 947.513L281.728 953.313L534.305 1206.29L621.736 1118.72L369.16 865.743L363.368 859.943L360.43 857L272.999 944.57L275.937 947.513Z" fill="#5F0058" />
    </g>
    <path d="M604.691 928.863L540.157 864.226L413.044 736.911L348.587 672.353L261.156 759.923L325.612 824.481L452.726 951.796L517.26 1016.43L604.691 928.863Z" fill="#E84935" />
    <path d="M604.535 578.51L540.001 513.873L412.887 386.558L348.431 322L261 409.57L325.456 474.128L452.569 601.443L517.104 666.08L604.535 578.51Z" fill="#E84935" />
    <path d="M772.999 1437.41L670.841 1335.09L469.621 1133.55L367.587 1031.35L280.156 1118.92L382.19 1221.12L583.41 1422.66L685.568 1524.98L772.999 1437.41Z" fill="#E84935" />
    <defs>
      <filter
        id="cta_hl_mobile_shadow"
        x="-40"
        y="-140"
        width="720"
        height="1420"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="fx" />
        <feBlend mode="normal" in="SourceGraphic" in2="fx" result="shape" />
      </filter>
    </defs>
  </svg>
);

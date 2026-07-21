// "use client"

// /**
//  * BacoolaLogo — Custom SVG wordmark in Mango style.
//  *
//  * Design: Bold uppercase letters with thin diagonal white cross-cut marks
//  * slicing through each letter's main vertical stroke — the signature detail
//  * of premium fashion brands like Mango.
//  */

// type Props = {
//   className?: string
//   height?: number
// }

// export default function BacoolaLogo({ className = "", height = 30 }: Props) {
//   // Diagonal white cut positions — one per letter B,A,C,O,O,L,A
//   // cx = x-center of each letter's main vertical/dominant stroke
//   const cuts = [
//     { cx: 20,  label: "B" },
//     { cx: 57,  label: "A" },
//     { cx: 91,  label: "C" },
//     { cx: 126, label: "O" },
//     { cx: 163, label: "O" },
//     { cx: 197, label: "L" },
//     { cx: 232, label: "A" },
//   ]

//   return (
//     <svg
//       viewBox="0 0 260 44"
//       height={height}
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//       aria-label="Bacoola"
//       role="img"
//     >
//       {/* Base text: bold, tight tracking — Mango-style wordmark */}
//       <text
//         x="130"
//         y="36"
//         textAnchor="middle"
//         fontFamily='"Helvetica Neue", Helvetica, Arial, sans-serif'
//         fontSize="36"
//         fontWeight="800"
//         letterSpacing="3"
//         fill="#111111"
//       >
//         BACOOLA
//       </text>

//       {/* White diagonal cross-cut marks — the signature fashion detail */}
//       {cuts.map(({ cx, label }) => (
//         <rect
//           key={label + cx}
//           x={cx - 2}
//           y="-6"
//           width="4"
//           height="56"
//           fill="white"
//           transform={`rotate(18, ${cx}, 22)`}
//         />
//       ))}
//     </svg>
//   )
// }


"use client"

"use client"

type Props = {
  className?: string
  height?: number
}

export default function BacoolaLogo({
  className = "",
  height = 34,
}: Props) {
  return (
    <svg
      viewBox="0 0 340 52"
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Bacoola"
    >
      <defs>
        <style>
          {`
            .logo-text{
              font-family:
                Inter,
                "Avenir Next",
                "Helvetica Neue",
                Helvetica,
                Arial,
                sans-serif;
              font-size:40px;
              font-weight:700;
              letter-spacing:5px;
              fill:#111;
            }

            .cut{
              fill:white;
            }
          `}
        </style>
      </defs>

      <text
        x="170"
        y="39"
        textAnchor="middle"
        className="logo-text"
      >
        BACOOLA
      </text>

      {/* Original subtle accent cuts */}
      <rect
        className="cut"
        x="41"
        y="3"
        width="1.5"
        height="46"
        rx="1"
        transform="rotate(12 42 26)"
      />

      <rect
        className="cut"
        x="96"
        y="3"
        width="1.5"
        height="46"
        rx="1"
        transform="rotate(12 97 26)"
      />

      <rect
        className="cut"
        x="153"
        y="3"
        width="1.5"
        height="46"
        rx="1"
        transform="rotate(12 154 26)"
      />

      <rect
        className="cut"
        x="208"
        y="3"
        width="1.5"
        height="46"
        rx="1"
        transform="rotate(12 209 26)"
      />

      <rect
        className="cut"
        x="263"
        y="3"
        width="1.5"
        height="46"
        rx="1"
        transform="rotate(12 264 26)"
      />
    </svg>
  )
}
// }

// type Props = {
//   className?: string
//   height?: number
// }

// export default function BacoolaLogo({
//   className = "",
//   height = 30,
// }: Props) {
//   return (
//     <svg
//       viewBox="0 0 285 44"
//       height={height}
//       className={className}
//       xmlns="http://www.w3.org/2000/svg"
//       role="img"
//       aria-label="Bacoola"
//     >
//       <text
//         x="142.5"
//         y="33"
//         textAnchor="middle"
//         fontFamily='"Inter","Helvetica Neue",Arial,sans-serif'
//         fontSize="34"
//         fontWeight="600"
//         letterSpacing="1.5"
//         fill="#111"
//       >
//         BACOOLA
//       </text>

//       {[
//         18, 53, 87, 122, 157, 191, 225
//       ].map((x, i) => (
//         <rect
//           key={i}
//           x={x}
//           y="-6"
//           width="1.4"
//           height="58"
//           rx="0.7"
//           fill="#fff"
//           transform={`rotate(14 ${x} 22)`}
//         />
//       ))}
//     </svg>
//   )
// }
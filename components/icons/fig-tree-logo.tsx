export const FigTreeLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3L4 9V21H20V9L12 3Z"
      stroke="url(#gradient1)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 3V21M8 12H16M6 16H18"
      stroke="url(#gradient2)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="gradient1"
        x1="4"
        y1="3"
        x2="20"
        y2="21"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#60A5FA" /> {/* blue-400 */}
        <stop offset="0.5" stopColor="#C084FC" /> {/* purple-400 */}
        <stop offset="1" stopColor="#F472B6" /> {/* pink-400 */}
      </linearGradient>
      <linearGradient
        id="gradient2"
        x1="6"
        y1="12"
        x2="18"
        y2="16"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#C084FC" />
      </linearGradient>
    </defs>
  </svg>
)
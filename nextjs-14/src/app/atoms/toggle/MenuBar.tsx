"use client";

const Path = (props: any) => (
  <path
    fill="transparent"
    strokeWidth="3"
    stroke="var(--text-color)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuBar = ({ bar }: any) => (
  <button onClick={bar} className="top-lg lg:py-[3rem] left-1">
    <svg width="19" height="19" viewBox="0 0 23 18">
      <Path
        d="M 2 2.5 L 20 2.5"
        className="top"
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path d="M 2 9.423 L 20 9.423" opacity="1" className="middle" />
      <Path
        d="M 2 16.346 L 20 16.346"
        className="bottom"
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

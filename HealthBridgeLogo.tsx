import React from 'react';

interface HealthBridgeLogoProps {
  className?: string;
  size?: number | string;
}

export const HealthBridgeLogo: React.FC<HealthBridgeLogoProps> = ({
  className = 'w-10 h-10',
  size
}) => {
  const customStyle = size
    ? { width: typeof size === 'number' ? `${size}px` : size, height: typeof size === 'number' ? `${size}px` : size }
    : undefined;

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={customStyle}
    >
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain filter drop-shadow-md"
      >
        <defs>
          {/* Left Heart Blue Gradient */}
          <linearGradient id="hb-blue-grad" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#00c8ff" />
            <stop offset="35%" stopColor="#0088ff" />
            <stop offset="100%" stopColor="#004cd8" />
          </linearGradient>

          {/* Right Heart Green Gradient */}
          <linearGradient id="hb-green-grad" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#76e51b" />
            <stop offset="40%" stopColor="#25cc44" />
            <stop offset="100%" stopColor="#059639" />
          </linearGradient>

          {/* Person Blue Gradient */}
          <linearGradient id="hb-p-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d2ff" />
            <stop offset="100%" stopColor="#0066ee" />
          </linearGradient>

          {/* Person Green Gradient */}
          <linearGradient id="hb-p-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7bf538" />
            <stop offset="100%" stopColor="#15a03e" />
          </linearGradient>

          {/* Bridge & Stethoscope Blue Gradient */}
          <linearGradient id="hb-steth-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00a2ff" />
            <stop offset="50%" stopColor="#006ae8" />
            <stop offset="100%" stopColor="#003d99" />
          </linearGradient>

          {/* Stethoscope Diaphragm Center Gradient */}
          <radialGradient id="hb-diaphragm-rad" cx="38%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#67d8ff" />
            <stop offset="55%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#024e88" />
          </radialGradient>
        </defs>

        {/* LEFT HEART WING (BLUE) */}
        <path
          d="M256 128 C232 72 178 32 118 32 C52 32 16 84 16 156 C16 260 120 336 244 424 C236 400 200 348 160 300 C110 240 76 195 76 152 C76 112 100 82 136 82 C172 82 208 108 226 142 Z"
          fill="url(#hb-blue-grad)"
        />

        {/* RIGHT HEART WING (GREEN) */}
        <path
          d="M256 128 C280 72 334 32 394 32 C460 32 496 84 496 156 C496 260 392 336 268 424 C276 400 312 348 352 300 C402 240 436 195 436 152 C436 112 412 82 376 82 C340 82 304 108 286 142 Z"
          fill="url(#hb-green-grad)"
        />

        {/* LEFT PERSON (BLUE) */}
        <circle cx="180" cy="155" r="32" fill="url(#hb-p-blue)" />
        <path
          d="M136 260 C136 210 152 195 180 195 C208 195 224 210 224 260 Z"
          fill="url(#hb-p-blue)"
        />

        {/* RIGHT PERSON (GREEN) */}
        <circle cx="332" cy="155" r="32" fill="url(#hb-p-green)" />
        <path
          d="M288 260 C288 210 304 195 332 195 C360 195 376 210 376 260 Z"
          fill="url(#hb-p-green)"
        />

        {/* BRIDGE STRUCTURE */}
        <path
          d="M130 292 C180 236 332 236 382 292 L364 306 C324 258 188 258 148 306 Z"
          fill="url(#hb-steth-grad)"
        />
        <path
          d="M142 316 C186 280 326 280 370 316 L356 332 C320 300 192 300 156 332 Z"
          fill="url(#hb-steth-grad)"
        />
        <rect x="180" y="260" width="10" height="42" rx="4" fill="url(#hb-steth-grad)" />
        <rect x="220" y="248" width="10" height="50" rx="4" fill="url(#hb-steth-grad)" />
        <rect x="251" y="244" width="10" height="52" rx="4" fill="url(#hb-steth-grad)" />
        <rect x="282" y="248" width="10" height="50" rx="4" fill="url(#hb-steth-grad)" />
        <rect x="322" y="260" width="10" height="42" rx="4" fill="url(#hb-steth-grad)" />

        {/* STETHOSCOPE TUBING */}
        <circle cx="198" cy="344" r="14" fill="url(#hb-steth-grad)" />
        <circle cx="314" cy="344" r="14" fill="url(#hb-steth-grad)" />
        <path
          d="M198 344 C198 420 314 420 314 344"
          stroke="url(#hb-steth-grad)"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />

        {/* Lower Tube */}
        <path
          d="M256 414 C256 465 285 500 340 488 C385 478 395 435 395 410"
          stroke="url(#hb-steth-grad)"
          strokeWidth="15"
          strokeLinecap="round"
          fill="none"
        />

        {/* Stethoscope Diaphragm / Chest Piece */}
        <circle cx="395" cy="405" r="38" fill="#ffffff" />
        <circle cx="395" cy="405" r="35" fill="url(#hb-steth-grad)" />
        <circle cx="395" cy="405" r="26" fill="#ffffff" />
        <circle cx="395" cy="405" r="22" fill="url(#hb-diaphragm-rad)" />
        <ellipse cx="388" cy="397" rx="7" ry="4" fill="#ffffff" opacity="0.6" transform="rotate(-30 388 397)" />
      </svg>
    </div>
  );
};

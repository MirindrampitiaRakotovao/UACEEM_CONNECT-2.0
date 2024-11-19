import React from 'react';


const Robot3D = ({ isWaving = false, size = 64 }) => (
  <div className={`${isWaving ? 'animate-bounce' : ''}`}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transform-gpu"
    >
      <defs>
        {/* Filtres pour effets 3D */}
        <filter id="inner-glow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
          <feOffset dx="0" dy="2"/>
          <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feFlood floodColor="#FFAA00" floodOpacity="0.5"/>
          <feComposite operator="in" in2="SourceAlpha"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Gradients métalliques */}
        <linearGradient id="metallic-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3A4B66"/>
          <stop offset="50%" stopColor="#2A3A53"/>
          <stop offset="100%" stopColor="#1C2736"/>
        </linearGradient>

        <linearGradient id="metallic-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700"/>
          <stop offset="50%" stopColor="#FFAA00"/>
          <stop offset="100%" stopColor="#FF8C00"/>
        </linearGradient>

        {/* Effet holographique */}
        <radialGradient id="holo-effect" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFAA00" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#FFAA00" stopOpacity="0"/>
        </radialGradient>

        {/* Pattern technologique */}
        <pattern id="tech-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 20h40M20 0v40" stroke="#FFAA00" strokeWidth="0.5" strokeOpacity="0.2"/>
          <circle cx="20" cy="20" r="1" fill="#FFAA00" fillOpacity="0.3"/>
        </pattern>
      </defs>

      {/* Corps principal avec effet 3D */}
      <g filter="url(#drop-shadow)">
        {/* Base du corps */}
        <path d="M150 100 
                 C150 80, 250 80, 250 100
                 L270 300
                 C270 320, 130 320, 130 300 Z"
              fill="url(#metallic-body)"
              className="filter drop-shadow-2xl"/>

        {/* Plaques d'armure */}
        <path d="M160 120
                 L240 120
                 L235 280
                 L165 280 Z"
              fill="url(#tech-pattern)"
              className="opacity-50"/>
      </g>

      {/* Tête avec détails complexes */}
      <g className="filter drop-shadow-lg">
        {/* Base de la tête */}
        <path d="M170 60
                 C170 40, 230 40, 230 60
                 L240 140
                 C240 160, 160 160, 160 140 Z"
              fill="url(#metallic-body)"/>

        {/* Visière holographique */}
        <path d="M180 80
                 L220 80
                 L215 120
                 L185 120 Z"
              fill="url(#metallic-gold)"
              className="opacity-80"/>
      </g>

      {/* Yeux avec effet holographique */}
      <g className="animate-pulse">
        <circle cx="195" cy="100" r="8" fill="url(#holo-effect)" filter="url(#inner-glow)"/>
        <circle cx="205" cy="100" r="8" fill="url(#holo-effect)" filter="url(#inner-glow)"/>
        
        {/* Anneaux d'analyse rotatifs */}
        <circle cx="195" cy="100" r="12" stroke="#FFAA00" strokeWidth="1" fill="none" 
                className="animate-[spin_3s_linear_infinite]"/>
        <circle cx="205" cy="100" r="12" stroke="#FFAA00" strokeWidth="1" fill="none"
                className="animate-[spin_3s_linear_infinite_reverse]"/>
      </g>

      {/* Épaules articulées */}
      <g filter="url(#drop-shadow)">
        <circle cx="150" cy="180" r="20" fill="url(#metallic-gold)"/>
        <circle cx="250" cy="180" r="20" fill="url(#metallic-gold)"/>
      </g>

      {/* Bras avec segments articulés */}
      <g className={isWaving ? 'animate-wave' : ''}>
        {/* Bras gauche */}
        <path d="M150 180
                 Q130 200, 120 220
                 Q110 240, 100 260"
              stroke="url(#metallic-gold)"
              strokeWidth="15"
              strokeLinecap="round"
              fill="none"/>
        
        {/* Main gauche */}
        <circle cx="100" cy="260" r="12" fill="url(#metallic-gold)"/>
      </g>

      {/* Bras droit */}
      <path d="M250 180
               Q270 200, 280 220
               Q290 240, 300 260"
            stroke="url(#metallic-gold)"
            strokeWidth="15"
            strokeLinecap="round"
            fill="none"/>
      
      {/* Main droite */}
      <circle cx="300" cy="260" r="12" fill="url(#metallic-gold)"/>

      {/* Détails énergétiques */}
      <g className="animate-pulse">
        {/* Orbes d'énergie */}
        <circle cx="200" cy="200" r="5" fill="#FFAA00" className="opacity-80"/>
        <circle cx="200" cy="220" r="3" fill="#FFAA00" className="opacity-60"/>
        <circle cx="200" cy="240" r="4" fill="#FFAA00" className="opacity-70"/>
      </g>

      {/* Lignes d'énergie */}
      <g className="animate-pulse">
        <path d="M180 190 L220 190" stroke="#FFAA00" strokeWidth="1" className="opacity-50"/>
        <path d="M170 210 L230 210" stroke="#FFAA00" strokeWidth="1" className="opacity-50"/>
        <path d="M175 230 L225 230" stroke="#FFAA00" strokeWidth="1" className="opacity-50"/>
      </g>

      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-30deg); }
          }
          .animate-wave {
            animation: wave 2s infinite;
            transform-origin: 150px 180px;
          }
        `}
      </style>
    </svg>
  </div>
);

export default Robot3D;
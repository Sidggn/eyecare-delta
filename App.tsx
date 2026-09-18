import { useState } from "react";
import { Check, Eye, Move3d } from "lucide-react";

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */
const FRAME_SHAPES = [
  { id: "aviator", label: "Aviator" },
  { id: "catEye", label: "Cat-eye" },
  { id: "round", label: "Round" },
  { id: "rectangular", label: "Rectangle" },
];

const FRAME_COLORS = [
  { id: "matte-black", label: "Matte Black", hex: "#20211f" },
  { id: "tortoise", label: "Tortoise", hex: "#8a5a2b", pattern: true },
  { id: "crystal", label: "Crystal Clear", hex: "#e8e4da", crystal: true },
  { id: "gold", label: "Gold", hex: "#c9a227" },
  { id: "rose-gold", label: "Rose Gold", hex: "#b98a96" },
  { id: "pastel", label: "Pastel Mint", hex: "#a4cbb4" },
  { id: "gradient", label: "Gradient/Two-Tone", hex: "linear-gradient(135deg, #20211f, #e8e4da)" },
];

const FRAME_MATERIALS = [
  { id: "acetate", label: "Acetate" },
  { id: "metal", label: "Metal" },
  { id: "titanium", label: "Titanium" },
  { id: "bio", label: "Bio-based/Recycled Plastic" },
  { id: "wood", label: "Wood-look" },
];

const FRAME_FINISHES = [
  { id: "matte", label: "Matte" },
  { id: "glossy", label: "Glossy" },
  { id: "brushed", label: "Brushed Metal" },
  { id: "marbled", label: "Marbled/Swirl Pattern" },
];

const FRAME_WIDTHS = [
  { id: "narrow", label: "Narrow (for smaller faces)" },
  { id: "standard", label: "Standard" },
  { id: "wide", label: "Wide (for broader faces)" },
];

const LENS_COLORS = [
  { id: "grey", label: "Classic Grey", hex: "#4a4a4a" },
  { id: "amber", label: "Brown/Amber", hex: "#8b5a2b" },
  { id: "green", label: "Green", hex: "#35513e" },
  { id: "blue", label: "Blue Mirror", hex: "#5c7a8a" },
  { id: "rose", label: "Rose", hex: "#a3697a" },
  { id: "yellow", label: "Yellow", hex: "#c99a2e" },
];

const LENS_TYPES = [
  { id: "non-polarized", label: "Non-polarized" },
  { id: "polarized", label: "Polarized" },
  { id: "photochromic", label: "Photochromic/Transition" },
  { id: "blue-light", label: "Blue-light Blocking" },
  { id: "mirrored", label: "Mirrored" },
  { id: "gradient", label: "Gradient Tint" },
];

const LENS_SHAPES = [
  { id: "match", label: "Match Frame Shape" },
  { id: "flat-top", label: "Flat-top" },
  { id: "curved", label: "Curved Base" },
];

const UV_PROTECTION = [
  { id: "uv400", label: "Standard UV400" },
  { id: "none", label: "None (Fashion only)" },
];

const LENS_FINISHES = [
  { id: "glossy", label: "Glossy Coating" },
  { id: "matte", label: "Matte Coating" },
  { id: "anti-scratch", label: "Anti-Scratch" },
  { id: "anti-fog", label: "Anti-Fog" },
];

const TEMPLE_COLORS = [
  { id: "match", label: "Match Frame" },
  { id: "contrast", label: "Contrast Color" },
  { id: "two-tone", label: "Two-Tone" },
];

const TEMPLE_PATTERNS = [
  { id: "solid", label: "Solid" },
  { id: "striped", label: "Striped" },
  { id: "tortoise", label: "Tortoise" },
  { id: "glitter", label: "Glitter/Fleck" },
];

const TEMPLE_TIPS = [
  { id: "rubber", label: "Rubber Grip" },
  { id: "acetate", label: "Acetate" },
  { id: "metal", label: "Metal" },
];

const TEMPLE_LENGTHS = [
  { id: "standard", label: "Standard (140mm)" },
  { id: "long", label: "Long (145mm - for larger heads)" },
];

const HARDWARE_COLORS = [
  { id: "gold", label: "Gold", hex: "#c9a227" },
  { id: "silver", label: "Silver", hex: "#c7c7c7" },
  { id: "gunmetal", label: "Gunmetal", hex: "#4a4a4a" },
  { id: "matte-black", label: "Matte Black", hex: "#20211f" },
];

const NOSE_PADS = [
  { id: "integrated", label: "Integrated" },
  { id: "adjustable", label: "Adjustable Silicone Pads" },
  { id: "none", label: "None (Saddle bridge)" },
];

const BROW_BAR_FINISHES = [
  { id: "none", label: "None" },
  { id: "gold", label: "Gold Accent" },
  { id: "silver", label: "Silver Accent" },
  { id: "matte-black", label: "Matte Black Accent" },
];

const SIZES = [
  { id: "S", label: "Small (S)", sub: "49mm lens width" },
  { id: "M", label: "Medium (M)", sub: "52mm lens width" },
  { id: "L", label: "Large (L)", sub: "55mm lens width" },
];

const FACE_SHAPES = [
  { id: "any", label: "Any Face Shape" },
  { id: "round", label: "Round Face (Suggests: Angular frames like Wayfarer, Rectangular)" },
  { id: "oval", label: "Oval Face (Suggests: Any, especially Aviator, Oversized)" },
  { id: "square", label: "Square Face (Suggests: Round, Oval, Cat-Eye)" },
  { id: "heart", label: "Heart Face (Suggests: Bottom-heavy, Aviator, Shield)" },
];

const ENGRAVE_FONTS = [
  { id: "script", label: "Script (Elegant & Flowing)", style: "italic", family: "Georgia, serif" },
  { id: "block", label: "Block (Clean & Modern)", style: "normal", family: "ui-sans-serif, system-ui, sans-serif" },
  { id: "minimal", label: "Minimalist (Subtle & Spaced)", style: "normal", family: "ui-sans-serif, system-ui, sans-serif", letterSpacing: "0.15em" },
];

const ENGRAVE_COLORS = [
  { id: "natural", label: "Laser-Etched Natural" },
  { id: "gold-fill", label: "Gold Filled" },
  { id: "silver-fill", label: "Silver Filled" },
];

const CASE_STYLES = [
  { id: "hard", label: "Hard Shell" },
  { id: "soft", label: "Soft Pouch" },
  { id: "eco", label: "Eco-Fabric Bag" },
];

const CLOTH_COLORS = [
  { id: "black", label: "Classic Black" },
  { id: "grey", label: "Microfiber Grey" },
  { id: "white", label: "Stark White" },
  { id: "brand", label: "eyecare Blue" },
];

const TABS = ["Frame Shape", "Fitting", "Shade Color", "Customised Name"];

/* ---------------------------------------------------------
   SVG PATHS & UTILS
--------------------------------------------------------- */
const LENS_PATHS: Record<string, string> = {
  wayfarer: "M70,68 L246,53 Q270,53 271,80 L262,172 Q259,193 233,197 L92,206 Q66,204 63,180 L64,93 Q65,73 70,68 Z",
  aviator: "M65,77 Q66,44 102,40 L233,46 Q267,52 270,92 Q276,150 236,190 Q196,214 150,206 Q92,196 71,151 Q59,111 65,77 Z",
  round: "M160,130 m-96,0 a96,96 0 1,0 192,0 a96,96 0 1,0 -192,0",
  catEye: "M45,102 L92,54 Q132,34 191,44 Q251,55 256,111 Q259,161 220,191 Q180,211 119,206 Q69,201 54,161 Q39,130 45,102 Z",
  rectangular: "M70,80 L250,80 Q265,80 265,95 L260,170 Q255,185 240,185 L80,185 Q65,185 65,170 L70,95 Q70,80 85,80 Z",
  hexagonal: "M110,60 L210,60 L260,120 L210,190 L110,190 L60,120 Z",
  oversized: "M60,50 L260,50 Q280,50 280,80 L270,190 Q265,220 230,220 L90,220 Q55,220 50,190 L50,80 Q50,50 60,50 Z",
  shield: "M50,70 L280,70 Q290,140 250,200 Q200,220 160,220 Q120,220 70,200 Q30,140 50,70 Z",
};

const BRIDGE_PATH: Record<string, string> = {
  wayfarer: "M264,110 Q300,96 336,110 L336,128 Q300,116 264,128 Z",
  aviator: "M263,105 Q300,90 337,105 L337,122 Q300,110 263,122 Z",
  round: "M256,120 Q300,104 344,120 L344,138 Q300,124 256,138 Z",
  catEye: "M250,112 Q300,98 350,112 L350,130 Q300,118 250,130 Z",
  rectangular: "M260,120 Q300,110 340,120 L340,135 Q300,125 260,135 Z",
  hexagonal: "M260,100 Q300,90 340,100 L340,115 Q300,105 260,115 Z",
  oversized: "M270,110 Q300,90 330,110 L330,130 Q300,110 270,130 Z",
  shield: "M280,70 Q300,65 320,70 L320,100 Q300,95 280,100 Z",
};

const TEMPLE_ANCHOR: Record<string, { x: number, y: number }> = {
  wayfarer: { x: 63, y: 100 },
  aviator: { x: 62, y: 105 },
  round: { x: 64, y: 130 },
  catEye: { x: 45, y: 102 },
  rectangular: { x: 65, y: 100 },
  hexagonal: { x: 75, y: 90 },
  oversized: { x: 50, y: 95 },
  shield: { x: 45, y: 90 },
};

function shade(hex: string, percent: number) {
  if (hex.startsWith('linear')) return "#555555";
  if (hex.startsWith('url')) return "#555555";
  const num = parseInt(hex.replace("#", ""), 16);
  if (isNaN(num)) return hex;
  let r = (num >> 16) + Math.round(2.55 * percent);
  let g = ((num >> 8) & 0x00ff) + Math.round(2.55 * percent);
  let b = (num & 0x0000ff) + Math.round(2.55 * percent);
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).padStart(6, '0').slice(-6)}`;
}

/* ---------------------------------------------------------
   COMPONENTS
--------------------------------------------------------- */
function Swatch({ hex, selected, onClick, label, pattern, crystal }: any) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`relative flex-shrink-0 w-9 h-9 rounded-full cursor-pointer transition-all duration-200 outline-none
        ${selected ? 'scale-110 shadow-[0_0_0_2px_#fff,0_0_0_4px_#333]' : 'border border-gray-300 hover:scale-105'}`}
      style={{
        background: crystal
          ? "linear-gradient(135deg, #f3eee3 0%, #e2dfd5 50%, #ffffff 100%)"
          : pattern
          ? `radial-gradient(circle at 30% 30%, #a5713a 0 3px, transparent 4px), radial-gradient(circle at 65% 60%, #5c3a1a 0 3px, transparent 4px), radial-gradient(circle at 45% 80%, #8a5a2b 0 3px, transparent 4px), ${hex}`
          : hex,
      }}
    >
      {selected && (
        <Check
          size={16}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          color={["#e8e4da", "#c9a227", "#c7c7c7", "#a4cbb4"].includes(hex) || crystal ? "#1a1a1a" : "#ffffff"}
        />
      )}
    </button>
  );
}

function OptionCard({ label, sub, selected, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all duration-200
        ${selected 
          ? 'border-gray-900 bg-gray-50/50 shadow-sm' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/30'}`}
    >
      <div className="flex justify-between items-center gap-3">
        <div>
          <div className={`text-[13px] sm:text-sm font-medium ${selected ? 'text-gray-900' : 'text-gray-700'}`}>{label}</div>
          {sub && <div className="text-[11px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 leading-relaxed">{sub}</div>}
        </div>
        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center flex-shrink-0
          ${selected ? 'border-gray-900 bg-gray-900' : 'border-gray-300'}`}>
          {selected && <Check size={10} className="sm:w-3 sm:h-3" color="#ffffff" />}
        </div>
      </div>
    </button>
  );
}

function SectionTitle({ children }: any) {
  return (
    <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase mb-4 mt-8 first:mt-0">
      {children}
    </h3>
  );
}

/* ---------------------------------------------------------
   PREVIEW RENDERER (3D CSS & SVG)
--------------------------------------------------------- */
function SharedDefs({ cfg, rotation = 0 }: any) {
  const frameColorObj = FRAME_COLORS.find(c => c.id === cfg.frameColor) || FRAME_COLORS[0];
  const lensColorObj = LENS_COLORS.find(c => c.id === cfg.lensColor) || LENS_COLORS[0];
  const hingeColorObj = HARDWARE_COLORS.find(c => c.id === cfg.hingeColor) || HARDWARE_COLORS[0];
  
  let baseHex = frameColorObj.hex;
  if (baseHex.startsWith('linear')) baseHex = "#333333";
  const isMetal = cfg.material === "metal" || cfg.material === "titanium";

  const glossOffset = Math.sin(rotation * Math.PI / 180) * 35; // Shifts -35% to 35% based on angle

  return (
    <defs>
      {/* Tortoise Pattern - Fast layered SVG approach */}
      <pattern id="tortoisePattern" patternUnits="userSpaceOnUse" width="60" height="60">
        <rect width="60" height="60" fill="#3a1b0b" />
        <circle cx="15" cy="15" r="25" fill="url(#tSpot1)" />
        <circle cx="45" cy="45" r="20" fill="url(#tSpot2)" />
        <circle cx="45" cy="10" r="15" fill="url(#tSpot3)" />
      </pattern>
      <radialGradient id="tSpot1"><stop offset="0%" stopColor="#c98a3c" stopOpacity="0.9"/><stop offset="100%" stopColor="#c98a3c" stopOpacity="0"/></radialGradient>
      <radialGradient id="tSpot2"><stop offset="0%" stopColor="#8a4d19" stopOpacity="0.9"/><stop offset="100%" stopColor="#8a4d19" stopOpacity="0"/></radialGradient>
      <radialGradient id="tSpot3"><stop offset="0%" stopColor="#1a0a04" stopOpacity="0.9"/><stop offset="100%" stopColor="#1a0a04" stopOpacity="0"/></radialGradient>

      {/* Frame Depth & Bevel Filter for thick Acetate look */}
      <filter id="acetate-bevel" x="-20%" y="-20%" width="140%" height="140%">
        {/* Drop Shadow onto lenses/floor */}
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.3" result="shadow"/>
      </filter>

      <linearGradient id="twoToneGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#20211f" />
        <stop offset="100%" stopColor="#e8e4da" />
      </linearGradient>

      <linearGradient id="metalGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f0f0f0" />
        <stop offset="30%" stopColor="#808080" />
        <stop offset="70%" stopColor="#d0d0d0" />
        <stop offset="100%" stopColor="#505050" />
      </linearGradient>

      <linearGradient id="lensGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={shade(lensColorObj.hex, 20)} />
        <stop offset="100%" stopColor={shade(lensColorObj.hex, -40)} />
      </linearGradient>

      <linearGradient id="lensSkyReflection" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity={cfg.lensType === "mirrored" ? "0.95" : "0.5"} />
        <stop offset="45%" stopColor="#ffffff" stopOpacity={cfg.lensType === "mirrored" ? "0.6" : "0.1"} />
        <stop offset="45.1%" stopColor="#000000" stopOpacity="0.0" />
        <stop offset="100%" stopColor="#000000" stopOpacity={cfg.lensType === "mirrored" ? "0.4" : "0.15"} />
      </linearGradient>
      
      {/* Dynamic Shifting Gloss Layer for the Frame */}
      <linearGradient id="dynamicGloss" x1={`${50 + glossOffset}%`} y1="0%" x2={`${50 - glossOffset}%`} y2="100%">
         <stop offset="0%" stopColor="#fff" stopOpacity="0"/>
         <stop offset="35%" stopColor="#fff" stopOpacity="0"/>
         <stop offset="45%" stopColor="#fff" stopOpacity="0.8"/>
         <stop offset="50%" stopColor="#fff" stopOpacity="0.95"/>
         <stop offset="55%" stopColor="#fff" stopOpacity="0"/>
         <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
      </linearGradient>

      {/* Curved Gloss Slash for Lens */}
      <linearGradient id="glareSlash" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0%" stopColor="#fff" stopOpacity={cfg.lensFinish === 'glossy' ? "0.8" : "0.2"}/>
         <stop offset="15%" stopColor="#fff" stopOpacity={cfg.lensFinish === 'glossy' ? "0.1" : "0.0"}/>
         <stop offset="15.1%" stopColor="#fff" stopOpacity="0"/>
      </linearGradient>

      <radialGradient id="hingeGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor={shade(hingeColorObj.hex, 60)} />
        <stop offset="100%" stopColor={shade(hingeColorObj.hex, -40)} />
      </radialGradient>

      <clipPath id={`lensClip-${cfg.shape}`}>
        <path d={LENS_PATHS[cfg.shape] || LENS_PATHS.wayfarer} />
      </clipPath>
    </defs>
  );
}

function TempleArm({ cfg, isRight, scale }: { cfg: any, isRight: boolean, scale: number }) {
  const frameColorObj = FRAME_COLORS.find(c => c.id === cfg.frameColor) || FRAME_COLORS[0];
  const isMetal = cfg.material === "metal" || cfg.material === "titanium";
  
  let baseHex = frameColorObj.hex;
  if (baseHex.startsWith('linear')) baseHex = "#333333";
  if (frameColorObj.crystal) baseHex = "#e2dfd5";

  let templeFill = baseHex;
  if (cfg.templePattern === "tortoise") templeFill = "url(#tortoisePattern)";
  else if (isMetal) templeFill = "url(#metalGrad)";
  else if (cfg.templeColor === "contrast") templeFill = "#b98a96";
  else if (frameColorObj.id === "gradient") templeFill = "#20211f";

  const tipColor = cfg.templeTip === 'rubber' ? '#222222' : (cfg.templeTip === 'metal' ? 'url(#metalGrad)' : templeFill);
  const templeLength = cfg.templeLength === 'long' ? 170 : 155;
  const width = isMetal ? 5 : (cfg.shape === 'oversized' ? 14 : 10);

  const fontStyle = ENGRAVE_FONTS.find(f => f.id === cfg.engraveFont) || ENGRAVE_FONTS[0];
  const engraveColorHex = cfg.engraveColor === 'gold-fill' ? '#c9a227' : cfg.engraveColor === 'silver-fill' ? '#c7c7c7' : '#9c9586';

  return (
    <svg width={templeLength * scale} height={40 * scale} viewBox={`0 0 ${templeLength} 40`} className="overflow-visible" style={{ transform: isRight ? 'scaleX(-1)' : 'none' }}>
      <SharedDefs cfg={cfg} rotation={0} />
      {/* Arm Shaft with Bevel Filter for thickness */}
      <path 
        d={`M0,10 L${templeLength - 40},10 Q${templeLength - 20},10 ${templeLength - 10},20 L${templeLength},35 Q${templeLength - 10},35 ${templeLength - 20},20 L${templeLength - 30},${10 + width} L0,${10 + width} Z`} 
        fill={templeFill} 
        opacity={frameColorObj.crystal && !isMetal ? 0.8 : 1}
        filter="drop-shadow(0 4px 4px rgba(0,0,0,0.15))"
      />
      {/* Inner highlight for premium temple look */}
      <path 
        d={`M0,10 L${templeLength - 40},10 Q${templeLength - 20},10 ${templeLength - 10},20 L${templeLength},35 Q${templeLength - 10},35 ${templeLength - 20},20 L${templeLength - 30},${10 + width} L0,${10 + width} Z`} 
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
      />
      
      {/* Arm Tip */}
      <path 
        d={`M${templeLength - 40},10 Q${templeLength - 20},10 ${templeLength - 10},20 L${templeLength},35 Q${templeLength - 10},35 ${templeLength - 20},20 L${templeLength - 30},${10 + width} Z`} 
        fill={tipColor} 
      />
      
      {/* Engraving */}
      {!isRight && cfg.engraveName && (
        <text
          x={30}
          y={14 + width/2}
          fontFamily={fontStyle.family}
          fontStyle={fontStyle.style}
          letterSpacing={fontStyle.letterSpacing || 'normal'}
          fontSize="4"
          fill={engraveColorHex}
          dominantBaseline="middle"
          opacity="0.9"
        >
          {cfg.engraveName.toUpperCase()}
        </text>
      )}
    </svg>
  );
}

function ThreeDGlasses({ cfg, rotation }: { cfg: any, rotation: number }) {
  const lensPath = LENS_PATHS[cfg.shape] || LENS_PATHS.wayfarer;
  const bridgePath = BRIDGE_PATH[cfg.shape] || BRIDGE_PATH.wayfarer;
  const anchor = TEMPLE_ANCHOR[cfg.shape] || TEMPLE_ANCHOR.wayfarer;
  
  const frameColorObj = FRAME_COLORS.find(c => c.id === cfg.frameColor) || FRAME_COLORS[0];
  const isMetal = cfg.material === "metal" || cfg.material === "titanium";
  
  let baseHex = frameColorObj.hex;
  if (baseHex.startsWith('linear')) baseHex = "#333333";
  const rimHex = frameColorObj.crystal ? "#f4f4f4" : baseHex;

  let rimFill = frameColorObj.id === 'gradient' ? "url(#twoToneGrad)" : (frameColorObj.crystal ? rimHex : baseHex);
  if (frameColorObj.pattern) rimFill = "url(#tortoisePattern)";
  if (isMetal) rimFill = "url(#metalGrad)";

  const rimOpacity = frameColorObj.crystal ? 0.6 : 1;
  const lensOpacity = cfg.lensType === "photochromic" ? 0.4 : (cfg.lensType === "mirrored" ? 0.8 : 0.65);
  
  const sizeScale = cfg.size === "S" ? 0.9 : cfg.size === "L" ? 1.1 : 1.0;
  
  // Clean continuous 3D rotation without clipping
  const rX = -8; 

  const hingeBaseY = 140 + (anchor.y - 140) * sizeScale;
  const leftHingeX = 300 + (anchor.x - 300) * sizeScale;
  const rightHingeX = 300 + (300 - anchor.x) * sizeScale;
  const rimStrokeWidth = isMetal ? 5 : 12;

  // Frame Layer Extrusion for 3D depth
  const frameLayers = isMetal ? 3 : 8;
  const zStep = isMetal ? -1 : -1.5;

  const shadowX = Math.sin(rotation * Math.PI / 180) * 100;
  const shadowScale = Math.max(0.3, 1 - Math.abs(Math.sin(rotation * Math.PI / 180)) * 0.5);

  return (
    <div className="w-full flex-1 relative z-10 flex items-center justify-center overflow-visible pointer-events-none" style={{ perspective: '1200px' }}>
      
      {/* Responsive Scale Wrapper using absolute positioning to avoid pushing controls */}
      <div className="absolute flex items-center justify-center pointer-events-auto" style={{ transform: 'scale(var(--scale))' }}>
        <div className="relative w-[600px] h-[300px]">
          
          {/* Floor Drop Shadow */}
          <div 
            className="absolute w-[450px] h-[80px] bg-black/20 blur-2xl rounded-full transition-transform duration-500 ease-out" 
            style={{ 
                left: '50%', top: '220px', 
                transform: `translateX(calc(-50% + ${shadowX}px)) rotateX(80deg) scaleX(${shadowScale})`,
            }}
          />

          <div 
            className="absolute inset-0 transition-transform duration-500 ease-out" 
            style={{ transform: `rotateY(${rotation}deg) rotateX(${rX}deg)`, transformStyle: 'preserve-3d' }}
          >
          {/* --- LEFT TEMPLE --- */}
        <div 
          className="absolute origin-left"
          style={{ 
            left: `${(leftHingeX / 600) * 100}%`, 
            top: `${(hingeBaseY / 300) * 100}%`, 
            transform: `translateY(-10px) translateZ(-8px) rotateY(-85deg)` 
          }}
        >
          <TempleArm cfg={cfg} isRight={false} scale={sizeScale} />
        </div>

        {/* --- RIGHT TEMPLE --- */}
        <div 
          className="absolute origin-left"
          style={{ 
            left: `${(rightHingeX / 600) * 100}%`, 
            top: `${(hingeBaseY / 300) * 100}%`, 
            transform: `translateY(-10px) translateZ(-8px) rotateY(-95deg)` 
          }}
        >
          <TempleArm cfg={cfg} isRight={true} scale={sizeScale} />
        </div>

        {/* --- FRONT FRAME (Extruded Z-Layers for true 3D thickness) --- */}
        {[...Array(frameLayers)].map((_, i) => {
            const isFront = i === 0;
            const isBack = i === frameLayers - 1;
            const isLensLayer = i === Math.floor(frameLayers / 2);
            const zDist = i * zStep;
            
            return (
                <svg key={i} viewBox="0 0 600 300" className="absolute inset-0 overflow-visible" style={{ transform: `translateZ(${zDist}px)` }}>
                    <SharedDefs cfg={cfg} rotation={rotation} />
                    <g transform={`translate(300,140) scale(${sizeScale}) translate(-300,-140)`}>
                        
                        {/* LENSES (Positioned directly in the middle of the frame volume) */}
                        {isLensLayer && (
                            <g>
                                {/* Left Lens */}
                                <path d={lensPath} fill="url(#lensGrad)" opacity={lensOpacity} />
                                <path d={lensPath} fill="url(#lensSkyReflection)" />
                                {/* Gloss Glare Slash */}
                                {cfg.lensFinish === 'glossy' && (
                                    <g clipPath={`url(#lensClip-${cfg.shape})`}>
                                       <polygon points="-50,0 150,0 50,300 -150,300" fill="url(#glareSlash)" />
                                    </g>
                                )}
                                
                                {/* Right Lens (mirrored) */}
                                <g transform="translate(600,0) scale(-1,1)">
                                    <path d={lensPath} fill="url(#lensGrad)" opacity={lensOpacity} />
                                    <path d={lensPath} fill="url(#lensSkyReflection)" />
                                    {cfg.lensFinish === 'glossy' && (
                                        <g clipPath={`url(#lensClip-${cfg.shape})`}>
                                           <polygon points="-50,0 150,0 50,300 -150,300" fill="url(#glareSlash)" />
                                        </g>
                                    )}
                                </g>
                            </g>
                        )}

                        {/* THE BRIDGE & RIMS */}
                        <g filter={(!isMetal && (isFront || isBack)) ? "url(#acetate-bevel)" : ""} opacity={rimOpacity}>
                            
                            {/* Bridge */}
                            <g>
                                {(isFront || isBack) && <path d={bridgePath} fill="rgba(0,0,0,0.3)" transform="translate(0, 3)" />}
                                <path d={bridgePath} fill={rimFill} />
                                {isFront && cfg.finish === 'glossy' && !isMetal && <path d={bridgePath} fill="url(#dynamicGloss)" opacity="0.6" />}
                            </g>

                            {/* Outer Edge Depth Shadow */}
                            {(isFront || isBack) && (
                                <g>
                                    <path d={lensPath} fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth={rimStrokeWidth + 4} strokeLinejoin="round" />
                                    <path d={lensPath} fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth={rimStrokeWidth} strokeLinejoin="round" transform="translate(0, 2)" />
                                    <g transform="translate(600,0) scale(-1,1)">
                                        <path d={lensPath} fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth={rimStrokeWidth + 4} strokeLinejoin="round" />
                                        <path d={lensPath} fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth={rimStrokeWidth} strokeLinejoin="round" transform="translate(0, 2)" />
                                    </g>
                                </g>
                            )}

                            {/* Main Rim Body */}
                            <path d={lensPath} fill="none" stroke={rimFill} strokeWidth={rimStrokeWidth} strokeLinejoin="round" />
                            <g transform="translate(600,0) scale(-1,1)">
                                <path d={lensPath} fill="none" stroke={rimFill} strokeWidth={rimStrokeWidth} strokeLinejoin="round" />
                            </g>

                            {/* Inner Rim Bevel Highlight */}
                            {(isFront || isBack) && (
                                <g>
                                    <path d={lensPath} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={Math.max(1, rimStrokeWidth - 6)} />
                                    <g transform="translate(600,0) scale(-1,1)">
                                        <path d={lensPath} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={Math.max(1, rimStrokeWidth - 6)} />
                                    </g>
                                </g>
                            )}

                            {/* Dynamic Glossy Highlight Layer */}
                            {isFront && cfg.finish === 'glossy' && !isMetal && (
                                <>
                                   <path d={lensPath} fill="none" stroke="url(#dynamicGloss)" strokeWidth={rimStrokeWidth} strokeLinejoin="round" opacity="0.9" />
                                   <g transform="translate(600,0) scale(-1,1)">
                                      <path d={lensPath} fill="none" stroke="url(#dynamicGloss)" strokeWidth={rimStrokeWidth} strokeLinejoin="round" opacity="0.9" />
                                   </g>
                                </>
                            )}
                        </g>

                        {/* HARDWARE DETAILS (Drawn on top of everything) */}
                        {isBack && cfg.nosePads !== 'none' && (
                            <g>
                                <ellipse cx="284" cy="135" rx="6" ry="14" fill={cfg.nosePads === 'integrated' ? rimHex : "#e5e7eb"} opacity="0.95" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))"/>
                                <ellipse cx="316" cy="135" rx="6" ry="14" fill={cfg.nosePads === 'integrated' ? rimHex : "#e5e7eb"} opacity="0.95" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))"/>
                            </g>
                        )}
                        
                        {isFront && cfg.browBar !== 'none' && cfg.shape === 'aviator' && (
                            <path d="M102,40 Q300,20 498,40 L498,46 Q300,26 102,46 Z" fill="url(#hingeGrad)" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.3))"/>
                        )}
                        
                        {isFront && cfg.shape !== 'aviator' && cfg.shape !== 'shield' && (
                            <g>
                                <circle cx={anchor.x + 5} cy={anchor.y} r="4" fill="url(#hingeGrad)" />
                                <circle cx={600 - (anchor.x + 5)} cy={anchor.y} r="4" fill="url(#hingeGrad)" />
                            </g>
                        )}
                    </g>
                </svg>
            );
        })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN APP
--------------------------------------------------------- */
export default function App() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [rotation, setRotation] = useState(0); // 3D View Angle
  
  // Configuration State
  const [cfg, setCfg] = useState({
    shape: "aviator",
    frameColor: "matte-black",
    material: "acetate",
    finish: "matte",
    frameWidth: "standard",
    
    lensColor: "grey",
    lensType: "polarized",
    lensShape: "match",
    uvProtection: "uv400",
    lensFinish: "glossy",
    
    templeColor: "match",
    templePattern: "solid",
    templeTip: "rubber",
    templeLength: "standard",
    
    hingeColor: "gunmetal",
    rivetColor: "silver",
    nosePads: "integrated",
    browBar: "none",
    
    size: "M",
    faceShape: "any",
    
    frameName: "",
    engraveName: "",
    engraveFont: "minimal",
    engraveColor: "natural",
    customCaseColor: "",
    giftMessage: "",
    
    caseStyle: "hard",
    clothColor: "black",
    prescription: false,
    rxDetails: "",
    clipOn: false,
  });

  const updateCfg = (key: string) => (val: any) => setCfg(prev => ({ ...prev, [key]: val }));

  return (
    <div className="md:h-screen w-full bg-white text-gray-900 font-sans flex flex-col md:flex-row md:overflow-hidden">
      {/* LEFT: Live Preview Area */}
      <div className="w-full h-[55vh] md:h-full md:w-1/2 lg:w-[55%] bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col relative shrink-0 sticky top-0 z-10 overflow-hidden">
        {/* Header / Brand */}
        <div className="absolute top-0 left-0 w-full p-4 md:p-8 flex items-center justify-between z-20 pointer-events-none">
          <div className="text-xl md:text-2xl font-bold tracking-tighter text-gray-900 lowercase pointer-events-auto">
            eyecare<span className="text-blue-600">.</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-medium tracking-widest text-gray-500 uppercase bg-white/80 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full backdrop-blur-md shadow-sm border border-gray-200">
            <Move3d size={14} className="w-3 h-3 md:w-4 md:h-4" /> Interactive 3D
          </div>
        </div>
        
        {/* 3D Stage */}
        <div className="flex-1 flex flex-col items-center justify-center p-2 pt-12 md:p-8 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-gray-50 to-gray-100"></div>
          
          <ThreeDGlasses cfg={cfg} rotation={rotation} />
          
          {/* Rotation Controls */}
          <div className="relative z-20 mt-2 md:mt-8 flex flex-col items-center bg-white/60 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-2xl md:rounded-3xl border border-gray-200 shadow-sm pointer-events-auto max-w-[95vw]">
            <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 md:mb-3">Rotate View Angle</span>
            
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => setRotation(45)}
                className={`text-[10px] md:text-xs font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-colors ${rotation > 20 && rotation < 80 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Left
              </button>
              
              <div className="relative flex items-center">
                <input 
                  type="range" 
                  min="-180" max="180" 
                  value={rotation} 
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-24 sm:w-32 md:w-40 h-1 bg-gray-300 rounded-lg appearance-none cursor-ew-resize accent-gray-900"
                />
              </div>

              <button 
                onClick={() => setRotation(-45)}
                className={`text-[10px] md:text-xs font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-colors ${rotation < -20 && rotation > -80 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Right
              </button>
            </div>
            
            <div className="mt-3 md:mt-4 flex gap-1.5 md:gap-2 flex-wrap justify-center">
               <button onClick={() => setRotation(180)} className={`text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-1 md:px-3 md:py-1 rounded-full ${Math.abs(rotation) === 180 ? 'bg-gray-200 text-gray-900 font-bold' : 'text-gray-400 hover:bg-gray-100'}`}>Back</button>
               <button onClick={() => setRotation(90)} className={`text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-1 md:px-3 md:py-1 rounded-full ${rotation === 90 ? 'bg-gray-200 text-gray-900 font-bold' : 'text-gray-400 hover:bg-gray-100'}`}>Profile L</button>
               <button onClick={() => setRotation(0)} className={`text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-1 md:px-3 md:py-1 rounded-full ${rotation === 0 ? 'bg-gray-200 text-gray-900 font-bold' : 'text-gray-400 hover:bg-gray-100'}`}>Front</button>
               <button onClick={() => setRotation(-90)} className={`text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-1 md:px-3 md:py-1 rounded-full ${rotation === -90 ? 'bg-gray-200 text-gray-900 font-bold' : 'text-gray-400 hover:bg-gray-100'}`}>Profile R</button>
            </div>
          </div>
        </div>

        {/* Selected Summary overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none hidden md:block">
          <div className="max-w-md">
            <h2 className="text-3xl font-medium tracking-tight text-gray-900 mb-2">
              {FRAME_SHAPES.find(s => s.id === cfg.shape)?.label}
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              <span>{FRAME_COLORS.find(c => c.id === cfg.frameColor)?.label}</span>
              <span className="w-1 h-1 rounded-full bg-gray-400"></span>
              <span>{LENS_COLORS.find(c => c.id === cfg.lensColor)?.label} {LENS_TYPES.find(c => c.id === cfg.lensType)?.label} Lenses</span>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: Configurator Controls */}
      <div className="w-full md:flex-1 md:w-1/2 lg:w-[45%] flex flex-col bg-white relative z-20 rounded-t-3xl md:rounded-none shadow-[0_-15px_30px_rgba(0,0,0,0.15)] md:shadow-none -mt-6 md:mt-0 pb-10 md:pb-0 shrink-0">
        
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-3 mb-1 md:hidden shrink-0"></div>

        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-200 px-4 md:px-6 pt-2 md:pt-6 shrink-0 relative bg-white md:sticky md:top-0 z-10 shadow-[0_10px_10px_-10px_rgba(0,0,0,0.05)]">
          <div className="flex gap-4 md:gap-6">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 md:pb-4 text-xs md:text-sm font-medium whitespace-nowrap transition-colors relative
                  ${activeTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 md:overflow-y-auto p-4 md:p-10 pb-20 md:pb-24 bg-white custom-scrollbar">
          <div className="max-w-xl mx-auto space-y-10">
            
            {/* --- LOW CUSTOMISATION --- */}
            {activeTab === "Frame Shape" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <SectionTitle>Frame Shape</SectionTitle>
                  <div className="grid grid-cols-2 gap-3">
                    {FRAME_SHAPES.map((shape) => (
                      <OptionCard
                        key={shape.id}
                        label={shape.label}
                        selected={cfg.shape === shape.id}
                        onClick={() => updateCfg("shape")(shape.id)}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Choose a shape to update the interactive frame preview.</p>
                </div>
              </div>
            )}

            {activeTab === "Fitting" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <SectionTitle>Fitting</SectionTitle>
                  <div className="space-y-3">
                    {SIZES.map((size) => (
                      <OptionCard key={size.id} label={size.label} sub={size.sub} selected={cfg.size === size.id} onClick={() => updateCfg("size")(size.id)} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Shade Color" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <SectionTitle>Shade Color</SectionTitle>
                  <div className="flex flex-wrap gap-4">
                    {LENS_COLORS.map((color) => (
                      <Swatch key={color.id} hex={color.hex} label={color.label} selected={cfg.lensColor === color.id} onClick={() => updateCfg("lensColor")(color.id)} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Customised Name" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <SectionTitle>Customised Name</SectionTitle>
                  <input
                    type="text"
                    maxLength={20}
                    placeholder="e.g. ALEX M."
                    value={cfg.engraveName}
                    onChange={(e) => updateCfg("engraveName")(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-shadow"
                  />
                  <p className="text-xs text-gray-500 mt-2">Add a name to customise your frame.</p>
                  <button
                    type="button"
                    onClick={() => setShowThankYou(true)}
                    className="mt-5 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Click here to proceed
                  </button>
                </div>
              </div>
            )}

            {/* --- LEGACY DETAIL TABS (kept for existing preview configuration) --- */}
            {activeTab === "Frame" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <SectionTitle>Frame Shape</SectionTitle>
                  <div className="grid grid-cols-2 gap-3">
                    {FRAME_SHAPES.map(s => (
                      <OptionCard key={s.id} label={s.label} selected={cfg.shape === s.id} onClick={() => updateCfg("shape")(s.id)} />
                    ))}
                  </div>
                </div>
                
                <div>
                  <SectionTitle>Frame Color</SectionTitle>
                  <div className="flex flex-wrap gap-4">
                    {FRAME_COLORS.map(c => (
                      <Swatch key={c.id} hex={c.hex} pattern={c.pattern} crystal={c.crystal} label={c.label} selected={cfg.frameColor === c.id} onClick={() => updateCfg("frameColor")(c.id)} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle>Material</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FRAME_MATERIALS.map(m => (
                      <OptionCard key={m.id} label={m.label} selected={cfg.material === m.id} onClick={() => updateCfg("material")(m.id)} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle>Finish</SectionTitle>
                  <div className="grid grid-cols-2 gap-3">
                    {FRAME_FINISHES.map(f => (
                      <OptionCard key={f.id} label={f.label} selected={cfg.finish === f.id} onClick={() => updateCfg("finish")(f.id)} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle>Width / Fit</SectionTitle>
                  <div className="space-y-3">
                    {FRAME_WIDTHS.map(w => (
                      <OptionCard key={w.id} label={w.label} selected={cfg.frameWidth === w.id} onClick={() => updateCfg("frameWidth")(w.id)} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB: LENSES --- */}
            {activeTab === "Lenses" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <SectionTitle>Lens Tint Color</SectionTitle>
                  <div className="flex flex-wrap gap-4">
                    {LENS_COLORS.map(c => (
                      <Swatch key={c.id} hex={c.hex} label={c.label} selected={cfg.lensColor === c.id} onClick={() => updateCfg("lensColor")(c.id)} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle>Lens Type & Features</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {LENS_TYPES.map(t => (
                      <OptionCard key={t.id} label={t.label} selected={cfg.lensType === t.id} onClick={() => updateCfg("lensType")(t.id)} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle>Lens Shape Profile</SectionTitle>
                  <div className="space-y-3">
                    {LENS_SHAPES.map(s => (
                      <OptionCard key={s.id} label={s.label} selected={cfg.lensShape === s.id} onClick={() => updateCfg("lensShape")(s.id)} />
                    ))}
                  </div>
                </div>
                
                <div>
                  <SectionTitle>UV Protection</SectionTitle>
                  <div className="grid grid-cols-2 gap-3">
                    {UV_PROTECTION.map(u => (
                      <OptionCard key={u.id} label={u.label} selected={cfg.uvProtection === u.id} onClick={() => updateCfg("uvProtection")(u.id)} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle>Coating / Finish</SectionTitle>
                  <div className="grid grid-cols-2 gap-3">
                    {LENS_FINISHES.map(f => (
                      <OptionCard key={f.id} label={f.label} selected={cfg.lensFinish === f.id} onClick={() => updateCfg("lensFinish")(f.id)} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB: TEMPLES --- */}
            {activeTab === "Temples" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <SectionTitle>Temple Color Coordination</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {TEMPLE_COLORS.map(t => (
                      <OptionCard key={t.id} label={t.label} selected={cfg.templeColor === t.id} onClick={() => updateCfg("templeColor")(t.id)} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle>Temple Pattern</SectionTitle>
                  <div className="grid grid-cols-2 gap-3">
                    {TEMPLE_PATTERNS.map(p => (
                      <OptionCard key={p.id} label={p.label} selected={cfg.templePattern === p.id} onClick={() => updateCfg("templePattern")(p.id)} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle>Temple Tips Material</SectionTitle>
                  <div className="grid grid-cols-3 gap-3">
                    {TEMPLE_TIPS.map(t => (
                      <OptionCard key={t.id} label={t.label} selected={cfg.templeTip === t.id} onClick={() => updateCfg("templeTip")(t.id)} />
                    ))}
                  </div>
                </div>
                
                <div>
                  <SectionTitle>Arm Length</SectionTitle>
                  <div className="space-y-3">
                    {TEMPLE_LENGTHS.map(l => (
                      <OptionCard key={l.id} label={l.label} selected={cfg.templeLength === l.id} onClick={() => updateCfg("templeLength")(l.id)} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB: HARDWARE --- */}
            {activeTab === "Hardware" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <SectionTitle>Hinge Color</SectionTitle>
                  <div className="flex flex-wrap gap-4">
                    {HARDWARE_COLORS.map(c => (
                      <Swatch key={c.id} hex={c.hex} label={c.label} selected={cfg.hingeColor === c.id} onClick={() => updateCfg("hingeColor")(c.id)} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle>Rivet / Screw Accent</SectionTitle>
                  <div className="flex flex-wrap gap-4">
                    {HARDWARE_COLORS.map(c => (
                      <Swatch key={c.id} hex={c.hex} label={c.label} selected={cfg.rivetColor === c.id} onClick={() => updateCfg("rivetColor")(c.id)} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle>Nose Pads</SectionTitle>
                  <div className="space-y-3">
                    {NOSE_PADS.map(n => (
                      <OptionCard key={n.id} label={n.label} selected={cfg.nosePads === n.id} onClick={() => updateCfg("nosePads")(n.id)} />
                    ))}
                  </div>
                </div>
                
                {cfg.shape === 'aviator' && (
                  <div>
                    <SectionTitle>Aviator Brow Bar</SectionTitle>
                    <div className="space-y-3">
                      {BROW_BAR_FINISHES.map(b => (
                        <OptionCard key={b.id} label={b.label} selected={cfg.browBar === b.id} onClick={() => updateCfg("browBar")(b.id)} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- TAB: FIT & SIZING --- */}
            {activeTab === "Fit & Sizing" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <SectionTitle>Overall Size</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SIZES.map(s => (
                      <OptionCard key={s.id} label={s.label} sub={s.sub} selected={cfg.size === s.id} onClick={() => updateCfg("size")(s.id)} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle>Smart Filter: Face Shape Guide</SectionTitle>
                  <div className="space-y-3">
                    {FACE_SHAPES.map(f => (
                      <OptionCard key={f.id} label={f.label} selected={cfg.faceShape === f.id} onClick={() => updateCfg("faceShape")(f.id)} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB: PERSONALIZE --- */}
            {activeTab === "Personalize" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <SectionTitle>Engraved Name or Initials</SectionTitle>
                  <input
                    type="text"
                    maxLength={20}
                    placeholder="e.g. ALEX M."
                    value={cfg.engraveName}
                    onChange={(e) => updateCfg("engraveName")(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-shadow"
                  />
                  <p className="text-xs text-gray-500 mt-2">Engraved on the interior temple (rotate preview to see).</p>
                </div>
                
                {cfg.engraveName && (
                  <>
                    <div>
                      <SectionTitle>Engraving Font Style</SectionTitle>
                      <div className="space-y-3">
                        {ENGRAVE_FONTS.map(f => (
                          <OptionCard key={f.id} label={f.label} selected={cfg.engraveFont === f.id} onClick={() => updateCfg("engraveFont")(f.id)} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <SectionTitle>Engraving Color</SectionTitle>
                      <div className="space-y-3">
                        {ENGRAVE_COLORS.map(c => (
                          <OptionCard key={c.id} label={c.label} selected={cfg.engraveColor === c.id} onClick={() => updateCfg("engraveColor")(c.id)} />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <SectionTitle>Custom Case Monogram / Color</SectionTitle>
                  <input
                    type="text"
                    placeholder="Optional: Case Monogram (e.g. AM)"
                    value={cfg.customCaseColor}
                    onChange={(e) => updateCfg("customCaseColor")(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-shadow"
                  />
                </div>

                <div>
                  <SectionTitle>Gift Message (Printed on Premium Card)</SectionTitle>
                  <textarea
                    rows={3}
                    placeholder="Write a message..."
                    value={cfg.giftMessage}
                    onChange={(e) => updateCfg("giftMessage")(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-shadow resize-none"
                  />
                </div>
              </div>
            )}

            {/* --- TAB: EXTRAS --- */}
            {activeTab === "Extras" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <SectionTitle>Included Case Style</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {CASE_STYLES.map(c => (
                      <OptionCard key={c.id} label={c.label} selected={cfg.caseStyle === c.id} onClick={() => updateCfg("caseStyle")(c.id)} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle>Cleaning Cloth Color</SectionTitle>
                  <div className="grid grid-cols-2 gap-3">
                    {CLOTH_COLORS.map(c => (
                      <OptionCard key={c.id} label={c.label} selected={cfg.clothColor === c.id} onClick={() => updateCfg("clothColor")(c.id)} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle>Prescription Lenses</SectionTitle>
                  <OptionCard 
                    label="Add Prescription (Rx)" 
                    sub="We'll email you a secure link to upload your prescription after checkout." 
                    selected={cfg.prescription} 
                    onClick={() => updateCfg("prescription")(!cfg.prescription)} 
                  />
                </div>

                <div>
                  <SectionTitle>Clip-On Lenses</SectionTitle>
                  <OptionCard 
                    label="Add Polarized Clip-On" 
                    sub="A seamless magnetic secondary lens." 
                    selected={cfg.clipOn} 
                    onClick={() => updateCfg("clipOn")(!cfg.clipOn)} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showThankYou && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4"
          role="presentation"
          onClick={() => setShowThankYou(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="thank-you-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="thank-you-title" className="text-lg font-semibold text-gray-900">
              Thank you for customising your sunglass
            </h2>
            <button
              type="button"
              onClick={() => setShowThankYou(false)}
              className="mt-5 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <style>{`
        :root { --scale: 0.5; }
        @media (min-width: 360px) { :root { --scale: 0.55; } }
        @media (min-width: 400px) { :root { --scale: 0.6; } }
        @media (min-width: 480px) { :root { --scale: 0.7; } }
        @media (min-width: 768px) { :root { --scale: 0.65; } }
        @media (min-width: 1024px) { :root { --scale: 0.85; } }
        @media (min-width: 1280px) { :root { --scale: 1; } }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        @media (min-width: 768px) { .custom-scrollbar::-webkit-scrollbar { width: 6px; } }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e5e7eb; border-radius: 20px; }
      `}</style>
    </div>
  );
}

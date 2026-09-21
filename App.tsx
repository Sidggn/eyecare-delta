import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type Shape = "wayfarer" | "aviator" | "rectangular" | "round" | "cat-eye";
type Color = "black" | "brown" | "grey";
type Size = "small" | "medium" | "large";

const shapes: { id: Shape; label: string }[] = [
  { id: "wayfarer", label: "Wayfarer" },
  { id: "aviator", label: "Aviator" },
  { id: "rectangular", label: "Rectangular" },
  { id: "round", label: "Round" },
  { id: "cat-eye", label: "Cat-eye" },
];
const colors: { id: Color; label: string; value: string }[] = [
  { id: "black", label: "Black", value: "#20201e" },
  { id: "brown", label: "Brown", value: "#714d35" },
  { id: "grey", label: "Grey", value: "#777b7e" },
];
const sizes: { id: Size; label: string; note: string }[] = [
  { id: "small", label: "Small", note: "49 mm" },
  { id: "medium", label: "Medium", note: "52 mm" },
  { id: "large", label: "Large", note: "55 mm" },
];

const shapePath: Record<Shape, string> = {
  wayfarer: "M18 46 Q20 38 30 38 H83 Q92 38 94 46 L90 105 Q89 114 80 115 H32 Q22 114 21 105 Z",
  aviator: "M18 45 Q18 35 30 34 H83 Q94 35 94 45 L88 98 Q83 116 56 122 Q29 116 24 98 Z",
  rectangular: "M20 43 Q20 38 26 38 H88 Q94 38 94 43 V104 Q94 110 88 110 H26 Q20 110 20 104 Z",
  round: "M56 32 A43 43 0 1 1 56 118 A43 43 0 1 1 56 32",
  "cat-eye": "M13 48 L30 35 Q54 28 78 38 Q87 35 94 40 L94 101 Q91 113 80 116 H32 Q21 113 20 101 Z",
};

function ChoiceButton({ selected, label, onClick, children }: { selected: boolean; label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick} className={`choice ${selected ? "choice-selected" : ""}`}>
      {children}
      <span>{label}</span>
    </button>
  );
}

function FramePreview({ shape, frameColor, lensColor, engraving, size }: { shape: Shape; frameColor: Color; lensColor: Color; engraving: string; size: Size }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const frame = colors.find((item) => item.id === frameColor)?.value ?? colors[0].value;
  const lens = colors.find((item) => item.id === lensColor)?.value ?? colors[2].value;
  const scale = size === "small" ? 0.86 : size === "large" ? 1.08 : 1;
  return (
    <div className="preview-stage">
      <div className="preview-copy"><span>YOUR FRAME</span><strong>Made to be yours.</strong></div>
      <div className="frame-3d-wrap" onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setRotation({ x: ((event.clientY - rect.top) / rect.height - 0.5) * -12, y: ((event.clientX - rect.left) / rect.width - 0.5) * 18 }); }} onPointerLeave={() => setRotation({ x: 0, y: 0 })}>
        <svg className="frame-svg" viewBox="0 0 200 150" role="img" aria-label={`${shape} frame preview`} style={{ transform: `scale(${scale}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}>
        <defs><linearGradient id="lens-glow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={lens} stopOpacity=".55" /><stop offset="1" stopColor={lens} stopOpacity=".18" /></linearGradient></defs>
        <g fill="url(#lens-glow)" stroke={frame} strokeWidth="6" strokeLinejoin="round">
          <path d={shapePath[shape]} transform="translate(-1 0)" />
          <path d={shapePath[shape]} transform="translate(1 0) scale(-1 1) translate(-198 0)" />
        </g>
        <path d="M99 54 Q100 47 101 54" fill="none" stroke={frame} strokeWidth="6" strokeLinecap="round" />
        <path d="M39 51 L19 42 M159 51 L181 42" fill="none" stroke={frame} strokeWidth="6" strokeLinecap="round" />
        {engraving && <text x="100" y="140" textAnchor="middle" fill={frame} fontSize="7" letterSpacing="2">{engraving.toUpperCase()}</text>}
        </svg>
      </div>
      <div className="preview-caption"><span>Front-facing preview</span><span>{size} fit</span></div>
    </div>
  );
}

export default function App() {
  const [shape, setShape] = useState<Shape>("wayfarer");
  const [frameColor, setFrameColor] = useState<Color>("black");
  const [lensColor, setLensColor] = useState<Color>("grey");
  const [size, setSize] = useState<Size>("medium");
  const [engraving, setEngraving] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return <main className="success"><div className="success-card"><div className="success-mark"><Check size={25} /></div><p className="eyebrow">Your design is saved</p><h1>Beautifully, <em>uniquely</em> yours.</h1><p>We&apos;ve captured your custom frame selections{engraving ? ` with “${engraving}” engraved.` : "."}</p><button type="button" className="text-button" onClick={() => setSubmitted(false)}>Edit design</button></div></main>;

  return (
    <main className="app-shell">
      <section className="preview-panel"><header><div className="brand">eye<span>care</span><b>.</b></div><span className="step">01 <i /> 01</span></header><FramePreview shape={shape} frameColor={frameColor} lensColor={lensColor} engraving={engraving} size={size} /><p className="preview-note">A considered frame, designed around you.</p></section>
      <section className="controls-panel"><div className="controls-inner"><div className="intro"><p className="eyebrow">Custom eyewear</p><h1>Find your <em>perfect</em> frame.</h1><p>Choose the details that make it unmistakably yours.</p></div>
        <div className="control-group"><label className="group-label">Frame shape</label><div className="shape-grid">{shapes.map((item) => <ChoiceButton key={item.id} selected={shape === item.id} label={item.label} onClick={() => setShape(item.id)}><span className={`shape-icon ${item.id}`} /></ChoiceButton>)}</div></div>
        <div className="control-group"><label className="group-label">Frame color</label><div className="swatch-row">{colors.map((item) => <ChoiceButton key={item.id} selected={frameColor === item.id} label={item.label} onClick={() => setFrameColor(item.id)}><span className="swatch" style={{ backgroundColor: item.value }} /></ChoiceButton>)}</div></div>
        <div className="control-group"><label className="group-label">Lens tint</label><div className="swatch-row">{colors.map((item) => <ChoiceButton key={item.id} selected={lensColor === item.id} label={item.label} onClick={() => setLensColor(item.id)}><span className="swatch lens-swatch" style={{ backgroundColor: item.value }} /></ChoiceButton>)}</div></div>
        <div className="control-group"><label className="group-label">Size</label><div className="size-row">{sizes.map((item) => <button type="button" key={item.id} aria-pressed={size === item.id} onClick={() => setSize(item.id)} className={`size-button ${size === item.id ? "selected" : ""}`}><strong>{item.label}</strong><small>{item.note}</small></button>)}</div></div>
        <div className="control-group engraving"><label className="group-label" htmlFor="engraving">Engraved name or initials <small>Optional</small></label><input id="engraving" maxLength={14} value={engraving} onChange={(event) => setEngraving(event.target.value)} placeholder="e.g. A. KIM" /><span>{engraving.length}/14</span></div>
        <button type="button" className="proceed-button" onClick={() => setSubmitted(true)}>Click here to proceed <ArrowRight size={18} /></button>
      </div></section>
    </main>
  );
}

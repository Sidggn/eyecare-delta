import { useState } from "react"
import { Check, Move3d } from "lucide-react"

type Shape = "wayfarer" | "aviator" | "round" | "catEye"
type Color = "black" | "grey" | "brown"
type Size = "S" | "M" | "L"

const shapes: { id: Shape; label: string; path: string }[] = [
  { id: "wayfarer", label: "Wayfarer", path: "M18 42 Q18 32 28 32 H84 Q94 32 94 42 L90 102 Q89 112 79 114 H33 Q23 112 22 102 Z" },
  { id: "aviator", label: "Aviator", path: "M18 42 Q18 31 30 30 H82 Q94 31 94 42 L88 92 Q83 112 56 118 Q29 112 24 92 Z" },
  { id: "round", label: "Round", path: "M56 28 A43 43 0 1 1 56 114 A43 43 0 1 1 56 28" },
  { id: "catEye", label: "Cat-eye", path: "M12 45 L28 31 Q51 24 74 34 Q87 28 96 39 L92 99 Q89 112 79 114 H33 Q22 112 20 99 Z" },
]

const colors: { id: Color; label: string; hex: string }[] = [
  { id: "black", label: "Black", hex: "#20211f" },
  { id: "grey", label: "Grey", hex: "#777875" },
  { id: "brown", label: "Brown", hex: "#815b3b" },
]

const sizes: { id: Size; label: string }[] = [
  { id: "S", label: "Small" },
  { id: "M", label: "Medium" },
  { id: "L", label: "Large" },
]

function Choice({ label, selected, onClick, detail }: { label: string; selected: boolean; onClick: () => void; detail?: string }) {
  return <button type="button" onClick={onClick} className={`choice ${selected ? "choice-selected" : ""}`} aria-pressed={selected}>
    <span><strong>{label}</strong>{detail && <small>{detail}</small>}</span>
    <span className={`choice-check ${selected ? "checked" : ""}`}>{selected && <Check size={12} />}</span>
  </button>
}

function Swatch({ color, selected, onClick }: { color: typeof colors[number]; selected: boolean; onClick: () => void }) {
  return <button type="button" aria-label={color.label} title={color.label} onClick={onClick} className={`swatch ${selected ? "swatch-selected" : ""}`} style={{ background: color.hex }}>{selected && <Check size={16} />}</button>
}

function FramePreview({ shape, frameColor, lensColor, size, engraving, rotation }: { shape: Shape; frameColor: Color; lensColor: Color; size: Size; engraving: string; rotation: number }) {
  const selectedShape = shapes.find(item => item.id === shape) ?? shapes[0]
  const frame = colors.find(item => item.id === frameColor)?.hex ?? colors[0].hex
  const lens = colors.find(item => item.id === lensColor)?.hex ?? colors[1].hex
  const scale = size === "S" ? 0.82 : size === "L" ? 1.1 : 0.96
  return <div className="preview-wrap" onPointerMove={event => { const rect = event.currentTarget.getBoundingClientRect(); const y = ((event.clientX - rect.left) / rect.width - .5) * 18; const x = ((event.clientY - rect.top) / rect.height - .5) * -10; event.currentTarget.style.setProperty("--rx", `${x}deg`); event.currentTarget.style.setProperty("--ry", `${y}deg`) }} onPointerLeave={event => { event.currentTarget.style.setProperty("--rx", "0deg"); event.currentTarget.style.setProperty("--ry", "0deg") }}>
    <div className="frame-3d" style={{ transform: `scale(${scale}) rotateX(var(--rx, 0deg)) rotateY(calc(${rotation}deg + var(--ry, 0deg)))` }}>
      <svg viewBox="0 0 112 145" role="img" aria-label={`${selectedShape.label} frame preview`}>
        <defs><linearGradient id="lens-shine" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".45" /><stop offset=".48" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".18" /></linearGradient></defs>
        <g transform="translate(4 12)"><path d={selectedShape.path} fill={lens} opacity=".72" /><path d={selectedShape.path} fill="url(#lens-shine)" /><path d={selectedShape.path} fill="none" stroke={frame} strokeWidth="7" strokeLinejoin="round" /><g transform="translate(104 0) scale(-1 1)"><path d={selectedShape.path} fill={lens} opacity=".72" /><path d={selectedShape.path} fill="url(#lens-shine)" /><path d={selectedShape.path} fill="none" stroke={frame} strokeWidth="7" strokeLinejoin="round" /></g><path d="M49 58 Q56 51 63 58 L63 66 Q56 61 49 66Z" fill={frame} /><path d="M14 52 L2 48 M98 52 L110 48" stroke={frame} strokeWidth="5" strokeLinecap="round" />{engraving && <text x="56" y="139" textAnchor="middle" fill={frame} fontSize="5" letterSpacing="2">{engraving.toUpperCase()}</text>}</g>
      </svg>
    </div>
  </div>
}

export default function App() {
  const [shape, setShape] = useState<Shape>("wayfarer")
  const [frameColor, setFrameColor] = useState<Color>("black")
  const [lensColor, setLensColor] = useState<Color>("grey")
  const [size, setSize] = useState<Size>("M")
  const [engraving, setEngraving] = useState("")
  const [rotation, setRotation] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  if (submitted) return <main className="complete-page"><section className="complete-card"><div className="complete-icon"><Check /></div><p>eyecare custom studio</p><h1>Your frame is ready.</h1><button type="button" onClick={() => setSubmitted(false)}>Edit selection</button></section></main>

  return <main className="customizer-page">
    <section className="preview-panel"><div className="brand">eyecare<span>.</span></div><div className="mode-pill"><Move3d size={14} /> Interactive 3D</div><div className="preview-content"><p className="eyebrow">FRAME STUDIO</p><h1>Make it yours.</h1><FramePreview shape={shape} frameColor={frameColor} lensColor={lensColor} size={size} engraving={engraving} rotation={rotation} /><div className="rotation-control"><span>Rotate view</span><input aria-label="Rotate view" type="range" min="-35" max="35" value={rotation} onChange={event => setRotation(Number(event.target.value))} /><span>{rotation}°</span></div></div></section>
    <section className="controls-panel"><div className="controls-inner"><div className="section-kicker">01 / CUSTOMIZE</div><h2>Choose your frame</h2><div className="control-group"><h3>Frame shape</h3><div className="choice-grid">{shapes.map(item => <Choice key={item.id} label={item.label} selected={shape === item.id} onClick={() => setShape(item.id)} />)}</div></div><div className="control-group"><h3>Frame color</h3><div className="swatch-row">{colors.map(color => <Swatch key={color.id} color={color} selected={frameColor === color.id} onClick={() => setFrameColor(color.id)} />)}</div><div className="swatch-labels">{colors.map(color => <span key={color.id}>{color.label}</span>)}</div></div><div className="control-group"><h3>Lens color</h3><div className="swatch-row">{colors.map(color => <Swatch key={color.id} color={color} selected={lensColor === color.id} onClick={() => setLensColor(color.id)} />)}</div><div className="swatch-labels">{colors.map(color => <span key={color.id}>{color.label}</span>)}</div></div><div className="control-group"><h3>Fit &amp; sizing <small>Overall size</small></h3><div className="choice-grid size-grid">{sizes.map(item => <Choice key={item.id} label={item.label} detail={item.id} selected={size === item.id} onClick={() => setSize(item.id)} />)}</div></div><div className="control-group add-ons"><h3>Add-ons</h3><label htmlFor="engraving">Engraved Name or Initials <span>Optional</span></label><input id="engraving" maxLength={14} value={engraving} onChange={event => setEngraving(event.target.value)} placeholder="Enter name or initials" /></div><button type="button" className="proceed-button" onClick={() => setSubmitted(true)}>Click here to proceed <span>→</span></button></div></section>
  </main>
}

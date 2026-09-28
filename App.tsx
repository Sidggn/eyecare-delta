import { Suspense, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, Loader, OrbitControls, Text } from "@react-three/drei"
import * as THREE from "three"
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

const lensProfiles: Record<Shape, [number, number][]> = {
  wayfarer: [[-0.82, 0.62], [0.72, 0.62], [0.84, 0.42], [0.7, -0.62], [-0.66, -0.62], [-0.84, 0.3]],
  aviator: [[-0.78, 0.58], [0.78, 0.58], [0.68, 0.12], [0.45, -0.56], [0, -0.78], [-0.45, -0.56], [-0.68, 0.12]],
  round: [[0, 0.82], [0.58, 0.58], [0.82, 0], [0.58, -0.58], [0, -0.82], [-0.58, -0.58], [-0.82, 0], [-0.58, 0.58]],
  catEye: [[-0.88, 0.55], [-0.45, 0.78], [0.18, 0.62], [0.78, 0.7], [0.86, 0.25], [0.68, -0.58], [-0.62, -0.58], [-0.82, 0.08]],
}

function Lens({ x, frame, lens, shape }: { x: number; frame: string; lens: string; shape: Shape }) { // ShapeGeometry keeps each selected silhouette declarative and R3F-safe.
  const profile = useMemo(() => { const outline = new THREE.Shape(); lensProfiles[shape].forEach(([px, py], index) => index === 0 ? outline.moveTo(px, py) : outline.lineTo(px, py)); outline.closePath(); return outline }, [shape])
  return <group position={[x, 0, 0]}>
    <mesh position={[0, 0, 0.02]} scale={[1.1, 1.1, 1]}><shapeGeometry args={[profile]} /><meshPhysicalMaterial color={frame} roughness={0.32} clearcoat={0.65} /></mesh>
    <mesh position={[0, 0, 0.08]}><shapeGeometry args={[profile]} /><meshPhysicalMaterial color={lens} transmission={1} roughness={0.05} thickness={0.5} ior={1.5} clearcoat={1} transparent opacity={0.9} /></mesh>
  </group>
}

function SunglassesModel({ shape, frameColor, lensColor, size, engraving, rotation }: { shape: Shape; frameColor: Color; lensColor: Color; size: Size; engraving: string; rotation: number }) {
  const group = useRef<THREE.Group>(null)
  const frame = colors.find(item => item.id === frameColor)?.hex ?? colors[0].hex
  const lens = colors.find(item => item.id === lensColor)?.hex ?? colors[1].hex
  const scale = size === "S" ? 0.82 : size === "L" ? 1.1 : 0.96
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += (rotation * Math.PI / 180 - group.current.rotation.y) * Math.min(delta * 5, 1) })
  return <group ref={group} scale={scale} rotation={[0, 0, 0]}>
    <Lens x={-1.02} frame={frame} lens={lens} shape={shape} /><Lens x={1.02} frame={frame} lens={lens} shape={shape} />
    <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.08, 0.08, 0.72, 24]} /><meshPhysicalMaterial color={frame} roughness={0.35} clearcoat={0.6} /></mesh>
    <mesh position={[-0.1, 0, 0]}><sphereGeometry args={[0.13, 24, 16]} /><meshPhysicalMaterial color={frame} roughness={0.3} clearcoat={0.6} /></mesh><mesh position={[0.1, 0, 0]}><sphereGeometry args={[0.13, 24, 16]} /><meshPhysicalMaterial color={frame} roughness={0.3} clearcoat={0.6} /></mesh>
    <mesh position={[-1.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.07, 0.07, 1.2, 20]} /><meshPhysicalMaterial color={frame} roughness={0.35} clearcoat={0.6} /></mesh><mesh position={[1.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.07, 0.07, 1.2, 20]} /><meshPhysicalMaterial color={frame} roughness={0.35} clearcoat={0.6} /></mesh>
    {engraving && <mesh position={[0, -1.25, 0.08]} scale={[Math.min(0.8, engraving.length * 0.055), 0.025, 0.015]}><boxGeometry args={[1, 1, 1]} /><meshPhysicalMaterial color="#ffffff" roughness={0.35} /></mesh>}
  </group>
}

function FramePreview({ shape, frameColor, lensColor, size, engraving, rotation }: { shape: Shape; frameColor: Color; lensColor: Color; size: Size; engraving: string; rotation: number }) {
  return <div className="preview-wrap"><Canvas fallback={<Loader />} camera={{ position: [0, 0.1, 5], fov: 36 }} dpr={[1, 2]}><ambientLight intensity={0.8} /><directionalLight position={[2, 3, 4]} intensity={1.4} /><SunglassesModel shape={shape} frameColor={frameColor} lensColor={lensColor} size={size} engraving={engraving} rotation={rotation} /><ContactShadows position={[0, -1.2, 0]} opacity={0.3} scale={5} blur={2} /><Suspense fallback={null}><Environment preset="studio" /></Suspense><OrbitControls enablePan={false} minDistance={2} maxDistance={6} autoRotate autoRotateSpeed={0.6} /></Canvas><Loader /></div>
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

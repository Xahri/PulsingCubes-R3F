import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import { Overlay } from './components/Overlay';
import CubeGrid from './components/Pulse';
import { useControls } from 'leva'

export default function App() {

  // define the controls
  const controls = useControls({
    gridScale: { value: 14, min: 2, max: 24, step: 1 },
    pulseStrength: { value: 10, min: 2, max: 24, step: 1 },
    cubesSpacing: { value: 3, min: 1, max: 8, step: 1 }
  });
  const { backgroundColor } = useControls({ backgroundColor: '#242424' })

  return (
    <div style={{ background: backgroundColor }}>
      <Canvas dpr={[1, 2]} camera={{ position: [500, 500, 500], near: 1, far: 4000 }} orthographic={ true } > 
      <CubeGrid count={169} scale={controls.gridScale} rippleStrength={controls.pulseStrength} spacing={controls.cubesSpacing} />
      <OrbitControls />
      </Canvas>
      <Overlay />
    </div>
  )
}
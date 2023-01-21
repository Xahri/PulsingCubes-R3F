import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'
import { RoundedBox } from "@react-three/drei";

function CubeGrid({ count, scale, rippleStrength, spacing }) {

  const meshRefs = useRef([]);
  const clickedCubeIndex = useRef(null);
  const gridSize = Math.ceil(Math.sqrt(count));

  function animateSurroundingCubes(index, gridSize) {
    let x = index % gridSize;
    let z = Math.floor(index / gridSize);
    meshRefs.current.forEach((meshRef, i) => {
      let x2 = i % gridSize;
      let z2 = Math.floor(i / gridSize);
      let distance = Math.sqrt((x2 - x) ** 2 + (z2 - z) ** 2);
      meshRef.userData.distance = distance;
    });
  }

  // define the controls
  const controls = useControls({
    color1: "#ffffff",
    color2: "#ff48ff",
    animationSpeed: { value: 6, min: 1, max: 12, step: 0.1 },
    pulseBandWidth: { value: 0.6, min: 0, max: 2, step: 0.01 }
  });

  useFrame((state) => {
    meshRefs.current.forEach((meshRef) => {
      if (clickedCubeIndex.current !== null) {
        meshRef.position.y = (Math.cos(state.clock.getElapsedTime()*controls.animationSpeed - meshRef.userData.distance*controls.pulseBandWidth) + 1) * rippleStrength / 2;
        // calculate interpolation factor
        let t = meshRef.position.y / rippleStrength;
        // create two colors
        let color1 = new THREE.Color(controls.color1);
        let color2 = new THREE.Color(controls.color2);
        // lerp between the two colors
        let color = color1.lerp(color2, t);
        meshRef.material.color = color;
      }
    });
  });


  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 10]} />
      {Array.from({length: count}, (_, i) => {
        return (
          <RoundedBox args={[1,1,1]} radius={0.06} smoothness={1} // mesh
            key={i}
            ref={meshRef => {
              meshRefs.current[i] = meshRef;
            }}
            onClick={e => {
              clickedCubeIndex.current = i;
              animateSurroundingCubes(i, gridSize);
            }}
            // position={[(i % gridSize) * (spacing*scale), 0, Math.floor(i / gridSize) * (spacing*scale)]}
            // this formula makes the center of the grid be the cube at the center instead of the cube at the top corner.
            position={[((i % gridSize) - (gridSize-1)/2) * (spacing*scale), 0, (Math.floor(i / gridSize) - (gridSize-1)/2) * (spacing*scale)]}
            scale={[scale,scale,scale]}
          >
            <meshStandardMaterial color={'white'} />
          </RoundedBox>
        )
      })}
    </>
  )
}

export default CubeGrid
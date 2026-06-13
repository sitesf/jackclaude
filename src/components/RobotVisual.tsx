import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Center } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/jackclaude/models/nexbot.glb';

function Model() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  // Rotație lentă + ușoară urmărire a mouse-ului
  useFrame((state) => {
    if (!group.current) return;
    const targetY = state.pointer.x * 0.5;
    const targetX = -state.pointer.y * 0.2;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05 + 0.0025;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
  });

  return (
    // Mărit + coborât (offset în afara Center) ca să se vadă jumătatea de sus.
    // Center așază modelul în origine; rotația se face pe loc în jurul centrului.
    <group position={[0, -1.4, 0]} scale={1.7}>
      <group ref={group}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export const RobotVisual: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* fundal radial */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(circle at 50% 42%, rgba(182,0,168,0.3), transparent 60%), radial-gradient(circle at 50% 85%, rgba(0,212,255,0.12), transparent 60%)',
      }}
    />
    <Canvas camera={{ position: [0, 0, 5], fov: 38 }} dpr={[1, 2]} style={{ position: 'relative', zIndex: 5 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-4, 2, 3]} intensity={2.2} color="#B600A8" />
      <pointLight position={[4, -1, 2]} intensity={1.6} color="#00D4FF" />
      <Suspense fallback={null}>
        <Model />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  </div>
);

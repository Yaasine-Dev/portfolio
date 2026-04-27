import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../ThemeContext';
import * as THREE from 'three';

function Particles({ count = 1400, dark }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => Array.from({ length: count }, () => ({
    pos: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15],
    speed: 0.002 + Math.random() * 0.004,
    offset: Math.random() * Math.PI * 2,
    size: 0.015 + Math.random() * 0.025,
  })), [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      dummy.position.set(
        p.pos[0] + Math.sin(t * p.speed + p.offset) * 0.3,
        p.pos[1] + Math.cos(t * p.speed * 0.7 + p.offset) * 0.2,
        p.pos[2]
      );
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color={dark ? '#28729F' : '#1a5478'} transparent opacity={dark ? 0.5 : 0.3} />
    </instancedMesh>
  );
}

function FloatingRings({ dark }) {
  const group = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current.rotation.x = t * 0.04;
    group.current.rotation.y = t * 0.06;
  });
  return (
    <group ref={group}>
      {[6, 9, 12].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / (3 + i), i * 0.5, 0]}>
          <torusGeometry args={[r, 0.015, 8, 120]} />
          <meshBasicMaterial color={dark ? '#28729F' : '#1a5478'} transparent opacity={dark ? 0.1 - i * 0.02 : 0.06 - i * 0.015} />
        </mesh>
      ))}
    </group>
  );
}

function WaveGrid({ dark }) {
  const mesh = useRef();
  const geo = useMemo(() => new THREE.PlaneGeometry(40, 40, 60, 60), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.4;
    const pos = mesh.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setZ(i, Math.sin(pos.getX(i) * 0.4 + t) * 0.3 + Math.cos(pos.getY(i) * 0.3 + t * 0.8) * 0.2);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={mesh} geometry={geo} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -6, -4]}>
      <meshBasicMaterial color={dark ? '#28729F' : '#1a5478'} wireframe transparent opacity={dark ? 0.06 : 0.04} />
    </mesh>
  );
}

export default function ThreeBackground() {
  const { dark } = useTheme();
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        frameloop="always"
      >
        <Particles dark={dark} />
        <FloatingRings dark={dark} />
        <WaveGrid dark={dark} />
      </Canvas>
    </div>
  );
}

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Text, PerspectiveCamera } from '@react-three/drei';

interface FloatingIconProps {
  icon: string;
  color?: string;
}

function FloatingMesh({ icon, color = '#4F46E5' }: FloatingIconProps) {
  const { rotation } = useSpring({
    from: { rotation: [0, 0, 0] },
    to: { rotation: [0, Math.PI * 2, 0] },
    loop: true,
    config: { duration: 3000 }
  });

  return (
    <animated.mesh rotation={rotation}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />
      <Text
        position={[0, 0, 1.1]}
        fontSize={1}
        color="#ffffff"
      >
        {icon}
      </Text>
    </animated.mesh>
  );
}

export default function FloatingIcon({ icon, color }: FloatingIconProps) {
  return (
    <Canvas style={{ height: '100px', width: '100px' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <FloatingMesh icon={icon} color={color} />
    </Canvas>
  );
}
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Text, PerspectiveCamera, OrbitControls } from '@react-three/drei';

interface ScoreCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isHovered: boolean;
}

function Card({ position, rotation, scale, children }: any) {
  const props = useSpring({
    scale: scale,
    position: position,
    rotation: rotation,
    config: { mass: 1, tension: 170, friction: 26 }
  });

  return <animated.mesh {...props}>{children}</animated.mesh>;
}

export default function ScoreCard({ homeTeam, awayTeam, homeScore, awayScore, isHovered }: ScoreCardProps) {
  return (
    <Canvas style={{ height: '200px' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <Card
        position={[0, 0, 0]}
        rotation={[0, isHovered ? Math.PI / 12 : 0, 0]}
        scale={isHovered ? 1.1 : 1}
      >
        <mesh>
          <boxGeometry args={[4, 2, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <Text
          position={[-1.5, 0.5, 0.06]}
          fontSize={0.3}
          color="#000000"
        >
          {homeTeam}
        </Text>
        <Text
          position={[1.5, 0.5, 0.06]}
          fontSize={0.3}
          color="#000000"
        >
          {awayTeam}
        </Text>
        <Text
          position={[-1.5, -0.5, 0.06]}
          fontSize={0.4}
          color="#000000"
        >
          {homeScore}
        </Text>
        <Text
          position={[1.5, -0.5, 0.06]}
          fontSize={0.4}
          color="#000000"
        >
          {awayScore}
        </Text>
      </Card>
    </Canvas>
  );
}
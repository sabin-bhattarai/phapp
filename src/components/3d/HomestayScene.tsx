"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Sphere,
  Box,
  Cylinder,
  Cone,
  PresentationControls,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

function House() {
  const houseRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!houseRef.current) return;
    houseRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    houseRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.04 - 0.2;
  });

  return (
    <group ref={houseRef} scale={[0.9, 0.9, 0.9]}>
      {/* Main house body */}
      <Box args={[2, 1.2, 1.6]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#F5F5F2" roughness={0.4} metalness={0.05} />
      </Box>

      {/* Main roof — forest green */}
      <Cone args={[1.7, 0.9, 4]} position={[0, 0.95, 0]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#006D3A" roughness={0.3} />
      </Cone>

      {/* Roof ridge cap */}
      <Box args={[2.2, 0.08, 0.08]} position={[0, 1.38, 0]}>
        <meshStandardMaterial color="#004D28" roughness={0.2} />
      </Box>

      {/* Door */}
      <Box args={[0.35, 0.65, 0.05]} position={[0, -0.28, 0.83]}>
        <meshStandardMaterial color="#7B4F2E" roughness={0.5} />
      </Box>
      <Box args={[0.38, 0.05, 0.06]} position={[0, 0.07, 0.83]}>
        <meshStandardMaterial color="#5A3720" roughness={0.4} />
      </Box>

      {/* Windows */}
      {[-0.55, 0.55].map((x, i) => (
        <group key={i} position={[x, 0.18, 0.83]}>
          <Box args={[0.35, 0.3, 0.04]}>
            <meshStandardMaterial color="#A8D5BA" roughness={0.1} metalness={0.3} transparent opacity={0.8} />
          </Box>
          <Box args={[0.02, 0.3, 0.06]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#5A3720" roughness={0.5} />
          </Box>
          <Box args={[0.35, 0.02, 0.06]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#5A3720" roughness={0.5} />
          </Box>
        </group>
      ))}

      {/* Side windows */}
      {[-1.01].map((x) => (
        <Box key={x} args={[0.04, 0.28, 0.3]} position={[x, 0.18, 0]}>
          <meshStandardMaterial color="#A8D5BA" roughness={0.1} metalness={0.3} transparent opacity={0.7} />
        </Box>
      ))}

      {/* Balcony */}
      <Box args={[2.1, 0.06, 0.5]} position={[0, -0.57, 1.0]}>
        <meshStandardMaterial color="#DCC7A1" roughness={0.6} />
      </Box>
      {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
        <Box key={i} args={[0.04, 0.5, 0.04]} position={[x, -0.35, 1.2]}>
          <meshStandardMaterial color="#DCC7A1" roughness={0.6} />
        </Box>
      ))}
      <Box args={[2.0, 0.05, 0.05]} position={[0, -0.1, 1.22]}>
        <meshStandardMaterial color="#DCC7A1" roughness={0.5} />
      </Box>

      {/* Chimney */}
      <Box args={[0.2, 0.5, 0.2]} position={[0.5, 1.25, -0.2]}>
        <meshStandardMaterial color="#8B6552" roughness={0.7} />
      </Box>

      {/* Foundation */}
      <Box args={[2.2, 0.15, 1.8]} position={[0, -0.68, 0]}>
        <meshStandardMaterial color="#DCC7A1" roughness={0.8} />
      </Box>
    </group>
  );
}

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const treeRef = useRef<THREE.Group>(null);
  const swayOffset = useRef(0);
  useEffect(() => { swayOffset.current = Math.random() * Math.PI * 2; }, []);

  useFrame((state) => {
    if (!treeRef.current) return;
    treeRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.6 + swayOffset.current) * 0.025;
  });

  return (
    <group ref={treeRef} position={position} scale={[scale, scale, scale]}>
      <Cylinder args={[0.06, 0.1, 0.7, 6]} position={[0, -0.35, 0]}>
        <meshStandardMaterial color="#7B4F2E" roughness={0.8} />
      </Cylinder>
      <Cone args={[0.5, 0.9, 6]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="#006D3A" roughness={0.5} />
      </Cone>
      <Cone args={[0.38, 0.7, 6]} position={[0, 0.65, 0]}>
        <meshStandardMaterial color="#00823F" roughness={0.5} />
      </Cone>
      <Cone args={[0.25, 0.55, 6]} position={[0, 0.95, 0]}>
        <meshStandardMaterial color="#8DC63F" roughness={0.4} />
      </Cone>
    </group>
  );
}

function Hill({ position, scale = [1, 1, 1] }: { position: [number, number, number]; scale?: [number, number, number] }) {
  return (
    <Sphere args={[1, 16, 16]} position={position} scale={scale}>
      <meshStandardMaterial color="#006D3A" roughness={0.9} opacity={0.6} transparent />
    </Sphere>
  );
}

function FloatingLeaf({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const leafRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!leafRef.current) return;
    const t = state.clock.elapsedTime + delay;
    leafRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
    leafRef.current.position.x = position[0] + Math.sin(t * 0.5) * 0.15;
    leafRef.current.rotation.z = Math.sin(t * 0.6) * 0.3;
    leafRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
  });

  return (
    <mesh ref={leafRef} position={position}>
      <sphereGeometry args={[0.04, 4, 2]} />
      <meshStandardMaterial color="#8DC63F" roughness={0.3} emissive="#8DC63F" emissiveIntensity={0.3} />
    </mesh>
  );
}

function Ground() {
  return (
    <>
      <Cylinder args={[4.5, 4.5, 0.12, 32]} position={[0, -1.1, 0]}>
        <meshStandardMaterial color="#3A7D44" roughness={0.95} />
      </Cylinder>
      <Cylinder args={[3.5, 3.5, 0.06, 32]} position={[0, -1.03, 0]}>
        <meshStandardMaterial color="#4A8D52" roughness={0.9} />
      </Cylinder>
    </>
  );
}

function Cloud({ position }: { position: [number, number, number] }) {
  const cloudRef = useRef<THREE.Group>(null);
  const speed = useRef(0.03);
  useEffect(() => { speed.current = 0.03 + Math.random() * 0.02; }, []);

  useFrame(() => {
    if (!cloudRef.current) return;
    cloudRef.current.position.x += speed.current * 0.005;
    if (cloudRef.current.position.x > 6) cloudRef.current.position.x = -6;
  });

  return (
    <group ref={cloudRef} position={position}>
      {[
        [0, 0, 0, 0.35],
        [0.28, 0.05, 0, 0.28],
        [-0.28, 0.05, 0, 0.28],
        [0.5, -0.03, 0, 0.2],
        [-0.5, -0.03, 0, 0.2],
      ].map(([x, y, z, r], i) => (
        <Sphere key={i} args={[r, 8, 8]} position={[x, y, z]}>
          <meshStandardMaterial color="#FFFFFF" roughness={1} opacity={0.55} transparent />
        </Sphere>
      ))}
    </group>
  );
}

function Lantern({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    lightRef.current.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });

  return (
    <group position={position}>
      <Cylinder args={[0.02, 0.02, 0.8, 4]} position={[0, -0.4, 0]}>
        <meshStandardMaterial color="#7B4F2E" roughness={0.8} />
      </Cylinder>
      <Box args={[0.14, 0.18, 0.14]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#DCC7A1" roughness={0.4} emissive="#FFD700" emissiveIntensity={0.4} transparent opacity={0.85} />
      </Box>
      <pointLight ref={lightRef} color="#FFD700" intensity={0.5} distance={2} position={[0, 0.1, 0]} />
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} color="#E6F4EC" />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        color="#FFF9E6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 3, -2]} intensity={0.5} color="#C2E3D0" />
      <pointLight position={[0, 4, 3]} intensity={0.8} color="#8DC63F" distance={10} />

      <PresentationControls
        global
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.15}>
          <House />
        </Float>

        <Ground />

        {/* Contact shadows for realistic depth */}
        <ContactShadows position={[0, -1.02, 0]} opacity={0.6} scale={10} blur={2.5} far={4} frames={1} />

      {/* Trees */}
      <Tree position={[-2.4, -0.85, -0.5]} scale={0.9} />
      <Tree position={[2.2, -0.85, -0.3]} scale={0.8} />
      <Tree position={[-1.8, -0.9, 1.0]} scale={0.7} />
      <Tree position={[1.9, -0.9, 0.8]} scale={0.75} />
      <Tree position={[0.5, -0.9, -1.4]} scale={0.65} />
      <Tree position={[-0.6, -0.9, -1.4]} scale={0.7} />

      {/* Hills in background */}
      <Hill position={[-3.5, -2.2, -3]} scale={[2.5, 1.2, 1.5]} />
      <Hill position={[3, -2.5, -3.5]} scale={[2.2, 1.3, 1.5]} />
      <Hill position={[0, -2.8, -4]} scale={[3, 1.5, 1.5]} />

      {/* Clouds */}
      <Cloud position={[-3, 2.5, -3]} />
      <Cloud position={[2, 3, -4]} />
      <Cloud position={[0, 2.8, -5]} />

      {/* Lanterns */}
      <Lantern position={[-1.2, -0.3, 1.3]} />
      <Lantern position={[1.2, -0.3, 1.3]} />

      {/* Floating leaf particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingLeaf
          key={i}
          position={[(i - 4) * 0.5, 0.5, (i % 2 === 0 ? 1 : -1) * 0.5]}
          delay={i * 0.8}
        />
      ))}
      </PresentationControls>

      <Environment preset="forest" />
      <fog attach="fog" args={["#C2E3D0", 10, 25]} />
    </>
  );
}

export default function HomestayScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      className="w-full h-full"
    >
      <SceneContent />
    </Canvas>
  );
}

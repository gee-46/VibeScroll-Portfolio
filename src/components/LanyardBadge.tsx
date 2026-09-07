'use client';

import * as THREE from 'three';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { generateCardTexture, generateCardBackTexture, generateStrapTexture } from './generateTextures';

extend({ MeshLineGeometry, MeshLineMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

export interface LanyardBadgeProps {
  name?: string;
  role?: string;
  photoUrl?: string;
  strapLabel?: string;
  modelUrl?: string;
  className?: string;
  hasDropped?: boolean;
  debug?: boolean;
}

const DEFAULTS = {
  name: 'GAUTAM N CHIPKAR',
  role: 'AI & Data Science Engineer',
  photoUrl: '/gautam.png',
  strapLabel: 'GAUTAM N CHIPKAR • AI & DATA SCIENCE • ',
  modelUrl: '/card.glb',
};

export default function LanyardBadge({
  name = DEFAULTS.name,
  role = DEFAULTS.role,
  photoUrl = DEFAULTS.photoUrl,
  strapLabel = DEFAULTS.strapLabel,
  modelUrl = DEFAULTS.modelUrl,
  className,
  hasDropped = true,
  debug = false,
}: LanyardBadgeProps) {
  return (
    <div className={className ?? 'relative h-full w-full select-none'}>
      <Canvas
        camera={{ position: [0, 0, 13], fov: 24 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
        <directionalLight position={[-5, 4, 3]} intensity={0.8} color="#a78bfa" />
        <directionalLight position={[0, -5, 4]} intensity={0.6} color="#38bdf8" />

        <Physics gravity={[0, -28, 0]} interpolate timeStep={1 / 60} debug={debug}>
          <Band
            name={name}
            role={role}
            photoUrl={photoUrl}
            strapLabel={strapLabel}
            modelUrl={modelUrl}
            hasDropped={hasDropped}
          />
        </Physics>

        <Environment resolution={256}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <Lightformer intensity={2.5} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3.5} color="#c084fc" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3.5} color="#38bdf8" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, 0]} scale={[100, 10, 1]} />
          </group>
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  name: string;
  role: string;
  photoUrl?: string;
  strapLabel: string;
  modelUrl: string;
  hasDropped?: boolean;
  maxSpeed?: number;
  minSpeed?: number;
}

const dragPoint = new THREE.Vector3();
const dragOffset = new THREE.Vector3();
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const raycaster = new THREE.Raycaster();

function Band({
  name,
  role,
  photoUrl,
  strapLabel,
  modelUrl,
  hasDropped = true,
  maxSpeed = 50,
  minSpeed = 10,
}: BandProps) {
  const band = useRef<THREE.Mesh>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const { nodes, materials } = useGLTF(modelUrl) as unknown as {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
  };

  const { width, height } = useThree((s) => s.size);

  const [, forceUpdate] = useState(0);
  const cardTexture = useMemo(
    () => generateCardTexture({ name, role, photoUrl, idLabel: 'GNC-2026-AI' }, () => forceUpdate((n) => n + 1)),
    [name, role, photoUrl]
  );
  const cardBackTexture = useMemo(() => generateCardBackTexture(), []);
  const strapTexture = useMemo(() => generateStrapTexture(strapLabel), [strapLabel]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  curve.curveType = 'chordal';

  // Smooth Drag & Flip States
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAngle = useRef(0);
  const cardMeshRef = useRef<THREE.Group>(null!);

  const lastTapTime = useRef(0);
  const pointerDownPos = useRef({ x: 0, y: 0 });
  const isPointerDown = useRef(false);
  const lastDragPos = useRef(new THREE.Vector3());
  const dragVelocity = useRef(new THREE.Vector3());

  const needsDropImpulse = useRef(false);
  const hasTriggeredDrop = useRef(false);

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 3.5,
    linearDamping: 2.2,
    restitution: 0.05,
    friction: 0.75,
    ccd: true,
  };

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (hasDropped && !hasTriggeredDrop.current) {
      hasTriggeredDrop.current = true;
      needsDropImpulse.current = true;
    }
  }, [hasDropped]);

  useEffect(() => {
    document.body.style.cursor = hovered ? (isDragging ? 'grabbing' : 'grab') : '';
    return () => {
      document.body.style.cursor = '';
    };
  }, [hovered, isDragging]);

  useFrame((state, delta) => {
    // 1. Initial smooth drop impulse when scrolled into view
    if (needsDropImpulse.current && card.current) {
      needsDropImpulse.current = false;
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.applyImpulse({ x: 0.25, y: -0.6, z: 0 }, true);
    }

    // 2. Silky smooth 180° flip animation on card mesh
    const targetFlip = isFlipped ? Math.PI : 0;
    flipAngle.current = THREE.MathUtils.damp(flipAngle.current, targetFlip, 7.5, delta);
    if (cardMeshRef.current) {
      cardMeshRef.current.rotation.y = flipAngle.current;
    }

    // 3. Smooth kinematic drag tracking
    if (isDragging && card.current) {
      raycaster.setFromCamera(state.pointer, state.camera);
      if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
        const target = dragPoint.sub(dragOffset);
        
        if (delta > 0) {
          dragVelocity.current.set(
            (target.x - lastDragPos.current.x) / delta,
            (target.y - lastDragPos.current.y) / delta,
            0
          );
        }
        lastDragPos.current.copy(target);

        card.current.setNextKinematicTranslation({
          x: target.x,
          y: target.y,
          z: target.z,
        });
      }

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
    }

    // 4. Update rope chain & line points
    if (fixed.current && card.current && j1.current && j2.current && j3.current) {
      [j1, j2].forEach((ref) => {
        const body = ref.current as RapierRigidBody & { lerped?: THREE.Vector3 };
        if (!body.lerped) body.lerped = new THREE.Vector3().copy(body.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, body.lerped.distanceTo(body.translation())));
        body.lerped.lerp(body.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy((j2.current as any).lerped ?? j2.current.translation());
      curve.points[2].copy((j1.current as any).lerped ?? j1.current.translation());
      curve.points[3].copy(fixed.current.translation());

      if (band.current && (band.current.geometry as any).setPoints) {
        (band.current.geometry as any).setPoints(curve.getPoints(32));
      }

      // Smooth physics momentum damping
      if (!isDragging) {
        const angvel = card.current.angvel();
        card.current.setAngvel(
          {
            x: angvel.x * 0.96,
            y: angvel.y * 0.97,
            z: angvel.z * 0.96,
          },
          true
        );
      }
    }
  });

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
    if (card.current) {
      card.current.wakeUp();
    }
  };

  const handlePointerDown = (e: any) => {
    isPointerDown.current = true;
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
    (e.target as any).setPointerCapture?.(e.pointerId);
    dragOffset.copy(e.point).sub(card.current.translation() as any);
    lastDragPos.current.copy(card.current.translation() as any);
    dragVelocity.current.set(0, 0, 0);
  };

  const handlePointerMove = (e: any) => {
    if (!isPointerDown.current) return;
    const dist = Math.hypot(e.clientX - pointerDownPos.current.x, e.clientY - pointerDownPos.current.y);
    if (dist > 8 && !isDragging) {
      setIsDragging(true);
    }
  };

  const handlePointerUp = (e: any) => {
    isPointerDown.current = false;
    (e.target as any).releasePointerCapture?.(e.pointerId);

    if (isDragging) {
      setIsDragging(false);
      if (card.current) {
        const vx = Math.max(-15, Math.min(15, dragVelocity.current.x * 0.3));
        const vy = Math.max(-15, Math.min(15, dragVelocity.current.y * 0.3));
        card.current.setLinvel({ x: vx, y: vy, z: 0 }, true);
      }
    } else {
      const now = Date.now();
      if (now - lastTapTime.current < 380) {
        toggleFlip();
        lastTapTime.current = 0;
        return;
      }
      lastTapTime.current = now;
    }
  };

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.0, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2.0, 0, 0]}
          ref={card}
          {...segmentProps}
          type={isDragging ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              isPointerDown.current = false;
              setIsDragging(false);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              toggleFlip();
            }}
          >
            <group ref={cardMeshRef}>
              {nodes.card && (
                <mesh geometry={nodes.card.geometry}>
                  <meshPhysicalMaterial
                    color="#0e0d14"
                    roughness={0.35}
                    metalness={0.2}
                    clearcoat={0.6}
                    clearcoatRoughness={0.15}
                  />
                </mesh>
              )}

              <mesh position={[0, 0.523, 0.0055]}>
                <planeGeometry args={[0.716, 1.0]} />
                <meshPhysicalMaterial
                  map={cardTexture}
                  map-anisotropy={16}
                  roughness={0.15}
                  clearcoat={1}
                  clearcoatRoughness={0.08}
                  metalness={0.05}
                  envMapIntensity={1.4}
                />
              </mesh>

              <mesh position={[0, 0.523, -0.002]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[0.716, 1.0]} />
                <meshPhysicalMaterial
                  map={cardBackTexture}
                  map-anisotropy={16}
                  roughness={0.15}
                  clearcoat={1}
                  clearcoatRoughness={0.08}
                  metalness={0.05}
                  envMapIntensity={1.4}
                />
              </mesh>
            </group>

            {nodes.clip && (
              <mesh geometry={nodes.clip.geometry} material={materials.metal ?? undefined}>
                <meshPhysicalMaterial
                  color="#c9c9d1"
                  metalness={1}
                  roughness={0.25}
                  clearcoat={1}
                  clearcoatRoughness={0.1}
                />
              </mesh>
            )}

            {nodes.clamp && (
              <mesh geometry={nodes.clamp.geometry}>
                <meshPhysicalMaterial
                  color="#c9c9d1"
                  metalness={1}
                  roughness={0.3}
                  clearcoat={1}
                  clearcoatRoughness={0.1}
                />
              </mesh>
            )}
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={true}
          resolution={[width, height]}
          useMap={1}
          map={strapTexture}
          repeat={[-4, 1]}
          lineWidth={1.15}
          transparent
          opacity={0.96}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(DEFAULTS.modelUrl);

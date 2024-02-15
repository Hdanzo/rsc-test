"use client";

import { BakeShadows, MeshReflectorMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { easing } from "maath";

import { Computers, Instances } from "./computers";

export default function NotFound() {
  return (
    <div className="h-screen">
      <Canvas
        camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }}
        dpr={[1, 1.5]}
        eventPrefix="client"
        eventSource={document.getElementById("root")!}
        shadows
      >
        {/* Lights */}
        <color
          args={["black"]}
          attach="background"
        />
        <hemisphereLight
          groundColor="black"
          intensity={0.15}
        />
        <spotLight
          angle={0.12}
          castShadow
          intensity={1}
          penumbra={1}
          position={[10, 20, 10]}
          shadow-mapSize={1024}
        />
        {/* Main scene */}
        <group position={[-0, -1, 0]}>
          {/* Auto-instanced sketchfab model */}
          <Instances>
            <Computers scale={0.5} />
          </Instances>
          {/* Plane reflections + distance blur */}
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 30]}
              color="#202020"
              depthScale={1.2}
              maxDepthThreshold={1.4}
              metalness={0.8}
              minDepthThreshold={0.4}
              mirror={1}
              mixBlur={1}
              mixStrength={80}
              resolution={2048}
              roughness={1}
            />
          </mesh>
          <pointLight
            color="orange"
            distance={1.5}
            intensity={1}
            position={[-0.15, 0.7, 0]}
          />
        </group>
        {/* Postprocessing */}
        <EffectComposer disableNormalPass>
          <Bloom
            intensity={6}
            luminanceSmoothing={0.0}
            luminanceThreshold={0}
            mipmapBlur
          />
          <DepthOfField
            bokehScale={15}
            focalLength={0.3}
            height={700}
            target={[0, 0, 13]}
          />
        </EffectComposer>
        {/* Camera movements */}
        <CameraRig />
        {/* Small helper that freezes the shadows for better performance */}
        <BakeShadows />
      </Canvas>
    </div>
  );
}

function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        -1 + (state.pointer.x * state.viewport.width) / 3,
        (1 + state.pointer.y) / 2,
        5.5,
      ],
      0.5,
      delta
    );

    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

import { Suspense, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Car({ color }: {color:string}) {
  const { scene } = useGLTF('/models/ferrari.glb');
  const model = useMemo(() => scene.clone(true), [scene]);
  useEffect(() => {
    const body = model.getObjectByName('body') as THREE.Mesh;
    body.material = new THREE.MeshPhysicalMaterial({ color, metalness: .65, roughness: .24, clearcoat: 1, clearcoatRoughness: .12 });
    const glass = model.getObjectByName('glass') as THREE.Mesh;
    glass.material = new THREE.MeshPhysicalMaterial({ color: '#20252a', metalness: .2, roughness: .08, transparent: true, opacity: .72 });
    return () => { (body.material as THREE.Material).dispose(); (glass.material as THREE.Material).dispose(); };
  }, [color, model]);
  return <primitive object={model} />;
}
export default function CarStage({color, auto, reset}: {color:string;auto:boolean;reset:number}) {
  return <Canvas camera={{position:[4.2,1.65,-4.7],fov:32}} dpr={[1,1.8]} gl={{antialias:true,alpha:true}}>
    <ambientLight intensity={.55}/><directionalLight position={[3,6,-4]} intensity={2.8}/>
    <Suspense fallback={null}>
      <Car color={color}/>
      <Environment resolution={256}>
        <Lightformer intensity={4} position={[0,5,0]} rotation={[Math.PI/2,0,0]} scale={[10,4,1]}/>
        <Lightformer intensity={3} position={[4,2,0]} rotation={[0,-Math.PI/2,0]} scale={[10,2,1]}/>
        <Lightformer intensity={2} position={[-4,3,-2]} rotation={[0,Math.PI/2,0]} scale={[8,2,1]}/>
        <Lightformer color="#ff3030" intensity={1} position={[0,2,5]} scale={[8,1,1]}/>
      </Environment>
      <ContactShadows position={[0,-.015,0]} opacity={.8} scale={15} blur={2.5} far={4}/>
    </Suspense>
    <OrbitControls key={reset} target={[0,.65,0]} enablePan={false} enableZoom={true} minDistance={4.8} maxDistance={11} minPolarAngle={.65} maxPolarAngle={Math.PI/2-.04} autoRotate={auto} autoRotateSpeed={.6}/>
  </Canvas>;
}
useGLTF.preload('/models/ferrari.glb');

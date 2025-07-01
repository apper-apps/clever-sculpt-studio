import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Grid, Box, Sphere, Cylinder, Plane, Cone, Torus } from '@react-three/drei'
import { toast } from 'react-toastify'
import * as THREE from 'three'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
// Scene Objects Component
const SceneObjects = ({ objects, selectedObject, onSelectObject }) => {
  return (
    <>
      {objects.map((obj) => {
        const isSelected = selectedObject?.id === obj.id
        
        const ObjectComponent = () => {
          const meshRef = useRef()
          
          useFrame(() => {
            if (meshRef.current && isSelected) {
              // Add subtle selection animation
              meshRef.current.rotation.y += 0.005
            }
          })
          
          const handleClick = (e) => {
            e.stopPropagation()
            onSelectObject(obj)
          }
          
          const commonProps = {
            ref: meshRef,
            position: [obj.position.x, obj.position.y, obj.position.z],
            rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
            scale: [obj.scale.x, obj.scale.y, obj.scale.z],
            onClick: handleClick,
            visible: obj.visible
          }
          
          const material = (
            <meshStandardMaterial 
              color={obj.material.color}
              metalness={obj.material.metalness}
              roughness={obj.material.roughness}
              transparent={obj.material.opacity < 1}
              opacity={obj.material.opacity}
            />
          )
switch (obj.type) {
            case 'cube':
              return (
                <Box {...commonProps}>
                  {material}
                  {isSelected && (
                    <lineSegments>
                      <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
                      <lineBasicMaterial color="#00D4FF" linewidth={2} />
                    </lineSegments>
                  )}
                </Box>
              )
            case 'sphere':
              return (
                <Sphere {...commonProps}>
                  {material}
                  {isSelected && (
                    <lineSegments>
                      <wireframeGeometry args={[new THREE.SphereGeometry(1, 32, 32)]} />
                      <lineBasicMaterial color="#00D4FF" />
                    </lineSegments>
                  )}
                </Sphere>
              )
            case 'cylinder':
              return (
                <Cylinder {...commonProps}>
                  {material}
                  {isSelected && (
                    <lineSegments>
                      <edgesGeometry args={[new THREE.CylinderGeometry(1, 1, 2, 32)]} />
                      <lineBasicMaterial color="#00D4FF" />
                    </lineSegments>
                  )}
                </Cylinder>
              )
            case 'plane':
              return (
                <Plane {...commonProps}>
                  {material}
                  {isSelected && (
                    <lineSegments>
                      <edgesGeometry args={[new THREE.PlaneGeometry(2, 2)]} />
                      <lineBasicMaterial color="#00D4FF" />
                    </lineSegments>
                  )}
                </Plane>
              )
            case 'cone':
              return (
                <Cone {...commonProps}>
                  {material}
                  {isSelected && (
                    <lineSegments>
                      <edgesGeometry args={[new THREE.ConeGeometry(1, 2, 32)]} />
                      <lineBasicMaterial color="#00D4FF" />
                    </lineSegments>
                  )}
                </Cone>
              )
            case 'torus':
              return (
                <Torus {...commonProps}>
                  {material}
                  {isSelected && (
                    <lineSegments>
                      <edgesGeometry args={[new THREE.TorusGeometry(1, 0.3, 16, 100)]} />
                      <lineBasicMaterial color="#00D4FF" />
                    </lineSegments>
                  )}
                </Torus>
              )
            default:
              return null
          }
        }
        
        return <ObjectComponent key={obj.id} />
      })}
    </>
  )
}

// Lights Component
const SceneLights = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
    </>
  )
}

// Camera Controller Component
const CameraController = ({ viewMode }) => {
  const { camera } = useThree()
  
  useEffect(() => {
    if (viewMode === 'orthographic') {
      camera.position.set(10, 10, 10)
      camera.lookAt(0, 0, 0)
    } else {
      camera.position.set(5, 5, 5)
      camera.lookAt(0, 0, 0)
    }
  }, [viewMode, camera])
  
  return null
}

const Viewport3D = ({ 
  objects = [], 
  selectedObject, 
  onSelectObject,
  onAddObject,
  viewMode = 'perspective',
  className = ''
}) => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  const handleCanvasClick = (e) => {
    // Deselect object when clicking on empty space
    if (e.target === e.currentTarget) {
      onSelectObject(null)
    }
  }
const createPrimitiveObject = (type) => {
    const shapeDefaults = {
      cube: { name: 'Cube', scale: { x: 1, y: 1, z: 1 } },
      sphere: { name: 'Sphere', scale: { x: 1, y: 1, z: 1 } },
      cylinder: { name: 'Cylinder', scale: { x: 1, y: 1, z: 1 } },
      plane: { name: 'Plane', scale: { x: 2, y: 2, z: 1 } },
      cone: { name: 'Cone', scale: { x: 1, y: 1, z: 1 } },
      torus: { name: 'Torus', scale: { x: 1, y: 1, z: 1 } }
    }
    
    const defaults = shapeDefaults[type] || shapeDefaults.cube
    
    return {
      id: (objects.length + 1).toString(),
      name: defaults.name,
      type: type,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: defaults.scale,
      material: {
        id: 'default',
        color: '#808080',
        metalness: 0.0,
        roughness: 0.5,
        opacity: 1.0
      },
      visible: true,
      locked: false,
      layerId: 'default'
    }
  }

  const handleAddFirstObject = () => {
    const newObject = createPrimitiveObject('cube')
    
    if (onAddObject) {
      onAddObject(newObject)
      toast.success('Added cube to scene')
    }
  }
  
  if (isLoading) {
    return (
      <div className={`relative bg-background ${className}`}>
        <Loading variant="viewport" />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className={`relative bg-background ${className}`}>
        <Error 
          variant="viewport"
          message={error} 
          onRetry={() => {
            setError(null)
            setIsLoading(true)
          }}
        />
      </div>
    )
  }
  
  return (
    <div className={`relative bg-background ${className}`} onClick={handleCanvasClick}>
      <Canvas
        camera={{ 
          position: [5, 5, 5], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        shadows
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setSize(window.innerWidth, window.innerHeight)
          gl.setClearColor('#0F0F1E')
        }}
      >
        <Suspense fallback={null}>
          {/* Scene Setup */}
          <SceneLights />
          <CameraController viewMode={viewMode} />
          
          {/* Grid */}
          <Grid 
            args={[20, 20]} 
            position={[0, -0.01, 0]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#00D4FF"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#FF00E5"
            fadeDistance={20}
            fadeStrength={1}
            infiniteGrid
          />
          
          {/* Scene Objects */}
          <SceneObjects 
            objects={objects}
            selectedObject={selectedObject}
            onSelectObject={onSelectObject}
          />
          
          {/* Controls */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            zoomSpeed={0.5}
            panSpeed={0.5}
            maxPolarAngle={Math.PI / 2 + 0.1}
            minDistance={1}
            maxDistance={50}
          />
        </Suspense>
      </Canvas>
      
      {/* Empty State Overlay */}
      {objects.length === 0 && (
        <Empty 
          variant="scene"
          title="Welcome to Sculpt Studio"
          description="Start creating by adding your first 3D object to the scene. Use the tools on the left to begin sculpting your vision."
          actionLabel="Add First Object"
          onAction={handleAddFirstObject}
        />
      )}
      
      {/* Viewport Info */}
      <div className="absolute bottom-4 left-4 glass-panel px-3 py-2 rounded-lg">
        <div className="flex items-center space-x-4 text-xs font-mono text-white/60">
          <span>Objects: {objects.length}</span>
          <span>Mode: {viewMode}</span>
          <span>Vertices: {objects.length * 8}</span>
        </div>
      </div>
      
      {/* View Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="glass-panel p-2 rounded-lg">
          <div className="text-xs text-white/60 mb-2">View</div>
          <div className="space-y-1">
            <button className="w-full px-2 py-1 text-xs text-white/80 hover:text-primary transition-colors duration-200">
              Reset Camera
            </button>
            <button className="w-full px-2 py-1 text-xs text-white/80 hover:text-primary transition-colors duration-200">
              Focus Selected
            </button>
            <button className="w-full px-2 py-1 text-xs text-white/80 hover:text-primary transition-colors duration-200">
              Frame All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewport3D
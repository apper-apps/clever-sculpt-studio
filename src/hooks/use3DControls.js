import { useState, useCallback, useRef } from 'react'

export const use3DControls = () => {
  const [selectedTool, setSelectedTool] = useState('select')
  const [transformMode, setTransformMode] = useState('translate')
  const [snapToGrid, setSnapToGrid] = useState(true)
  const [gridSize, setGridSize] = useState(1)
  
  const controlsRef = useRef(null)
  const cameraRef = useRef(null)
  
  const tools = {
    select: 'select',
    move: 'translate',
    rotate: 'rotate',
    scale: 'scale'
  }
  
  const handleToolChange = useCallback((tool) => {
    setSelectedTool(tool)
    setTransformMode(tools[tool] || 'translate')
  }, [])
  
  const resetCamera = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }, [])
  
  const focusObject = useCallback((object) => {
    if (controlsRef.current && object) {
      const { position } = object
      controlsRef.current.setLookAt(
        position.x + 5, position.y + 5, position.z + 5,
        position.x, position.y, position.z,
        true
      )
    }
  }, [])
  
  const frameAll = useCallback((objects) => {
    if (controlsRef.current && objects.length > 0) {
      // Calculate bounding box of all objects
      const bounds = objects.reduce((acc, obj) => {
        const { position, scale } = obj
        return {
          minX: Math.min(acc.minX, position.x - scale.x),
          maxX: Math.max(acc.maxX, position.x + scale.x),
          minY: Math.min(acc.minY, position.y - scale.y),
          maxY: Math.max(acc.maxY, position.y + scale.y),
          minZ: Math.min(acc.minZ, position.z - scale.z),
          maxZ: Math.max(acc.maxZ, position.z + scale.z)
        }
      }, {
        minX: Infinity, maxX: -Infinity,
        minY: Infinity, maxY: -Infinity,
        minZ: Infinity, maxZ: -Infinity
      })
      
      const centerX = (bounds.minX + bounds.maxX) / 2
      const centerY = (bounds.minY + bounds.maxY) / 2
      const centerZ = (bounds.minZ + bounds.maxZ) / 2
      
      const sizeX = bounds.maxX - bounds.minX
      const sizeY = bounds.maxY - bounds.minY
      const sizeZ = bounds.maxZ - bounds.minZ
      const maxSize = Math.max(sizeX, sizeY, sizeZ)
      
      const distance = maxSize * 2
      
      controlsRef.current.setLookAt(
        centerX + distance, centerY + distance, centerZ + distance,
        centerX, centerY, centerZ,
        true
      )
    }
  }, [])
  
  const snapToGridValue = useCallback((value) => {
    if (!snapToGrid) return value
    return Math.round(value / gridSize) * gridSize
  }, [snapToGrid, gridSize])
  
  return {
    selectedTool,
    transformMode,
    snapToGrid,
    gridSize,
    controlsRef,
    cameraRef,
    setSelectedTool: handleToolChange,
    setTransformMode,
    setSnapToGrid,
    setGridSize,
    resetCamera,
    focusObject,
    frameAll,
    snapToGridValue
  }
}
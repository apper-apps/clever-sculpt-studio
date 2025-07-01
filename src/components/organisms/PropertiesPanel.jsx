import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import NumberInput from '@/components/molecules/NumberInput'
import ColorPicker from '@/components/molecules/ColorPicker'
import Slider from '@/components/atoms/Slider'
import Button from '@/components/atoms/Button'

const PropertiesPanel = ({ 
  selectedObject, 
  onUpdateObject,
  className = ''
}) => {
  const [localTransform, setLocalTransform] = useState({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 }
  })
  
  const [localMaterial, setLocalMaterial] = useState({
    color: '#808080',
    metalness: 0.0,
    roughness: 0.5,
    opacity: 1.0
  })
  
  // Update local state when selected object changes
  useEffect(() => {
    if (selectedObject) {
      setLocalTransform({
        position: { ...selectedObject.position },
        rotation: { ...selectedObject.rotation },
        scale: { ...selectedObject.scale }
      })
      setLocalMaterial({ ...selectedObject.material })
    }
  }, [selectedObject])
  
  const handleTransformChange = (property, axis, value) => {
    const newTransform = {
      ...localTransform,
      [property]: {
        ...localTransform[property],
        [axis]: value
      }
    }
    setLocalTransform(newTransform)
    
    if (selectedObject && onUpdateObject) {
      onUpdateObject(selectedObject.id, {
        ...selectedObject,
        [property]: newTransform[property]
      })
    }
  }
  
  const handleMaterialChange = (property, value) => {
    const newMaterial = {
      ...localMaterial,
      [property]: value
    }
    setLocalMaterial(newMaterial)
    
    if (selectedObject && onUpdateObject) {
      onUpdateObject(selectedObject.id, {
        ...selectedObject,
        material: newMaterial
      })
    }
  }
  
  const handleResetTransform = () => {
    const resetTransform = {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 }
    }
    setLocalTransform(resetTransform)
    
    if (selectedObject && onUpdateObject) {
      onUpdateObject(selectedObject.id, {
        ...selectedObject,
        ...resetTransform
      })
    }
  }
  
  if (!selectedObject) {
    return (
      <div className={`w-80 bg-surface/90 backdrop-blur-xl border-l border-white/10 p-6 ${className}`}>
        <div className="text-center text-white/60 mt-20">
          <ApperIcon name="MousePointer" size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="font-display font-semibold text-lg mb-2">No Selection</h3>
          <p className="text-sm">
            Select an object in the viewport to edit its properties
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <div className={`w-80 bg-surface/90 backdrop-blur-xl border-l border-white/10 overflow-y-auto ${className}`}>
      <div className="p-6 space-y-6">
        {/* Object Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg text-white">
              {selectedObject.name}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
                title="Toggle visibility"
              >
                <ApperIcon name={selectedObject.visible ? "Eye" : "EyeOff"} size={16} />
              </button>
              <button
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
                title="Lock object"
              >
                <ApperIcon name={selectedObject.locked ? "Lock" : "Unlock"} size={16} />
              </button>
            </div>
          </div>
          
          <div className="text-sm text-white/60 mb-4">
            Type: <span className="text-primary capitalize">{selectedObject.type}</span>
          </div>
        </motion.div>
        
        {/* Transform Properties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-white">Transform</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              icon="RotateCcw"
              onClick={handleResetTransform}
              className="text-xs"
            >
              Reset
            </Button>
          </div>
          
          {/* Position */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white/80">Position</h4>
            <div className="grid grid-cols-3 gap-2">
              {['x', 'y', 'z'].map((axis) => (
                <NumberInput
                  key={`pos-${axis}`}
                  label={axis.toUpperCase()}
                  value={localTransform.position[axis]}
                  onChange={(value) => handleTransformChange('position', axis, value)}
                  step={0.1}
                  precision={2}
                />
              ))}
            </div>
          </div>
          
          {/* Rotation */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white/80">Rotation</h4>
            <div className="grid grid-cols-3 gap-2">
              {['x', 'y', 'z'].map((axis) => (
                <NumberInput
                  key={`rot-${axis}`}
                  label={axis.toUpperCase()}
                  value={localTransform.rotation[axis]}
                  onChange={(value) => handleTransformChange('rotation', axis, value)}
                  step={0.1}
                  precision={2}
                  unit="°"
                />
              ))}
            </div>
          </div>
          
          {/* Scale */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white/80">Scale</h4>
            <div className="grid grid-cols-3 gap-2">
              {['x', 'y', 'z'].map((axis) => (
                <NumberInput
                  key={`scale-${axis}`}
                  label={axis.toUpperCase()}
                  value={localTransform.scale[axis]}
                  onChange={(value) => handleTransformChange('scale', axis, value)}
                  min={0.1}
                  step={0.1}
                  precision={2}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Material Properties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="font-display font-semibold text-white">Material</h3>
          
          <ColorPicker
            label="Color"
            value={localMaterial.color}
            onChange={(value) => handleMaterialChange('color', value)}
          />
          
          <Slider
            label="Metalness"
            value={localMaterial.metalness}
            onChange={(value) => handleMaterialChange('metalness', value)}
            min={0}
            max={1}
            step={0.01}
            showValue={true}
          />
          
          <Slider
            label="Roughness"
            value={localMaterial.roughness}
            onChange={(value) => handleMaterialChange('roughness', value)}
            min={0}
            max={1}
            step={0.01}
            showValue={true}
          />
          
          <Slider
            label="Opacity"
            value={localMaterial.opacity}
            onChange={(value) => handleMaterialChange('opacity', value)}
            min={0}
            max={1}
            step={0.01}
            showValue={true}
          />
        </motion.div>
        
        {/* Object Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="space-y-3 pt-4 border-t border-white/10"
        >
          <h3 className="font-display font-semibold text-white">Actions</h3>
          
          <div className="space-y-2">
            <Button variant="secondary" size="sm" icon="Copy" className="w-full justify-start">
              Duplicate
            </Button>
            <Button variant="secondary" size="sm" icon="Move" className="w-full justify-start">
              Move to Origin
            </Button>
            <Button variant="danger" size="sm" icon="Trash2" className="w-full justify-start">
              Delete Object
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PropertiesPanel
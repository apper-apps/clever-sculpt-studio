import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('tools')
  const [selectedTool, setSelectedTool] = useState('select')
  
  const tabs = [
    { id: 'tools', label: 'Tools', icon: 'Wrench' },
    { id: 'objects', label: 'Objects', icon: 'Package' },
    { id: 'materials', label: 'Materials', icon: 'Palette' }
  ]
  
  const tools = [
    { id: 'select', label: 'Select', icon: 'MousePointer', shortcut: 'V' },
    { id: 'move', label: 'Move', icon: 'Move', shortcut: 'G' },
    { id: 'rotate', label: 'Rotate', icon: 'RotateCw', shortcut: 'R' },
    { id: 'scale', label: 'Scale', icon: 'Maximize', shortcut: 'S' },
  ]
  
  const primitives = [
    { id: 'cube', label: 'Cube', icon: 'Square' },
    { id: 'sphere', label: 'Sphere', icon: 'Circle' },
    { id: 'cylinder', label: 'Cylinder', icon: 'Cylinder' },
    { id: 'plane', label: 'Plane', icon: 'RectangleHorizontal' },
    { id: 'cone', label: 'Cone', icon: 'Triangle' },
    { id: 'torus', label: 'Torus', icon: 'Donut' }
  ]
  
  const materials = [
    { id: 'default', label: 'Default', color: '#808080' },
    { id: 'metal', label: 'Metal', color: '#B8B8B8' },
    { id: 'plastic', label: 'Plastic', color: '#FF6B6B' },
    { id: 'glass', label: 'Glass', color: '#4ECDC4' },
    { id: 'wood', label: 'Wood', color: '#8B4513' },
    { id: 'rubber', label: 'Rubber', color: '#2C3E50' }
  ]
  
  const handleToolSelect = (toolId) => {
    setSelectedTool(toolId)
  }
  
  return (
    <div className="w-80 bg-surface/90 backdrop-blur-xl border-r border-white/10 flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary/5'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <ApperIcon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'tools' && (
          <div className="space-y-6">
            {/* Transform Tools */}
            <div>
              <h3 className="text-sm font-semibold text-white/80 mb-3 font-display">
                Transform Tools
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {tools.map((tool) => (
                  <motion.button
                    key={tool.id}
                    onClick={() => handleToolSelect(tool.id)}
                    className={`p-3 rounded-lg border transition-all duration-200 flex flex-col items-center space-y-2 ${
                      selectedTool === tool.id
                        ? 'bg-primary/10 border-primary text-primary shadow-md shadow-primary/20'
                        : 'bg-surface/50 border-white/10 text-white/70 hover:border-primary/50 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ApperIcon name={tool.icon} size={20} />
                    <span className="text-xs font-medium">{tool.label}</span>
                    <span className="text-xs text-white/40 font-mono">{tool.shortcut}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-semibold text-white/80 mb-3 font-display">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button variant="tool" size="sm" icon="RotateCcw" className="w-full justify-start">
                  Undo (Ctrl+Z)
                </Button>
                <Button variant="tool" size="sm" icon="RotateCw" className="w-full justify-start">
                  Redo (Ctrl+Y)
                </Button>
                <Button variant="tool" size="sm" icon="Copy" className="w-full justify-start">
                  Duplicate (Ctrl+D)
                </Button>
                <Button variant="tool" size="sm" icon="Trash2" className="w-full justify-start">
                  Delete (Del)
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'objects' && (
          <div className="space-y-6">
            {/* Add Primitives */}
            <div>
              <h3 className="text-sm font-semibold text-white/80 mb-3 font-display">
                Add Primitives
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {primitives.map((primitive) => (
                  <Button
                    key={primitive.id}
                    variant="tool"
                    size="sm"
                    icon={primitive.icon}
                    className="flex-col h-16 text-xs"
                  >
                    {primitive.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Scene Hierarchy */}
            <div>
              <h3 className="text-sm font-semibold text-white/80 mb-3 font-display">
                Scene Hierarchy
              </h3>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 p-2 rounded bg-surface/30 text-white/60">
                  <ApperIcon name="Folder" size={16} />
                  <span className="text-sm">Scene</span>
                </div>
                <div className="ml-4 text-sm text-white/40 italic">
                  No objects in scene
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'materials' && (
          <div className="space-y-6">
            {/* Material Library */}
            <div>
              <h3 className="text-sm font-semibold text-white/80 mb-3 font-display">
                Material Library
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {materials.map((material) => (
                  <button
                    key={material.id}
                    className="p-3 rounded-lg border border-white/10 bg-surface/50 hover:border-primary/50 transition-all duration-200 flex flex-col items-center space-y-2"
                  >
                    <div 
                      className="w-8 h-8 rounded border border-white/20"
                      style={{ backgroundColor: material.color }}
                    />
                    <span className="text-xs font-medium text-white/80">{material.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Create Material */}
            <div>
              <Button variant="primary" size="sm" icon="Plus" className="w-full">
                Create New Material
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
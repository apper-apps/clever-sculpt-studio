import { useState } from 'react'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const TopToolbar = () => {
  const [viewMode, setViewMode] = useState('perspective')
  
  const handleNewScene = () => {
    toast.info("New scene created")
  }
  
  const handleSave = () => {
    toast.success("Scene saved successfully")
  }
  
  const handleExport = () => {
    toast.info("Exporting OBJ file...")
    // Simulate export delay
    setTimeout(() => {
      toast.success("Model exported as model.obj")
    }, 2000)
  }
  
  const viewModes = [
    { id: 'perspective', label: 'Perspective', icon: 'Eye' },
    { id: 'orthographic', label: 'Orthographic', icon: 'Square' },
    { id: 'wireframe', label: 'Wireframe', icon: 'Grid3X3' }
  ]
  
  return (
    <header className="h-14 bg-surface/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4">
      {/* Left Section - File Operations */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 mr-4">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <ApperIcon name="Cube" size={18} className="text-background" />
          </div>
          <span className="font-display font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sculpt Studio
          </span>
        </div>
        
        <Button variant="ghost" size="sm" icon="File" onClick={handleNewScene}>
          New
        </Button>
        <Button variant="ghost" size="sm" icon="Save" onClick={handleSave}>
          Save
        </Button>
        <Button variant="ghost" size="sm" icon="Download" onClick={handleExport}>
          Export
        </Button>
      </div>
      
      {/* Center Section - View Controls */}
      <div className="flex items-center space-x-1 bg-background/50 rounded-lg p-1">
        {viewModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setViewMode(mode.id)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              viewMode === mode.id
                ? 'bg-primary text-background shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <ApperIcon name={mode.icon} size={16} />
            <span>{mode.label}</span>
          </button>
        ))}
      </div>
      
      {/* Right Section - Scene Info */}
      <div className="flex items-center space-x-4">
        <div className="text-sm text-white/60">
          <span className="font-mono">Objects: 0</span>
        </div>
        <div className="text-sm text-white/60">
          <span className="font-mono">Vertices: 0</span>
        </div>
        <div className="w-2 h-2 bg-success rounded-full animate-pulse" title="Real-time sync active" />
      </div>
    </header>
  )
}

export default TopToolbar
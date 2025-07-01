import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import Viewport3D from '@/components/organisms/Viewport3D'
import PropertiesPanel from '@/components/organisms/PropertiesPanel'

const DesignStudio = () => {
  const [objects, setObjects] = useState([])
  const [selectedObject, setSelectedObject] = useState(null)
  const [viewMode, setViewMode] = useState('perspective')
// Add new object to scene
  const handleAddObject = useCallback((newObject) => {
    const objectWithId = {
      ...newObject,
      id: objects.length > 0 ? Math.max(...objects.map(obj => parseInt(obj.id))) + 1 : 1
    }
    setObjects(prev => [...prev, objectWithId])
    setSelectedObject(objectWithId)
  }, [objects])
  // Update existing object
  const handleUpdateObject = useCallback((objectId, updatedObject) => {
    setObjects(prev => 
      prev.map(obj => obj.id === objectId ? updatedObject : obj)
    )
    setSelectedObject(updatedObject)
  }, [])
  
  // Select object
  const handleSelectObject = useCallback((object) => {
    setSelectedObject(object)
  }, [])
  
  // Delete object
  const handleDeleteObject = useCallback((objectId) => {
    setObjects(prev => prev.filter(obj => obj.id !== objectId))
    if (selectedObject?.id === objectId) {
      setSelectedObject(null)
    }
    toast.info('Object deleted')
  }, [selectedObject])
  
  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e) => {
    if (e.target.tagName === 'INPUT') return
    
    switch (e.key.toLowerCase()) {
      case 'delete':
      case 'backspace':
        if (selectedObject) {
          handleDeleteObject(selectedObject.id)
        }
        break
      case 'escape':
        setSelectedObject(null)
        break
      case 'd':
if (e.ctrlKey && selectedObject) {
          e.preventDefault()
          const duplicatedObject = {
            ...selectedObject,
            id: (objects.length > 0 ? Math.max(...objects.map(obj => parseInt(obj.id))) + 1 : 1).toString(),
            name: `${selectedObject.name} Copy`,
            position: {
              x: selectedObject.position.x + 2,
              y: selectedObject.position.y,
              z: selectedObject.position.z
            }
          }
          handleAddObject(duplicatedObject)
          toast.success('Object duplicated')
        }
        break
    }
  }, [selectedObject, handleDeleteObject, handleAddObject])
  
  // Listen for keyboard events
  useState(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
  
  return (
    <div className="h-full flex">
      {/* Main 3D Viewport */}
      <div className="flex-1 relative">
        <Viewport3D
          objects={objects}
          selectedObject={selectedObject}
          onSelectObject={handleSelectObject}
          onAddObject={handleAddObject}
          viewMode={viewMode}
          className="w-full h-full"
        />
      </div>
      
      {/* Properties Panel */}
      <PropertiesPanel
        selectedObject={selectedObject}
        onUpdateObject={handleUpdateObject}
        className="h-full"
      />
    </div>
  )
}

export default DesignStudio
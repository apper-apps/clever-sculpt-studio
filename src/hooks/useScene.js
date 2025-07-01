import { useState, useEffect, useCallback } from 'react'
import sceneService from '@/services/api/sceneService'

export const useScene = (sceneId = null) => {
  const [scene, setScene] = useState(null)
  const [scenes, setScenes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadScenes = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await sceneService.getAll()
      setScenes(data)
    } catch (err) {
      setError(err.message || 'Failed to load scenes')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadScene = useCallback(async (id) => {
    setLoading(true)
    setError('')
    try {
      const data = await sceneService.getById(id)
      setScene(data)
    } catch (err) {
      setError(err.message || 'Failed to load scene')
    } finally {
      setLoading(false)
    }
  }, [])

  const createScene = useCallback(async (sceneData) => {
    setLoading(true)
    setError('')
    try {
      const newScene = await sceneService.create(sceneData)
      setScenes(prev => [...prev, newScene])
      return newScene
    } catch (err) {
      setError(err.message || 'Failed to create scene')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateScene = useCallback(async (id, sceneData) => {
    setLoading(true)
    setError('')
    try {
      const updatedScene = await sceneService.update(id, sceneData)
      setScenes(prev => prev.map(s => s.Id === id ? updatedScene : s))
      if (scene?.Id === id) {
        setScene(updatedScene)
      }
      return updatedScene
    } catch (err) {
      setError(err.message || 'Failed to update scene')
      throw err
    } finally {
      setLoading(false)
    }
  }, [scene])

  const deleteScene = useCallback(async (id) => {
    setLoading(true)
    setError('')
    try {
      await sceneService.delete(id)
      setScenes(prev => prev.filter(s => s.Id !== id))
      if (scene?.Id === id) {
        setScene(null)
      }
    } catch (err) {
      setError(err.message || 'Failed to delete scene')
      throw err
    } finally {
      setLoading(false)
    }
  }, [scene])

  const exportScene = useCallback(async (id, format = 'obj') => {
    setLoading(true)
    setError('')
    try {
      const exportData = await sceneService.exportScene(id, format)
      return exportData
    } catch (err) {
      setError(err.message || 'Failed to export scene')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (sceneId) {
      loadScene(sceneId)
    } else {
      loadScenes()
    }
  }, [sceneId, loadScene, loadScenes])

  return {
    scene,
    scenes,
    loading,
    error,
    loadScenes,
    loadScene,
    createScene,
    updateScene,
    deleteScene,
    exportScene
  }
}
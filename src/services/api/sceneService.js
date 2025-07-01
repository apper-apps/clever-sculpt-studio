import mockScenes from '@/services/mockData/scenes.json'

class SceneService {
  constructor() {
    this.scenes = [...mockScenes]
  }

  // Simulate network delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay()
    return [...this.scenes]
  }

  async getById(id) {
    await this.delay()
    const scene = this.scenes.find(scene => scene.Id === parseInt(id))
    if (!scene) {
      throw new Error(`Scene with Id ${id} not found`)
    }
    return { ...scene }
  }

  async create(sceneData) {
    await this.delay()
    const newScene = {
      ...sceneData,
      Id: Math.max(...this.scenes.map(s => s.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.scenes.push(newScene)
    return { ...newScene }
  }

  async update(id, sceneData) {
    await this.delay()
    const index = this.scenes.findIndex(scene => scene.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Scene with Id ${id} not found`)
    }
    
    const updatedScene = {
      ...this.scenes[index],
      ...sceneData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    }
    this.scenes[index] = updatedScene
    return { ...updatedScene }
  }

  async delete(id) {
    await this.delay()
    const index = this.scenes.findIndex(scene => scene.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Scene with Id ${id} not found`)
    }
    
    const deletedScene = this.scenes.splice(index, 1)[0]
    return { ...deletedScene }
  }

  async exportScene(id, format = 'obj') {
    await this.delay(1000) // Longer delay for export
    const scene = await this.getById(id)
    
    // Simulate export process
    const exportData = {
      format,
      filename: `${scene.name.toLowerCase().replace(/\s+/g, '_')}.${format}`,
      data: `# Exported from Sculpt Studio\n# Scene: ${scene.name}\n# Objects: ${scene.objects.length}\n`,
      size: Math.random() * 1000 + 500 // KB
    }
    
    return exportData
  }
}

export default new SceneService()
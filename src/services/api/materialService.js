import mockMaterials from '@/services/mockData/materials.json'

class MaterialService {
  constructor() {
    this.materials = [...mockMaterials]
  }

  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay()
    return [...this.materials]
  }

  async getById(id) {
    await this.delay()
    const material = this.materials.find(mat => mat.Id === parseInt(id))
    if (!material) {
      throw new Error(`Material with Id ${id} not found`)
    }
    return { ...material }
  }

  async create(materialData) {
    await this.delay()
    const newMaterial = {
      ...materialData,
      Id: Math.max(...this.materials.map(m => m.Id), 0) + 1,
      createdAt: new Date().toISOString()
    }
    this.materials.push(newMaterial)
    return { ...newMaterial }
  }

  async update(id, materialData) {
    await this.delay()
    const index = this.materials.findIndex(mat => mat.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Material with Id ${id} not found`)
    }
    
    const updatedMaterial = {
      ...this.materials[index],
      ...materialData,
      Id: parseInt(id)
    }
    this.materials[index] = updatedMaterial
    return { ...updatedMaterial }
  }

  async delete(id) {
    await this.delay()
    const index = this.materials.findIndex(mat => mat.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Material with Id ${id} not found`)
    }
    
    const deletedMaterial = this.materials.splice(index, 1)[0]
    return { ...deletedMaterial }
  }
}

export default new MaterialService()
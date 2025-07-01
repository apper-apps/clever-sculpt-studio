import mockObjects from '@/services/mockData/objects.json'

class ObjectService {
  constructor() {
    this.objects = [...mockObjects]
  }

  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay()
    return [...this.objects]
  }

  async getById(id) {
    await this.delay()
    const object = this.objects.find(obj => obj.Id === parseInt(id))
    if (!object) {
      throw new Error(`Object with Id ${id} not found`)
    }
    return { ...object }
  }

  async create(objectData) {
    await this.delay()
    const newObject = {
      ...objectData,
      Id: Math.max(...this.objects.map(o => o.Id), 0) + 1,
      createdAt: new Date().toISOString()
    }
    this.objects.push(newObject)
    return { ...newObject }
  }

  async update(id, objectData) {
    await this.delay()
    const index = this.objects.findIndex(obj => obj.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Object with Id ${id} not found`)
    }
    
    const updatedObject = {
      ...this.objects[index],
      ...objectData,
      Id: parseInt(id)
    }
    this.objects[index] = updatedObject
    return { ...updatedObject }
  }

  async delete(id) {
    await this.delay()
    const index = this.objects.findIndex(obj => obj.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Object with Id ${id} not found`)
    }
    
    const deletedObject = this.objects.splice(index, 1)[0]
    return { ...deletedObject }
  }

  async duplicate(id) {
    await this.delay()
    const original = await this.getById(id)
    const duplicated = {
      ...original,
      Id: Math.max(...this.objects.map(o => o.Id), 0) + 1,
      name: `${original.name} Copy`,
      position: {
        ...original.position,
        x: original.position.x + 2
      }
    }
    this.objects.push(duplicated)
    return { ...duplicated }
  }
}

export default new ObjectService()
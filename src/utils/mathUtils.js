export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}

export const lerp = (start, end, t) => {
  return start + (end - start) * t
}

export const degToRad = (degrees) => {
  return degrees * (Math.PI / 180)
}

export const radToDeg = (radians) => {
  return radians * (180 / Math.PI)
}

export const roundToPlaces = (value, places = 2) => {
  const factor = Math.pow(10, places)
  return Math.round(value * factor) / factor
}

export const snapToGrid = (value, gridSize = 1) => {
  return Math.round(value / gridSize) * gridSize
}

export const distance3D = (point1, point2) => {
  const dx = point2.x - point1.x
  const dy = point2.y - point1.y
  const dz = point2.z - point1.z
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

export const normalize3D = (vector) => {
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z)
  if (length === 0) return { x: 0, y: 0, z: 0 }
  return {
    x: vector.x / length,
    y: vector.y / length,
    z: vector.z / length
  }
}

export const cross3D = (a, b) => {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  }
}

export const dot3D = (a, b) => {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

export const add3D = (a, b) => {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z
  }
}

export const subtract3D = (a, b) => {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z
  }
}

export const multiply3D = (vector, scalar) => {
  return {
    x: vector.x * scalar,
    y: vector.y * scalar,
    z: vector.z * scalar
  }
}

export const getBoundingBox = (objects) => {
  if (objects.length === 0) {
    return {
      min: { x: 0, y: 0, z: 0 },
      max: { x: 0, y: 0, z: 0 },
      center: { x: 0, y: 0, z: 0 },
      size: { x: 0, y: 0, z: 0 }
    }
  }
  
  const bounds = objects.reduce((acc, obj) => {
    const { position, scale } = obj
    return {
      minX: Math.min(acc.minX, position.x - scale.x / 2),
      maxX: Math.max(acc.maxX, position.x + scale.x / 2),
      minY: Math.min(acc.minY, position.y - scale.y / 2),
      maxY: Math.max(acc.maxY, position.y + scale.y / 2),
      minZ: Math.min(acc.minZ, position.z - scale.z / 2),
      maxZ: Math.max(acc.maxZ, position.z + scale.z / 2)
    }
  }, {
    minX: Infinity, maxX: -Infinity,
    minY: Infinity, maxY: -Infinity,
    minZ: Infinity, maxZ: -Infinity
  })
  
  const min = { x: bounds.minX, y: bounds.minY, z: bounds.minZ }
  const max = { x: bounds.maxX, y: bounds.maxY, z: bounds.maxZ }
  const center = {
    x: (min.x + max.x) / 2,
    y: (min.y + max.y) / 2,
    z: (min.z + max.z) / 2
  }
  const size = {
    x: max.x - min.x,
    y: max.y - min.y,
    z: max.z - min.z
  }
  
  return { min, max, center, size }
}
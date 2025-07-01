export const exportToOBJ = (objects) => {
  let objContent = '# Exported from Sculpt Studio\n'
  objContent += '# Generated on ' + new Date().toISOString() + '\n\n'
  
  let vertexOffset = 1
  
  objects.forEach((object, index) => {
    objContent += `# Object ${index + 1}: ${object.name}\n`
    objContent += `o ${object.name.replace(/\s+/g, '_')}\n`
    
    // Generate vertices based on object type
    const vertices = generateVertices(object)
    const faces = generateFaces(object, vertexOffset)
    
    // Add vertices
    vertices.forEach(vertex => {
      objContent += `v ${vertex.x.toFixed(6)} ${vertex.y.toFixed(6)} ${vertex.z.toFixed(6)}\n`
    })
    
    // Add faces
    faces.forEach(face => {
      objContent += `f ${face.join(' ')}\n`
    })
    
    vertexOffset += vertices.length
    objContent += '\n'
  })
  
  return objContent
}

const generateVertices = (object) => {
  const { position, rotation, scale, type } = object
  let vertices = []
  
  switch (type) {
    case 'cube':
      vertices = [
        // Front face
        { x: -0.5, y: -0.5, z: 0.5 },
        { x: 0.5, y: -0.5, z: 0.5 },
        { x: 0.5, y: 0.5, z: 0.5 },
        { x: -0.5, y: 0.5, z: 0.5 },
        // Back face
        { x: -0.5, y: -0.5, z: -0.5 },
        { x: 0.5, y: -0.5, z: -0.5 },
        { x: 0.5, y: 0.5, z: -0.5 },
        { x: -0.5, y: 0.5, z: -0.5 }
      ]
      break
    case 'sphere':
      vertices = generateSphereVertices()
      break
    case 'cylinder':
      vertices = generateCylinderVertices()
      break
    default:
      vertices = []
  }
  
  // Apply transformations
  return vertices.map(vertex => {
    // Apply scale
    const scaled = {
      x: vertex.x * scale.x,
      y: vertex.y * scale.y,
      z: vertex.z * scale.z
    }
    
    // Apply rotation (simplified)
    const rotated = applyRotation(scaled, rotation)
    
    // Apply position
    return {
      x: rotated.x + position.x,
      y: rotated.y + position.y,
      z: rotated.z + position.z
    }
  })
}

const generateFaces = (object, offset) => {
  switch (object.type) {
    case 'cube':
      return [
        // Front face
        [offset, offset + 1, offset + 2, offset + 3],
        // Back face
        [offset + 4, offset + 7, offset + 6, offset + 5],
        // Left face
        [offset + 4, offset, offset + 3, offset + 7],
        // Right face
        [offset + 1, offset + 5, offset + 6, offset + 2],
        // Top face
        [offset + 3, offset + 2, offset + 6, offset + 7],
        // Bottom face
        [offset + 4, offset + 5, offset + 1, offset]
      ]
    default:
      return []
  }
}

const generateSphereVertices = (segments = 16) => {
  const vertices = []
  for (let i = 0; i <= segments; i++) {
    const theta = (i * Math.PI) / segments
    for (let j = 0; j <= segments; j++) {
      const phi = (j * 2 * Math.PI) / segments
      const x = Math.sin(theta) * Math.cos(phi) * 0.5
      const y = Math.cos(theta) * 0.5
      const z = Math.sin(theta) * Math.sin(phi) * 0.5
      vertices.push({ x, y, z })
    }
  }
  return vertices
}

const generateCylinderVertices = (segments = 16) => {
  const vertices = []
  for (let i = 0; i <= segments; i++) {
    const angle = (i * 2 * Math.PI) / segments
    const x = Math.cos(angle) * 0.5
    const z = Math.sin(angle) * 0.5
    // Top circle
    vertices.push({ x, y: 0.5, z })
    // Bottom circle
    vertices.push({ x, y: -0.5, z })
  }
  return vertices
}

const applyRotation = (vertex, rotation) => {
  // Simplified rotation - would need proper matrix math for full implementation
  return vertex
}

export const downloadFile = (content, filename, mimeType = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  URL.revokeObjectURL(url)
  document.body.removeChild(link)
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
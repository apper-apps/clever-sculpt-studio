import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const ColorPicker = ({ 
  value = '#ffffff', 
  onChange, 
  label,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(100)
  const [lightness, setLightness] = useState(50)
  const pickerRef = useRef(null)
  
  // Predefined colors
  const presetColors = [
    '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80',
    '#00FFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF', '#FF0080',
    '#FFFFFF', '#C0C0C0', '#808080', '#404040', '#000000', '#8B4513'
  ]
  
  useEffect(() => {
    // Convert hex to HSL on mount
    const hexToHsl = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255
      const g = parseInt(hex.slice(3, 5), 16) / 255
      const b = parseInt(hex.slice(5, 7), 16) / 255
      
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h, s, l = (max + min) / 2
      
      if (max === min) {
        h = s = 0
      } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break
          case g: h = (b - r) / d + 2; break
          case b: h = (r - g) / d + 4; break
        }
        h /= 6
      }
      
      return [h * 360, s * 100, l * 100]
    }
    
    const [h, s, l] = hexToHsl(value)
    setHue(h)
    setSaturation(s)
    setLightness(l)
  }, [value])
  
  const hslToHex = (h, s, l) => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = n => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }
  
  const handleColorChange = (newHue, newSat, newLight) => {
    const hex = hslToHex(newHue, newSat, newLight)
    if (onChange) onChange(hex)
  }
  
  const handlePresetClick = (color) => {
    if (onChange) onChange(color)
    setIsOpen(false)
  }
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-white/80 font-body mb-2">
          {label}
        </label>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 w-full p-3 bg-surface/50 border border-white/20 rounded-lg hover:border-primary/50 transition-all duration-200"
      >
        <div 
          className="w-6 h-6 rounded border border-white/20"
          style={{ backgroundColor: value }}
        />
        <span className="text-white font-mono text-sm flex-1 text-left">
          {value.toUpperCase()}
        </span>
        <ApperIcon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-white/60"
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={pickerRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 glass-panel rounded-lg shadow-xl z-50"
          >
            {/* Preset Colors */}
            <div className="grid grid-cols-6 gap-2 mb-4">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handlePresetClick(color)}
                  className="w-8 h-8 rounded border-2 border-white/20 hover:border-primary transition-colors duration-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            {/* Hue Slider */}
            <div className="space-y-2 mb-3">
              <label className="text-xs text-white/60">Hue</label>
              <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={(e) => {
                  const newHue = parseFloat(e.target.value)
                  setHue(newHue)
                  handleColorChange(newHue, saturation, lightness)
                }}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))'
                }}
              />
            </div>
            
            {/* Saturation Slider */}
            <div className="space-y-2 mb-3">
              <label className="text-xs text-white/60">Saturation</label>
              <input
                type="range"
                min="0"
                max="100"
                value={saturation}
                onChange={(e) => {
                  const newSat = parseFloat(e.target.value)
                  setSaturation(newSat)
                  handleColorChange(hue, newSat, lightness)
                }}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, hsl(${hue},0%,${lightness}%), hsl(${hue},100%,${lightness}%))`
                }}
              />
            </div>
            
            {/* Lightness Slider */}
            <div className="space-y-2">
              <label className="text-xs text-white/60">Lightness</label>
              <input
                type="range"
                min="0"
                max="100"
                value={lightness}
                onChange={(e) => {
                  const newLight = parseFloat(e.target.value)
                  setLightness(newLight)
                  handleColorChange(hue, saturation, newLight)
                }}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, hsl(${hue},${saturation}%,0%), hsl(${hue},${saturation}%,50%), hsl(${hue},${saturation}%,100%))`
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ColorPicker
import { useState, useRef, useEffect } from 'react'

const Slider = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1, 
  label,
  showValue = true,
  className = '',
  ...props 
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef(null)
  
  const percentage = ((value - min) / (max - min)) * 100
  
  const handleMouseDown = (e) => {
    setIsDragging(true)
    updateValue(e)
  }
  
  const handleMouseMove = (e) => {
    if (isDragging) {
      updateValue(e)
    }
  }
  
  const handleMouseUp = () => {
    setIsDragging(false)
  }
  
  const updateValue = (e) => {
    if (!sliderRef.current) return
    
    const rect = sliderRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const percentage = x / rect.width
    const newValue = min + (max - min) * percentage
    const steppedValue = Math.round(newValue / step) * step
    const clampedValue = Math.max(min, Math.min(max, steppedValue))
    
    if (onChange) {
      onChange(clampedValue)
    }
  }
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])
  
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-white/80 font-body">
            {label}
          </label>
          {showValue && (
            <span className="text-xs text-white/60 font-mono">
              {typeof value === 'number' ? value.toFixed(2) : value}
            </span>
          )}
        </div>
      )}
      
      <div 
        ref={sliderRef}
        className="relative h-2 bg-surface rounded-full cursor-pointer select-none"
        onMouseDown={handleMouseDown}
        {...props}
      >
        {/* Track */}
        <div className="absolute inset-0 bg-white/10 rounded-full" />
        
        {/* Progress */}
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Thumb */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-primary transition-all duration-150 ${
            isDragging ? 'scale-125 shadow-primary/50' : 'hover:scale-110'
          }`}
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  )
}

export default Slider
import { useState, useEffect } from 'react'
import ApperIcon from '@/components/ApperIcon'

const NumberInput = ({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step = 0.1, 
  precision = 2,
  unit = '',
  className = ''
}) => {
  const [inputValue, setInputValue] = useState(value?.toString() || '0')
  const [isFocused, setIsFocused] = useState(false)
  
  useEffect(() => {
    if (!isFocused && value !== undefined) {
      setInputValue(Number(value).toFixed(precision))
    }
  }, [value, precision, isFocused])
  
  const handleInputChange = (e) => {
    const newValue = e.target.value
    setInputValue(newValue)
    
    const numericValue = parseFloat(newValue)
    if (!isNaN(numericValue)) {
      let clampedValue = numericValue
      if (min !== undefined) clampedValue = Math.max(min, clampedValue)
      if (max !== undefined) clampedValue = Math.min(max, clampedValue)
      
      if (onChange) {
        onChange(clampedValue)
      }
    }
  }
  
  const handleBlur = () => {
    setIsFocused(false)
    const numericValue = parseFloat(inputValue)
    if (!isNaN(numericValue)) {
      let clampedValue = numericValue
      if (min !== undefined) clampedValue = Math.max(min, clampedValue)
      if (max !== undefined) clampedValue = Math.min(max, clampedValue)
      
      setInputValue(clampedValue.toFixed(precision))
      if (onChange) {
        onChange(clampedValue)
      }
    } else {
      setInputValue('0')
      if (onChange) {
        onChange(0)
      }
    }
  }
  
  const increment = () => {
    const current = parseFloat(inputValue) || 0
    const newValue = current + step
    const clampedValue = max !== undefined ? Math.min(max, newValue) : newValue
    
    setInputValue(clampedValue.toFixed(precision))
    if (onChange) {
      onChange(clampedValue)
    }
  }
  
  const decrement = () => {
    const current = parseFloat(inputValue) || 0
    const newValue = current - step
    const clampedValue = min !== undefined ? Math.max(min, newValue) : newValue
    
    setInputValue(clampedValue.toFixed(precision))
    if (onChange) {
      onChange(clampedValue)
    }
  }
  
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-white/80 font-body mb-2">
          {label}
        </label>
      )}
      
      <div className="relative flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          className="w-full px-3 py-2 pr-16 bg-surface/50 border border-white/20 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-200"
        />
        
        <div className="absolute right-1 flex items-center space-x-1">
          <button
            type="button"
            onClick={decrement}
            className="p-1 text-white/60 hover:text-primary hover:bg-primary/10 rounded transition-all duration-200"
          >
            <ApperIcon name="Minus" size={12} />
          </button>
          <div className="w-px h-4 bg-white/20" />
          <button
            type="button"
            onClick={increment}
            className="p-1 text-white/60 hover:text-primary hover:bg-primary/10 rounded transition-all duration-200"
          >
            <ApperIcon name="Plus" size={12} />
          </button>
        </div>
        
        {unit && (
          <span className="absolute right-12 text-white/40 font-mono text-xs pointer-events-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}

export default NumberInput
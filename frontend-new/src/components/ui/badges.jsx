import { useState } from "react"
import { MdClose } from "react-icons/md"

// Base Badge Component
export function Badge({ 
  children, 
  variant = "default", 
  size = "default",
  className = "",
  ...props 
}) {
  const variantClass = `badge-${variant}`
  const sizeClass = size === "default" ? "badge-default-size" : `badge-${size}`
  
  return (
    <span
      className={`badge ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

// Selectable Badge Component
export function SelectableBadge({ 
  children, 
  icon: IconComponent, 
  isSelected = false, 
  onToggle, 
  variant = "outline",
  selectedVariant = "success",
  size = "default",
  disabled = false,
  showCloseIcon = true,
  className = "",
  ...props 
}) {
  const currentVariant = isSelected ? selectedVariant : variant
  const iconSizeClass = size === "sm" ? "badge-icon-sm" : 
                       size === "lg" ? "badge-icon-lg" : "badge-icon-default"
  const closeIconSizeClass = size === "sm" ? "badge-close-icon-sm" : 
                            size === "lg" ? "badge-close-icon-lg" : "badge-close-icon-default"

  const handleClick = () => {
    if (!disabled && onToggle) {
      onToggle()
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`badge-button ${className}`}
      {...props}
    >
      <Badge 
        variant={currentVariant} 
        size={size}
      >
        {IconComponent && <IconComponent className={iconSizeClass} />}
        <span>{children}</span>
        {isSelected && showCloseIcon && (
          <MdClose 
            className={`badge-close-icon ${closeIconSizeClass}`}
          />
        )}
      </Badge>
    </button>
  )
}

// Badge Group Component
export function BadgeGroup({ 
  children, 
  spacing = 'normal',
  direction = 'row',
  wrap = true,
  className = "",
  ...props 
}) {
  const spacingClass = `badge-group-${spacing}`
  const directionClass = direction === 'column' ? 'badge-group-column' : ''
  const wrapClass = wrap ? 'badge-group-wrap' : 'badge-group-nowrap'
  
  return (
    <div 
      className={`badge-group ${spacingClass} ${directionClass} ${wrapClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

// Multi-Select Badge Group Component
export function MultiSelectBadgeGroup({
  options = [],
  selectedValues = [],
  onSelectionChange,
  variant = "outline",
  selectedVariant = "success",
  size = "default",
  maxSelections = null,
  allowEmpty = true,
  spacing = 'normal',
  className = "",
  ...props
}) {
  const handleToggle = (value) => {
    if (!onSelectionChange) return

    const isSelected = selectedValues.includes(value)
    let newSelection

    if (isSelected) {
      // Remove selection
      if (!allowEmpty && selectedValues.length === 1) return
      newSelection = selectedValues.filter(item => item !== value)
    } else {
      // Add selection
      if (maxSelections && selectedValues.length >= maxSelections) return
      newSelection = [...selectedValues, value]
    }

    onSelectionChange(newSelection)
  }

  return (
    <BadgeGroup spacing={spacing} className={className} {...props}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value)
        const isDisabled = option.disabled || 
          (!isSelected && maxSelections && selectedValues.length >= maxSelections)

        return (
          <SelectableBadge
            key={option.value}
            icon={option.icon}
            isSelected={isSelected}
            onToggle={() => handleToggle(option.value)}
            variant={variant}
            selectedVariant={selectedVariant}
            size={size}
            disabled={isDisabled}
          >
            {option.label}
          </SelectableBadge>
        )
      })}
    </BadgeGroup>
  )
}

// Status Badge Component
export function StatusBadge({ 
  status, 
  size = "default",
  showIcon = true,
  className = "",
  ...props 
}) {
  const statusConfig = {
    online: { variant: 'success', icon: '🟢', label: 'Online' },
    offline: { variant: 'destructive', icon: '🔴', label: 'Offline' },
    pending: { variant: 'warning', icon: '🟡', label: 'Pending' },
    active: { variant: 'default', icon: '✅', label: 'Active' },
    inactive: { variant: 'secondary', icon: '⏸️', label: 'Inactive' },
    error: { variant: 'destructive', icon: '❌', label: 'Error' },
    loading: { variant: 'secondary', icon: '⏳', label: 'Loading' }
  }

  const config = statusConfig[status] || statusConfig.offline

  return (
    <Badge variant={config.variant} size={size} className={className} {...props}>
      {showIcon && <span>{config.icon}</span>}
      {config.label}
    </Badge>
  )
}

// Demo Component
export function BadgeDemo() {
  const [selectedOptions, setSelectedOptions] = useState(['option1'])
  
  const demoOptions = [
    { value: 'option1', label: 'Option 1', icon: null },
    { value: 'option2', label: 'Option 2', icon: null },
    { value: 'option3', label: 'Option 3', icon: null },
  ]

  return (
    <div className="badge-demo">
      {/* Basic Badges */}
      <div className="badge-demo-section">
        <h3>Basic Badges</h3>
        <BadgeGroup>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </BadgeGroup>
      </div>

      {/* Size Variants */}
      <div className="badge-demo-section">
        <h3>Size Variants</h3>
        <BadgeGroup>
          <Badge size="sm">Small</Badge>
          <Badge size="default">Default</Badge>
          <Badge size="lg">Large</Badge>
        </BadgeGroup>
      </div>

      {/* Selectable Badges */}
      <div className="badge-demo-section">
        <h3>Multi-Select Badges</h3>
        <MultiSelectBadgeGroup
          options={demoOptions}
          selectedValues={selectedOptions}
          onSelectionChange={setSelectedOptions}
          maxSelections={2}
        />
      </div>

      {/* Status Badges */}
      <div className="badge-demo-section">
        <h3>Status Badges</h3>
        <BadgeGroup>
          <StatusBadge status="online" />
          <StatusBadge status="offline" />
          <StatusBadge status="pending" />
          <StatusBadge status="active" />
          <StatusBadge status="error" />
        </BadgeGroup>
      </div>
    </div>
  )
}

// Spacing scale for consistent layout throughout the app
export const spacing = {
    // Base spacing unit (in pixels)
    base: 4,
    
    // Spacing scale (multiples of base)
    xs: 4,    // Extra small (1× base)
    sm: 8,    // Small (2× base)
    md: 16,   // Medium (4× base)
    lg: 24,   // Large (6× base)
    xl: 32,   // Extra large (8× base)
    xxl: 48,  // 2× Extra large (12× base)
    xxxl: 64, // 3× Extra large (16× base)
    
    // Specific spacing for components
    inputHeight: 50,
    buttonHeight: 48,
    headerHeight: 60,
    bottomTabHeight: 60,
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      round: 9999,
    },
    
    // Screen padding
    screenPadding: 16,
  };
  
  // Helper function to get multiples of base spacing
  export const getSpacing = (multiple) => {
    return spacing.base * multiple;
  };
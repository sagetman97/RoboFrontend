// Everly Life Insurance Brand Design System
// Based on official brand guidelines

export const colors = {
  // Primary Colors
  everlyOrange: '#FF6E1E',
  everlyCherry: '#C5006E',
  everlyCharcoal: '#566171',
  
  // Secondary Colors
  everlyBeige: '#DACCB5',
  everlyStraw: '#E8CB57',
  everlyLavender: '#A8A8EA',
  everlyBlue: '#AAC1DD',
  everlyGray: '#8290A8',
  
  // System Colors
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F9FAFB',
  border: '#E5E7EB',
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Text Colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  
  // Gradients
  primaryGradient: 'linear-gradient(135deg, #FF6E1E 0%, #C5006E 100%)',
  subtleGradient: 'linear-gradient(135deg, #FF6E1E 0%, #C5006E 50%, #FF6E1E 100%)',
} as const;

export const typography = {
  // Font Families
  fontPrimary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSerif: 'Georgia, "Times New Roman", serif',
  
  // Font Sizes
  fontSize: {
    xs: '16px',
    sm: '18px',
    base: '20px',
    lg: '24px',
    xl: '28px',
    '2xl': '36px',
    '3xl': '48px',
    '4xl': '56px',
    '5xl': '72px',
  },
  
  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const spacing = {
  // Base unit: 8px
  0: '0',
  1: '8px',
  2: '16px',
  3: '24px',
  4: '32px',
  5: '40px',
  6: '48px',
  8: '64px',
  10: '80px',
  12: '96px',
  16: '128px',
  20: '160px',
  24: '192px',
  32: '256px',
} as const;

export const borderRadius = {
  none: '0',
  sm: '4px',
  base: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Layout constants
export const layout = {
  headerHeight: '96px',
  sidebarWidth: '360px',
  containerMaxWidth: '1600px',
} as const;

// Component styles
export const componentStyles = {
  button: {
    primary: {
      background: colors.everlyCherry,
      color: colors.white,
      border: 'none',
      borderRadius: borderRadius.base,
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.medium,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        background: '#A0005A',
        transform: 'translateY(-1px)',
        boxShadow: shadows.md,
      },
    },
    secondary: {
      background: 'transparent',
      color: colors.everlyCherry,
      border: `1px solid ${colors.everlyCherry}`,
      borderRadius: borderRadius.base,
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.medium,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        background: colors.everlyCherry,
        color: colors.white,
      },
    },
  },
  
  input: {
    base: {
      width: '100%',
      padding: `${spacing[3]} ${spacing[4]}`,
      border: `1px solid ${colors.border}`,
      borderRadius: borderRadius.base,
      fontSize: typography.fontSize.base,
      fontFamily: typography.fontPrimary,
      transition: 'border-color 0.2s ease',
      '&:focus': {
        outline: 'none',
        borderColor: colors.everlyCherry,
        boxShadow: `0 0 0 3px ${colors.everlyCherry}20`,
      },
    },
  },
  
  card: {
    base: {
      background: colors.white,
      borderRadius: borderRadius.lg,
      padding: spacing[6],
      boxShadow: shadows.base,
      border: `1px solid ${colors.border}`,
    },
  },
} as const;

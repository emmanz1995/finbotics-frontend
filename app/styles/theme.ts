export const theme = {
  colors: {
    primary: 'rgb(106 85 250 / 1)', // Purple (was Blue)
    secondary: 'rgb(31 41 55 / 1)', // Dark slate (was Green)
    accent: '#8B5CF6', // Purple
    danger: '#EF4444', // Red
    warning: '#F59E0B', // Amber
    success: '#10B981', // Green
    background: '#F9FAFB', // Light gray
    card: '#FFFFFF', // White
    text: {
      primary: '#1F2937', // Dark gray
      secondary: '#6B7280', // Medium gray
      light: '#9CA3AF', // Light gray
      white: '#FFFFFF', // White
    },
    border: '#E5E7EB', // Light gray
  },
  fonts: {
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    heading:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  radii: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

interface Props {
  theme: {
    colors: {
      background: string;
      // text: {
      primary: string;
      secondary: string;
      accent: string;
      danger: string;
      warning: string;
      success: string;
      // background: string;
      card: string;
      text: {
        primary: string;
        secondary: string;
        light: string;
        white: string;
      };
      border: string;
    };
    onts: {
      body: string;
      heading: string;
    };
    fonts: {
      body: string;
      heading: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    space: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
}

// If you want to export the Props type:
export type ThemeProps = Props;

// Or, if you want to infer the type from the theme object:
export type ThemeType = typeof theme;

import { styleVariants } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';
import { createGlobalTheme } from '@vanilla-extract/css';



export const typographyVars = createGlobalTheme(':root', {
  fontWeight: {
    char: {
        normal: 'regular',
        bold: 'bold',
    }
  },
  fontSize: {
    font12: {
        fontSize: '0.75rem',
    },
    font14: {
        fontSize: '0.875rem',
    },
    font16: {
        fontSize: '1rem',
    },
    font18: {
        fontSize: '1.125rem',
    },
    font20: {
        fontSize: '1.25rem',
    },
    font24: {
        fontSize: '1.5rem',
    },
    font28: {
        fontSize: '1.75rem',
    },
    font32: {
        fontSize: '2rem',
    },
    font36: {
        fontSize: '2.25rem',
    },
    font42: {
        fontSize: '2.625rem',
    },
    font48: {
        fontSize: '3rem',
    },
    font54: {
        fontSize: '3.375rem',
    },
    font60: {
        fontSize: '3.75rem',
    },
  },
  lineHeight: {
    lineHeight20: {
        lineHeight: '1.25rem',
    },
    lineHeight24: {
        lineHeight: '1.5rem',
    },
    lineHeight28: {
        lineHeight: '1.75rem',
    },
    lineHeight32: {
        lineHeight: '2rem',
    },
    lineHeight36: {
        lineHeight: '2.25rem',
    },
    lineHeight44: {
        lineHeight: '2.75rem',
    },
    lineHeight48: {
        lineHeight: '3rem',
    },
    lineHeight56: {
        lineHeight: '3.5rem',
    },
    lineHeight64: {
        lineHeight: '4rem',
    },
    lineHeight72: {
        lineHeight: '4.5rem',
    },
    lineHeight84: {
        lineHeight: '5.25rem',
    },
  },
  letterSpacing: {
    normal: '0%',
    wide: '2.5%',
    wider: '5%',
    widest: '10%',
  },
});

export const typography = styleVariants({
  h1: {
    fontSize: typographyVars.fontSize.font32.fontSize,
    fontWeight: typographyVars.fontWeight.char.bold,
    lineHeight: typographyVars.lineHeight.lineHeight48.lineHeight,
    letterSpacing: typographyVars.letterSpacing.wider,
  },
  h2: {
    fontSize: typographyVars.fontSize.font28.fontSize,
    fontWeight: typographyVars.fontWeight.char.bold,
    lineHeight: typographyVars.lineHeight.lineHeight44.lineHeight,
    letterSpacing: typographyVars.letterSpacing.wider,
  },
  h3: {
    fontSize: typographyVars.fontSize.font24.fontSize,
    fontWeight: typographyVars.fontWeight.char.bold,
    lineHeight: typographyVars.lineHeight.lineHeight36.lineHeight,
    letterSpacing: typographyVars.letterSpacing.wider,
  },
  h4: {
    fontSize: typographyVars.fontSize.font20.fontSize,
    fontWeight: typographyVars.fontWeight.char.bold,
    lineHeight: typographyVars.lineHeight.lineHeight32.lineHeight,
    letterSpacing: typographyVars.letterSpacing.wider,
  },
  h5: {
    fontSize: typographyVars.fontSize.font18.fontSize,
    fontWeight: typographyVars.fontWeight.char.bold,
    lineHeight: typographyVars.lineHeight.lineHeight28.lineHeight,
    letterSpacing: typographyVars.letterSpacing.wider,
  },
  h6: {
    fontSize: typographyVars.fontSize.font16.fontSize,
    fontWeight: typographyVars.fontWeight.char.bold,
    lineHeight: typographyVars.lineHeight.lineHeight24.lineHeight,
    letterSpacing: typographyVars.letterSpacing.wider,
  },
  p: {
    fontSize: typographyVars.fontSize.font16.fontSize,
    fontWeight: typographyVars.fontWeight.char.normal,
    lineHeight: typographyVars.lineHeight.lineHeight24.lineHeight,
    letterSpacing: typographyVars.letterSpacing.wider,
  },
  span: {
    fontSize: typographyVars.fontSize.font16.fontSize,
    fontWeight: typographyVars.fontWeight.char.normal,
    lineHeight: typographyVars.lineHeight.lineHeight24.lineHeight,
    letterSpacing: typographyVars.letterSpacing.wider,
  },
  small: {
    fontSize: typographyVars.fontSize.font14.fontSize,
    fontWeight: typographyVars.fontWeight.char.normal,
    lineHeight: typographyVars.lineHeight.lineHeight20.lineHeight,
    letterSpacing: typographyVars.letterSpacing.wider,
  },
  tiny: {
    fontSize: typographyVars.fontSize.font12.fontSize,
    fontWeight: typographyVars.fontWeight.char.normal,
    lineHeight: typographyVars.lineHeight.lineHeight20.lineHeight,
    letterSpacing: typographyVars.letterSpacing.wider,
  },
});

export const typographyBold = styleVariants({
    bold: {
        fontWeight: typographyVars.fontWeight.char.bold,
    }
});
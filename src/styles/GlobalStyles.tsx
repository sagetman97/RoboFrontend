import styled, { createGlobalStyle } from 'styled-components';
import { colors, typography } from './design-system';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    line-height: 1.5;
  }

  body {
    font-family: ${typography.fontPrimary};
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.normal};
    line-height: ${typography.lineHeight.normal};
    color: ${colors.textPrimary};
    background-color: ${colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${typography.fontWeight.semibold};
    line-height: ${typography.lineHeight.tight};
    color: ${colors.textPrimary};
  }

  h1 {
    font-size: ${typography.fontSize['4xl']};
  }

  h2 {
    font-size: ${typography.fontSize['3xl']};
  }

  h3 {
    font-size: ${typography.fontSize['2xl']};
  }

  h4 {
    font-size: ${typography.fontSize.xl};
  }

  h5 {
    font-size: ${typography.fontSize.lg};
  }

  h6 {
    font-size: ${typography.fontSize.base};
  }

  p {
    margin-bottom: 1rem;
    color: ${colors.textSecondary};
  }

  a {
    color: ${colors.everlyCherry};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${colors.everlyOrange};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea, select {
    font-family: inherit;
  }

  // Utility classes
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .font-bold {
    font-weight: ${typography.fontWeight.bold};
  }

  .font-semibold {
    font-weight: ${typography.fontWeight.semibold};
  }

  .font-medium {
    font-weight: ${typography.fontWeight.medium};
  }

  .text-primary {
    color: ${colors.textPrimary};
  }

  .text-secondary {
    color: ${colors.textSecondary};
  }

  .text-light {
    color: ${colors.textLight};
  }

  .bg-white {
    background-color: ${colors.white};
  }

  .bg-light {
    background-color: ${colors.lightGray};
  }

  // Focus styles for accessibility
  *:focus {
    outline: 2px solid ${colors.everlyCherry};
    outline-offset: 2px;
  }

  // Remove focus outline for mouse users
  *:focus:not(:focus-visible) {
    outline: none;
  }

  // Table reset
  table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
  }

  th, td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    background-color: #f9fafb;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

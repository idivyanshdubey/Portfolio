import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock components that might cause issues in tests
jest.mock('../components/ParticleBackground', () => {
  return function MockParticleBackground() {
    return <div data-testid="particle-background">Particle Background</div>;
  };
}, { virtual: true });

jest.mock('../components/ScrollToTop', () => {
  return function MockScrollToTop() {
    return <div data-testid="scroll-to-top">Scroll To Top</div>;
  };
});

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('App Component', () => {
  test('renders without crashing', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('particle-background')).toBeInTheDocument();
  });

  test('renders navbar', () => {
    renderWithRouter(<App />);
    // Check for navbar elements
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
  });

  test('renders scroll to top button', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument();
  });

  test('renders main content area', () => {
    renderWithRouter(<App />);
    // Check for main content
    const mainElement = document.querySelector('main');
    expect(mainElement).toBeInTheDocument();
  });
}); 
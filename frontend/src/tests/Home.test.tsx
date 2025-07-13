import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

// Mock components
jest.mock('../components/ContactForm', () => {
  return function MockContactForm() {
    return <div data-testid="contact-form">Contact Form</div>;
  };
});

jest.mock('../components/InfiniteScroll', () => {
  return function MockInfiniteScroll({ items }: any) {
    return (
      <div data-testid="infinite-scroll">
        {items?.map((item: any, index: number) => (
          <div key={index} data-testid={`project-${index}`}>
            {item.content}
          </div>
        ))}
      </div>
    );
  };
});

jest.mock('../components/DecryptedText', () => {
  return function MockDecryptedText({ text }: any) {
    return <span>{text}</span>;
  };
});

// Mock ParticleBackground if it doesn't exist
jest.mock('../components/ParticleBackground', () => {
  return function MockParticleBackground() {
    return <div data-testid="particle-background">Particle Background</div>;
  };
}, { virtual: true });

// Mock Demos component to prevent Plotly.js canvas errors
jest.mock('../pages/Demos', () => {
  return function MockDemos() {
    return <div data-testid="demos-page">Demos Page</div>;
  };
});

// Mock other pages that might cause issues
jest.mock('../pages/Projects', () => {
  return function MockProjects() {
    return <div data-testid="projects-page">Projects Page</div>;
  };
});

jest.mock('../pages/Blog', () => {
  return function MockBlog() {
    return <div data-testid="blog-page">Blog Page</div>;
  };
});

jest.mock('../pages/Analytics', () => {
  return function MockAnalytics() {
    return <div data-testid="analytics-page">Analytics Page</div>;
  };
});

jest.mock('../pages/Chatbot', () => {
  return function MockChatbot() {
    return <div data-testid="chatbot-page">Chatbot Page</div>;
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home Component', () => {
  test('renders hero section', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/AI-Powered/i)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
  });

  test('renders skills section', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Expertise & Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/Programming Languages/i)).toBeInTheDocument();
    // Use getAllByText for multiple instances
    expect(screen.getAllByText(/Web Development/i)).toHaveLength(2);
  });

  test('renders stats section', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Projects Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Years Experience/i)).toBeInTheDocument();
  });

  test('renders featured projects section', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument();
  });

  test('renders career timeline section', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Career Timeline/i)).toBeInTheDocument();
  });

  test('renders contact form', () => {
    renderWithRouter(<Home />);
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });

  test('resume modal opens and closes', () => {
    renderWithRouter(<Home />);
    
    // Find and click the View Resume button
    const resumeButton = screen.getByText(/View Resume/i);
    fireEvent.click(resumeButton);
    
    // Check if modal content is visible
    expect(screen.getByText(/Download as PDF/i)).toBeInTheDocument();
    
    // Find and click the close button
    const closeButton = screen.getByLabelText(/Close Resume Modal/i);
    fireEvent.click(closeButton);
    
    // Modal should be closed (close button should not be visible)
    expect(screen.queryByLabelText(/Close Resume Modal/i)).not.toBeInTheDocument();
  });

  test('social links are present', () => {
    renderWithRouter(<Home />);
    
    // Get all links and check for social media links by href
    const allLinks = screen.getAllByRole('link');
    
    const githubLink = allLinks.find(link => 
      link.getAttribute('href') === 'https://github.com/idivyanshdubey'
    );
    const linkedinLink = allLinks.find(link => 
      link.getAttribute('href') === 'https://www.linkedin.com/in/divyansh-dubey-48101025d/'
    );
    const emailLink = allLinks.find(link => 
      link.getAttribute('href') === 'mailto:divyanshhdubey10@gmail.com'
    );
    
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();
  });

  test('navigation links work', () => {
    renderWithRouter(<Home />);
    
    // Check for navigation links
    const projectsLink = screen.getByRole('link', { name: /View Projects/i });
    const demosLink = screen.getByRole('link', { name: /Try AI Demos/i });
    const allProjectsLink = screen.getByRole('link', { name: /View All Projects/i });
    
    expect(projectsLink).toBeInTheDocument();
    expect(demosLink).toBeInTheDocument();
    expect(allProjectsLink).toBeInTheDocument();
  });
}); 
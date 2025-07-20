# Frontend Documentation

Complete guide for the React/TypeScript frontend of the AI Portfolio.

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** and npm
- **Git** for version control

### Development Setup
```bash
cd frontend
npm install
npm start
```

### Build for Production
```bash
npm run build
```

## 🏗 Project Structure

```
frontend/
├── public/              # Static assets
│   ├── index.html       # Main HTML file
│   ├── manifest.json    # PWA manifest
│   └── data/            # Static data files
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── contexts/        # React contexts
│   ├── utils/           # Utility functions
│   ├── config/          # Configuration files
│   └── tests/           # Test files
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🎨 UI Components

### **Core Components**
- **Navbar.tsx** - Navigation bar with theme toggle
- **Footer.tsx** - Footer component
- **LoadingSpinner.tsx** - Loading animation
- **AnimatedToast.tsx** - Toast notifications
- **GlitchText.tsx** - Animated text effects
- **InfiniteScroll.tsx** - Infinite scrolling component
- **ScrollToTop.tsx** - Scroll to top button
- **ThemeToggle.tsx** - Dark/light theme toggle

### **Page Components**
- **Home.tsx** - Landing page with hero section
- **Projects.tsx** - Project showcase page
- **Blog.tsx** - Blog posts page
- **Chatbot.tsx** - AI chatbot interface
- **Analytics.tsx** - Analytics dashboard
- **Demos.tsx** - Interactive demos page

## 🎯 Key Features

### **Responsive Design**
- Mobile-first approach
- Tailwind CSS for styling
- Responsive breakpoints
- Touch-friendly interactions

### **Theme System**
- Dark/light theme support
- ThemeContext for state management
- CSS variables for theming
- Smooth theme transitions

### **Animations**
- Framer Motion for animations
- Scroll-triggered animations
- Loading states and transitions
- Interactive hover effects

### **Performance**
- Code splitting with React.lazy()
- Image optimization
- Bundle size optimization
- Memoization for expensive components

## 🔧 Configuration

### **Environment Variables**
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ANALYTICS_ID=your_analytics_id
REACT_APP_SENTRY_DSN=your_sentry_dsn
```

### **Tailwind CSS**
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ]
}
```

### **TypeScript Configuration**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

## 📊 State Management

### **React Context**
```typescript
// contexts/ThemeContext.tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```

### **Custom Hooks**
```typescript
// hooks/useApi.ts
export const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
```

## 🔗 API Integration

### **API Client**
```typescript
// utils/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const apiClient = {
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },

  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
};
```

### **Error Handling**
```typescript
// utils/errorHandler.ts
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error
    return `Error: ${error.response.data.message}`;
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection.';
  } else {
    // Other error
    return 'An unexpected error occurred.';
  }
};
```

## 🧪 Testing

### **Unit Tests**
```bash
npm test
```

### **Test Structure**
```typescript
// tests/Home.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

test('renders home page', () => {
  render(<Home />);
  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
});
```

### **Testing Utilities**
```typescript
// tests/test-utils.tsx
import { render } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });
```

## 🚀 Performance Optimization

### **Code Splitting**
```typescript
// Lazy load components
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));

// Suspense wrapper
<Suspense fallback={<LoadingSpinner />}>
  <Projects />
</Suspense>
```

### **Image Optimization**
```typescript
// utils/imageOptimization.ts
export const optimizeImage = (src: string, width: number) => {
  return `${src}?w=${width}&q=80&format=webp`;
};
```

### **Bundle Analysis**
```bash
npm run build
npx serve -s build
```

## 🔍 Debugging

### **React Developer Tools**
- Install React Developer Tools extension
- Use Components tab for component inspection
- Use Profiler tab for performance analysis

### **Console Logging**
```typescript
// utils/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
  }
};
```

## 📱 PWA Features

### **Service Worker**
```typescript
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/static/js/bundle.js',
        '/static/css/main.css'
      ]);
    })
  );
});
```

### **Manifest Configuration**
```json
{
  "name": "AI Portfolio",
  "short_name": "Portfolio",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#3B82F6",
  "background_color": "#ffffff"
}
```

## 🚨 Common Issues

### **Build Errors**
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### **TypeScript Errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

### **Styling Issues**
```bash
# Rebuild Tailwind CSS
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```

## 📚 Additional Resources

- **[React Documentation](https://reactjs.org/docs/)** - Official React docs
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript guide
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library 
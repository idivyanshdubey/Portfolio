import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Demos from './pages/Demos';
import Blog from './pages/Blog';
import Analytics from './pages/Analytics';
import Chatbot from './pages/Chatbot';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/demos" element={<Demos />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 
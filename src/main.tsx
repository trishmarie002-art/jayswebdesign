import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileContactBar from './components/MobileContactBar';
import GoogleRankTracker from './pages/GoogleRankTracker';
import './index.css';

const isRankTracker = window.location.pathname === '/google-rank-tracker';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isRankTracker ? (
      <HelmetProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
            <Header />
            <main>
              <GoogleRankTracker />
            </main>
            <Footer />
            <MobileContactBar />
          </div>
        </BrowserRouter>
      </HelmetProvider>
    ) : (
      <App />
    )}
  </StrictMode>,
);

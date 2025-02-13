import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import JarviceCircle from '../components/JarviceCircle';
import HudInput from '../components/HudInput';
import JarviceButton from '../components/JarviceButton';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [rotation, setRotation] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [systemStatus, setSystemStatus] = useState('INITIALIZING...');

  // Handle rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Handle mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;
      setMousePosition({ x: deltaX, y: deltaY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // System status messages
  const idleMessages = [
    'ANALYZING QUANTUM PATTERNS',
    'PROCESSING NEURAL NETWORKS',
    'MONITORING ENERGY SIGNATURES',
    'SCANNING DIMENSIONAL VARIABLES',
    'OPTIMIZING SYSTEM PROTOCOLS',
    'CALCULATING PROBABILITY MATRICES',
    'SYNCHRONIZING DATA STREAMS',
    'CALIBRATING RESPONSE ALGORITHMS'
  ];

  // Simulate system initialization and idle state
  useEffect(() => {
    const initMessages = [
      'INITIALIZING SYSTEMS...',
      'CALIBRATING NEURAL INTERFACE...',
      'ESTABLISHING SECURE CONNECTION...',
      'ACTIVATING DEFENSE PROTOCOLS...',
      'READY FOR USER INPUT'
    ];

    let currentIndex = 0;
    let idleInterval: NodeJS.Timeout;

    // Initial startup sequence
    const startupInterval = setInterval(() => {
      if (currentIndex < initMessages.length) {
        setSystemStatus(initMessages[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(startupInterval);
        // Start idle message rotation
        let idleIndex = 0;
        idleInterval = setInterval(() => {
          idleIndex = (idleIndex + 1) % idleMessages.length;
          setSystemStatus(prev => {
            const dots = prev.endsWith('...') ? '' : 
                        prev.endsWith('..') ? '...' :
                        prev.endsWith('.') ? '..' : '.';
            return `${idleMessages[idleIndex]}${dots}`;
          });
        }, 2000);
      }
    }, 1000);

    return () => {
      clearInterval(startupInterval);
      if (idleInterval) clearInterval(idleInterval);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    setSystemStatus('PROCESSING REQUEST...');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setSystemStatus('ACCESS GRANTED');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Something went wrong');
        setStatus('error');
        setSystemStatus('ERROR DETECTED');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Network error. Please try again.');
      setStatus('error');
      setSystemStatus('CONNECTION FAILURE');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12 overflow-hidden relative">
      <Head>
        <title>Jarvice Access Portal</title>
        <meta name="description" content="Join the Jarvice waitlist" />
      </Head>

      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-white animate-bootSequence" />
      
      {/* Arc Reactor Pattern */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[800px] h-[800px] animate-arcReactor">
          <div className="absolute inset-0 border-2 border-blue-400/20 rounded-full" />
          <div className="absolute inset-[10%] border-2 border-blue-400/30 rounded-full" />
          <div className="absolute inset-[20%] border-2 border-blue-400/40 rounded-full" />
          <div className="absolute inset-[30%] border-2 border-blue-400/50 rounded-full" />
          
          {/* Triangular Patterns */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-40 origin-bottom"
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
              }}
            >
              <div className="w-full h-full bg-gradient-to-t from-blue-400/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Hexagonal Grid */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-hexagon-pattern opacity-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      {/* Ambient Particles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.3 + 0.1;
        const animationDuration = Math.random() * 3 + 2;
        return (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(59, 130, 236, ${opacity})`,
              boxShadow: `0 0 ${size * 2}px rgba(59, 130, 236, ${opacity})`,
              animationDuration: `${animationDuration}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        );
      })}
      
      {/* Data Streams */}
      {Array.from({ length: 8 }).map((_, i) => {
        const height = Math.random() * 150 + 100;
        return (
          <div
            key={`stream-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-blue-400/20 to-transparent animate-scan"
            style={{
              height: `${height}px`,
              left: `${(i + 1) * (100 / 9)}%`,
              top: '0',
              animationDuration: `${Math.random() * 3 + 4}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        );
      })}

      {/* Main Interface Container */}
      <div 
        className="relative z-10 w-full max-w-4xl flex flex-col items-center"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* JARVICE Circle */}
        <div className="relative mb-8">
          <JarviceCircle rotation={rotation} size="lg" />
          
          {/* System Status */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <p className="text-blue-400/80 text-sm font-mono tracking-wider animate-pulse">
                {systemStatus}
              </p>
              {/* Status Indicator */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2">
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-0 bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="relative group animate-bootSequence">
            {/* Arc Reactor Core */}
            <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-24 h-24 animate-arcReactor">
              <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-xl" />
              <div className="absolute inset-[15%] rounded-full bg-sky-400/30 blur-lg" />
              <div className="absolute inset-[30%] rounded-full bg-sky-400/40 blur-md" />
              <div className="absolute inset-[45%] rounded-full bg-sky-500/50" />
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-light text-sky-500 tracking-[0.3em] mb-4 uppercase
                         relative z-10 text-shadow-glow transform hover:scale-105 transition-transform">
              Jarvice
              <div className="absolute inset-0 bg-blue-400/20 blur-xl -z-10" />
            </h1>

            {/* Scanning Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent 
                            animate-scan transform translate-y-full" />
            </div>

            {/* Decorative Lines */}
            <div className="absolute -left-full -right-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            <div className="absolute -left-full -right-full bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
          </div>
          
          <p className="text-sky-600/90 text-lg md:text-xl font-light tracking-wider mb-8 animate-fade-in">
            Your Intelligent Computing Assistant
            <span className="inline-block w-1.5 h-4 bg-sky-400 ml-1 animate-blink" />
          </p>

          {status !== 'success' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <HudInput
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="Enter Access Credentials (Email)"
                disabled={status === 'submitting'}
                error={errorMessage}
              />
              
              <JarviceButton
                type="submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'PROCESSING...' : 'REQUEST ACCESS'}
              </JarviceButton>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-emerald-500 text-xl font-bold">
                ACCESS REQUEST CONFIRMED
              </p>
              <p className="text-sky-600/90">
                Stand by for further instructions.
              </p>
              <JarviceButton
                variant="secondary"
                onClick={() => {
                  setStatus('idle');
                  setEmail('');
                  setSystemStatus('READY FOR INPUT');
                }}
              >
                INITIATE NEW REQUEST
              </JarviceButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

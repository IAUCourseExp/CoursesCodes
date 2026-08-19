import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] z-[1]" 
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        ></div>

        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[80px] opacity-60 animate-float bg-[radial-gradient(circle,rgba(99,102,241,0.4)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(99,102,241,0.25)_0%,transparent_70%)]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[80px] opacity-60 animate-float [animation-delay:-5s] bg-[radial-gradient(circle,rgba(168,85,247,0.4)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(168,85,247,0.25)_0%,transparent_70%)]"></div>
        <div className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] rounded-full blur-[80px] opacity-60 animate-float [animation-delay:-10s] bg-[radial-gradient(circle,rgba(59,130,246,0.3)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)]"></div>
        <div className="absolute bottom-[20%] left-[20%] w-[30vw] h-[30vw] rounded-full blur-[80px] opacity-60 animate-float [animation-delay:-15s] bg-[radial-gradient(circle,rgba(236,72,153,0.2)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(236,72,153,0.15)_0%,transparent_70%)]"></div>

        <div className="absolute inset-0 bg-white/30 dark:bg-black/40 backdrop-blur-[1px]"></div>
      </div>

      <main className="relative z-10 flex flex-col min-h-screen">
        {children}
      </main>
      
    </div>
  );
}
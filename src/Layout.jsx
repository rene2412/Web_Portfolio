import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black">
      <style>{`
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }
        *::-webkit-scrollbar {
          width: 6px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.3);
        }
        html {
          scroll-behavior: smooth;
        }
        ::selection {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }
      `}</style>
      {children}
    </div>
  );
}

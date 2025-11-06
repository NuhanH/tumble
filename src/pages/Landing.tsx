import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center fade-in">
        {/* Logo only */}
        <div className="mb-8">
          <img src="/logo.png" alt="TUMBLE" className="h-16 mx-auto" />
        </div>

        {/* Instructions Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border theme-border">
          <h2 className="text-2xl font-extrabold mb-4">
            How to Play?
          </h2>
          <div className="text-left space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">1️⃣</span>
              <p>Each player holds a platform in their hand</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">2️⃣</span>
              <p>Take turns drawing cards - you'll get a block or action card</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">3️⃣</span>
              <p><strong>Block card:</strong> Place the block on your platform</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">4️⃣</span>
              <p><strong>Action card:</strong> Perform the action shown on the card</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏆</span>
              <p>The one who keeps their platform balanced wins!</p>
            </div>
          </div>
        </div>

        {/* Start Game Button */}
        <button
          onClick={() => navigate('/game')}
          className="pulse-animation bg-[var(--primary)] text-white font-extrabold text-2xl py-6 px-12 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
        >
          🎯 Start Game
        </button>

        {/* Footer Info */}
        <p className="mt-8 opacity-70 text-sm">Click the button to draw cards</p>
      </div>
    </div>
  );
}

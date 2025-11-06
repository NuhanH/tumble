import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardDeck, initializeDeck, drawCard } from '../data/cards';
import CardDisplay from '../components/CardDisplay';

export default function Game() {
  const navigate = useNavigate();
  const [deck, setDeck] = useState<CardDeck>(initializeDeck());
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [startingPlayer, setStartingPlayer] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handleDrawCard = () => {
    if (deck.remaining === 0) {
      setGameFinished(true);
      return;
    }

    // Hide starting player banner as soon as the first draw begins
    if (!hasStarted) {
      setHasStarted(true);
    }

    setIsDrawing(true);
    setCurrentCard(null);

    // Kısa animasyon gecikmesi
    setTimeout(() => {
      const { card, newDeck } = drawCard(deck);
      setCurrentCard(card);
      setDeck(newDeck);
      setIsDrawing(false);

      if (newDeck.remaining === 0) {
        setTimeout(() => setGameFinished(true), 2000);
      }
    }, 300);
  };

  const handleRestart = () => {
    setDeck(initializeDeck());
    setCurrentCard(null);
    setGameFinished(false);
    setPlayerCount(null);
    setStartingPlayer(null);
    setHasStarted(false);
  };

  const handleSelectPlayers = (count: number) => {
    setPlayerCount(count);
    const start = Math.floor(Math.random() * count) + 1;
    setStartingPlayer(start);
    setHasStarted(false);
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      {/* Header */}
      <header className="bg-transparent border-b theme-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="opacity-80 hover:opacity-100 flex items-center gap-2 transition-colors"
          >
            ← Home
          </button>
          <div className="flex items-center">
            <img src="/logo.png" alt="TUMBLE logo" className="h-8" />
          </div>
          <div className="w-24"></div> {/* Spacer */}
        </div>
      </header>

      {/* Ana Oyun Alanı */}
  <main className="flex-1 flex flex-col items-center justify-center p-6 pb-[calc(40px+env(safe-area-inset-bottom))]">
        <div className="max-w-2xl w-full space-y-8">
          {/* Player selection overlay */}
          {playerCount === null && !gameFinished && (
            <div className="text-center fade-in">
              <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Select Players</h2>
                <p className="text-gray-600 mb-6">How many players will play?</p>
                <div className="flex justify-center gap-4">
                  {[2,3,4].map((n) => (
                    <button
                      key={n}
                      onClick={() => handleSelectPlayers(n)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl py-3 px-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      {n} Players
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Starting player note: visible after selection until first draw starts */}
          {playerCount !== null && startingPlayer !== null && !hasStarted && !gameFinished && (
            <div className="text-center">
              <div className="inline-block bg-white/20 backdrop-blur rounded-full px-6 py-2">
                  <span className="text-white font-semibold">Starting Player: Player {startingPlayer}</span>
              </div>
            </div>
          )}
          {/* Oyun Bitti Ekranı */}
          {gameFinished ? (
            <div className="text-center fade-in">
              <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-12">
                <div className="text-7xl mb-6">🎉</div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  All Cards Drawn!
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  All cards have been drawn. Game over!
                </p>
                <div className="space-y-4">
                  <button
                    onClick={handleRestart}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    🔄 New Game
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="block w-full text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Kalan Kart Sayısı */}
              <div className="text-center">
                <div className="inline-block bg-white rounded-full px-6 py-2 border theme-border shadow-sm">
                  <span className="font-extrabold">📊 Cards Remaining: {deck.remaining}</span>
                </div>
              </div>

              {/* Kart Gösterim Alanı */}
              <div className="min-h-[400px] flex items-center justify-center">
                {currentCard ? (
                  <CardDisplay card={currentCard} />
                ) : (
                  <div className="text-center opacity-80">
                    <div className="text-6xl mb-4">🎴</div>
                    <p className="text-xl">Click the button to draw a card</p>
                  </div>
                )}
              </div>

              {/* Kart Çekme Butonu */}
              <div className="text-center mb-[calc(16px+env(safe-area-inset-bottom))]">
                <button
                  onClick={handleDrawCard}
                  disabled={isDrawing || deck.remaining === 0 || playerCount === null}
                  className={`
                    bg-[var(--primary)] text-white font-extrabold text-xl py-6 px-12 rounded-full 
                    shadow-2xl transform transition-all duration-300
                    ${isDrawing || deck.remaining === 0 || playerCount === null
                      ? 'opacity-50 cursor-not-allowed scale-95' 
                      : 'hover:scale-105 hover:shadow-3xl pulse-animation'
                    }
                  `}
                >
                  {isDrawing ? '⏳ Drawing...' : 'Draw Card'}
                </button>
              </div>

              {/* Info */}
              {currentCard && deck.remaining > 0 && (
                <div className="text-center opacity-70 text-sm fade-in">
                  <p>Draw again for the next card</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

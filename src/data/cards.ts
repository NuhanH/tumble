// Kart tipleri
export type CardType = 'shape' | 'action';

export interface Card {
  id: number;
  type: CardType;
  name: string;
  description?: string;
  icon?: string;
  shape?: number[][]; // Şekil kartları için 2D grid (1 = dolu, 0 = boş)
  image?: string; // Şekil kartları için fotoğraf yolu
  count?: number; // Her karttan kaç tane var
}

export interface CardDeck {
  cards: Card[];
  remaining: number;
}

// Shape (block) cards - target total: 32 (current defined total by counts below: 30)
// If you'd like exactly 32, tell me which 2 more to add (e.g., +2 Soil or +2 Pebble)
const shapeCards: Card[] = [
  // Tornado (2 straight, 2 reverse) => 4
  {
    id: 1,
    type: 'shape',
    name: 'Tornado (Straight)',
    image: '/tornado-duz.png',
    icon: '',
    count: 2,
  },
  {
    id: 2,
    type: 'shape',
    name: 'Tornado (Reverse)',
    image: '/tornado-ters.png',
    icon: '',
    count: 2,
  },

  // Slope (2 straight, 1 reverse) => 3
  {
    id: 3,
    type: 'shape',
    name: 'Slope (Straight)',
    image: '/slope-duz.png',
    icon: '',
    count: 2,
  },
  {
    id: 4,
    type: 'shape',
    name: 'Slope (Reverse)',
    image: '/slope-ters.png',
    icon: '',
    count: 1,
  },

  // Soil => 4
  {
    id: 5,
    type: 'shape',
    name: 'Soil',
    image: '/soil.png',
    icon: '',
    count: 4,
  },

  // Rainbow (1 straight, 1 reverse) => 2
  {
    id: 6,
    type: 'shape',
    name: 'Rainbow (Straight)',
    image: '/rainbow.png',
    icon: '',
    count: 1,
  },
  {
    id: 7,
    type: 'shape',
    name: 'Rainbow (Reverse)',
    image: '/rainbow-ters.png',
    icon: '',
    count: 1,
  },

  // Tree => 3
  {
    id: 8,
    type: 'shape',
    name: 'Tree',
    image: '/tree.png',
    icon: '',
    count: 3,
  },

  // Rock => 2
  {
    id: 9,
    type: 'shape',
    name: 'Rock',
    image: '/rock.png',
    icon: '',
    count: 2,
  },

  // Pebble => 3
  {
    id: 10,
    type: 'shape',
    name: 'Pebble',
    image: '/pebble.png',
    icon: '',
    count: 3,
  },

  // Sun => 4
  {
    id: 11,
    type: 'shape',
    name: 'Sun',
    image: '/sun.png',
    icon: '',
    count: 2,
  },

  // Ice => 5
  {
    id: 12,
    type: 'shape',
    name: 'Ice',
    image: '/ice.png',
    icon: '',
    count: 5,
  },

  // Grass => 4 (added to reach total 32 blocks)
  {
    id: 13,
    type: 'shape',
    name: 'Grass',
    image: '/grass.png',
    icon: '',
    count: 4,
  },
];

// Action cards
const actionCards: Card[] = [
  {
    id: 101,
    type: 'action',
    name: 'Switch Hands',
    description: 'Switch your platform to the other hand (right → left or left → right)',
    icon: '',
    count: 3, // updated to 3
  },
  {
    id: 102,
    type: 'action',
    name: 'Reach Forward',
    description: 'Extend your hand forward while holding the platform',
    icon: '',
    count: 2, // updated to 2
  },
  {
    id: 103,
    type: 'action',
    name: 'Stand on One Leg',
    description: 'Stand on one leg for 10 seconds',
    icon: '🦵',
    count: 2,
  },
  {
    id: 104,
    type: 'action',
    name: 'Circle Around Players',
    description: 'Walk around all the players once',
    icon: '🔄',
    count: 1,
  },
  {
    id: 105,
    type: 'action',
    name: 'Spin Around',
    description: 'Spin around yourself once',
    icon: '🌀',
    count: 3,
  },
  {
    id: 106,
    type: 'action',
    name: 'Stand Up / Sit Down',
    description: 'Stand up (if sitting) or sit down (if standing)',
    icon: '🧍',
    count: 3,
  },
  {
    id: 107,
    type: 'action',
    name: 'Skip Next Turn',
    description: "Don't place any block on your next turn",
    icon: '⏭️',
    count: 2, // increased to reach total of 18 action cards
  },
  {
    id: 108,
    type: 'action',
    name: 'Steal a Block',
    description: "Take the top block from another player's platform and place it on yours",
    icon: '',
    count: 1,
  },
  {
    id: 109,
    type: 'action',
    name: 'Double Block',
    description: 'Place 2 blocks on your next turn',
    icon: '',
    count: 1,
  },
];

// Deste oluşturma - her karttan belirtilen sayıda ekle
function createDeck(): Card[] {
  const deck: Card[] = [];
  [...shapeCards, ...actionCards].forEach((card) => {
    const count = card.count || 1;
    for (let i = 0; i < count; i++) {
      deck.push({ ...card });
    }
  });
  return deck;
}

// Desteyi karıştırma
function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Yeni deste oluştur
export function initializeDeck(): CardDeck {
  const cards = shuffleDeck(createDeck());
  return {
    cards,
    remaining: cards.length,
  };
}

// Desteden kart çek
export function drawCard(deck: CardDeck): { card: Card | null; newDeck: CardDeck } {
  if (deck.remaining === 0) {
    return { card: null, newDeck: deck };
  }

  const card = deck.cards[deck.cards.length - deck.remaining];
  return {
    card,
    newDeck: {
      cards: deck.cards,
      remaining: deck.remaining - 1,
    },
  };
}

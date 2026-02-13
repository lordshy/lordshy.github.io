import React, { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import confetti from 'canvas-confetti';

const App: React.FC = () => {
  const [stage, setStage] = useState<'ask' | 'success'>('ask');
  const [noCount, setNoCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState<{ top: string, left: string } | null>(null);

  const noPhrases = [
    "No",
    "Ты уверена?",
    "Ты точно уверена?!",
    "Подумай еще раз!",
    "Не разбивай мне сердце 💔",
    "Я буду плакать...",
    "Ну пожалуйста...",
    "Я сделаю тебе массаж!",
    "Я куплю тебе шоколадку!",
    "НУ ПОЖАЛУЙСТА 🙏",
    "У тебя нет выбора! ❤️"
  ];

  const moveNoButton = () => {
    setNoCount(prev => prev + 1);
    
    // Only start moving the button after 2 clicks (starts moving on the 3rd attempt)
    if (noCount >= 2) {
      const x = Math.random() * (window.innerWidth - 150);
      const y = Math.random() * (window.innerHeight - 80);
      setNoButtonPosition({ top: `${Math.max(20, y)}px`, left: `${Math.max(20, x)}px` });
    }
  };

  const handleYesClick = () => {
    setStage('success');
    
    const duration = 3000;
    const end = Date.now() + duration;
    
    // Define heart shape for confetti
    // @ts-ignore - shapeFromPath exists in the library but might be missing in types
    const heart = confetti.shapeFromPath({
      path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z'
    });

    const frame = () => {
      // Reduced particle count significantly to prevent lag
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ffa500', '#ff69b4', '#ffc0cb'],
        shapes: [heart],
        scalar: 3, // Increased scalar to make hearts more visible
        drift: 0,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ffa500', '#ff69b4', '#ffc0cb'],
        shapes: [heart],
        scalar: 3,
        drift: 0,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const getNoText = () => {
    return noPhrases[Math.min(noCount, noPhrases.length - 1)];
  };

  return (
    <div className="min-h-screen relative font-sans flex flex-col items-center justify-center p-4 overflow-hidden bg-love-50">
      <FloatingHearts />

      {stage === 'ask' ? (
        <div className="z-10 flex flex-col items-center gap-8 max-w-2xl w-full">
          <div className="w-full flex justify-center mb-4">
             {/* 
                Using the Imgur link provided. 
                Added .png extension for direct image rendering.
             */}
             <img 
                src="https://i.imgur.com/6LCYRL9.png" 
                alt="Cute white rat" 
                className="rounded-2xl shadow-xl w-64 h-64 object-cover border-4 border-white bg-white"
             />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-handwriting text-love-600 text-center drop-shadow-sm px-4">
            Will you be my Valentine, Anna?
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 w-full relative h-32">
            <button
              onClick={handleYesClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg transform hover:scale-110 z-20"
              style={{
                fontSize: `${Math.min(1.2 + noCount * 0.5, 3.5)}rem`,
                padding: `${Math.min(12 + noCount * 5, 50)}px ${Math.min(24 + noCount * 10, 100)}px`
              }}
            >
              Yes
            </button>

            <button
              onClick={moveNoButton}
              className="bg-love-500 hover:bg-love-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-100 shadow-lg z-30"
              style={{
                 position: noButtonPosition ? 'fixed' : 'static',
                 top: noButtonPosition?.top,
                 left: noButtonPosition?.left,
                 whiteSpace: 'nowrap'
              }}
            >
              {getNoText()}
            </button>
          </div>
        </div>
      ) : (
        <div className="z-10 flex flex-col items-center animate-in zoom-in duration-500 text-center">
            <div className="mb-8">
                 <img 
                    src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
                    alt="Bear kiss" 
                    className="rounded-lg shadow-2xl w-64 h-64 object-cover mx-auto"
                 />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-handwriting text-love-600 mb-6 drop-shadow-md">
                I Love You Anna! ❤️
            </h1>
            <p className="text-xl text-love-400 font-sans max-w-md mx-auto">
                Ура! Спасибо, что ты моя валентинка!
                (Я знал, что ты согласишься 😏)
            </p>
        </div>
      )}
    </div>
  );
};

export default App;
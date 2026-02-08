import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function ValentineGame() {
  const [currentStep, setCurrentStep] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState([]);

  // Leading messages before the main question
  const leadingMessages = [
    "Hey Beautiful...",
    "We've known each other for some time now...",
    "Tho we don't have some cute memories together yet...",
    "I'd love to create some with you...",
    "You make me smile everytime I think of you...",
    "So, I have a question for you...",
  ];

  // Floating hearts animation - slower and more hearts
  useEffect(() => {
    const interval = setInterval(() => {
      const newHearts = Array.from({ length: 3 }, () => ({
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: 8 + Math.random() * 4,
        size: 20 + Math.random() * 15,
        rotation: Math.random() * 360,
      }));
      setHearts((prev) => [...prev.slice(-30), ...newHearts]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Phrases that change as user clicks "No"
  const phrases = [
    "Will you be my Valentine? 🌹",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Don't be shy...",
    "Just give it a chance!",
    "You might regret this!",
    "Think about it!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Don't do this to me! 🥺",
    "I'm gonna cry...",
    "You're breaking my heart...",
    "Are you sticking with this decision?",
    "Final chance!",
    "Seriously?? 😢",
  ];

  // Button text for "No" that changes
  const noButtonTexts = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Nope",
    "Don't!",
    "Please?",
    "Reconsider!",
    "Wrong choice!",
    "No way!",
    "Stop it!",
    "Come on!",
    "Please! 🥺",
    "Mistake!",
    "Last chance!",
  ];

  const getNoButtonText = () => {
    return noButtonTexts[Math.min(noCount, noButtonTexts.length - 1)];
  };

  const getPhrase = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // Calculate button sizes
  const getYesButtonSize = () => {
    const baseSize = 120;
    return Math.min(baseSize + noCount * 20, 280);
  };

  const getNoButtonSize = () => {
    const baseSize = 100;
    return Math.max(baseSize - noCount * 5, 50);
  };

  // Move "No" button on click (mobile friendly)
  const handleNoClick = () => {
    const buttonSize = getNoButtonSize();
    const padding = 20;
    const minX = padding;
    const maxX = window.innerWidth - buttonSize - padding;
    const minY = padding;
    const maxY = window.innerHeight - buttonSize * 0.5 - padding;

    const newX = Math.max(
      minX,
      Math.min(maxX, minX + Math.random() * (maxX - minX)),
    );
    const newY = Math.max(
      minY,
      Math.min(maxY, minY + Math.random() * (maxY - minY)),
    );

    setNoButtonPosition({ x: newX, y: newY });
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    // Create explosion of hearts
    const explosionHearts = Array.from({ length: 40 }, () => ({
      id: Math.random(),
      left: Math.random() * 100,
      animationDuration: 2 + Math.random() * 1,
      size: 20 + Math.random() * 20,
      rotation: Math.random() * 360,
    }));
    setHearts((prev) => [...prev, ...explosionHearts]);
  };

  const handleNextMessage = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="min-h-screen w-full bg-pink-50 flex items-center justify-center overflow-hidden relative p-4">
      {/* Floating Hearts Background */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed text-red-500 pointer-events-none opacity-70"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            fontSize: `${heart.size}px`,
            animation: `floatUp ${heart.animationDuration}s linear forwards`,
            transform: `rotate(${heart.rotation}deg)`,
          }}
        >
          ❤️
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes bounceIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
          }
          50% { 
            transform: scale(1.05); 
          }
        }
        
        @keyframes shake {
          0%, 100% { 
            transform: translateX(0); 
          }
          25% { 
            transform: translateX(-10px); 
          }
          75% { 
            transform: translateX(10px); 
          }
        }

        @keyframes wiggle {
          0%, 100% { 
            transform: rotate(-3deg); 
          }
          50% { 
            transform: rotate(3deg); 
          }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
          }
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Leading Messages */}
      {currentStep < leadingMessages.length ? (
        <div className="w-full max-w-md mx-auto animate-bounceIn">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 border border-white/30">
            {/* Message Text */}
            <div className="text-center mb-6">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-pink-500 leading-relaxed animate-pulse-slow">
                {leadingMessages[currentStep]}
              </h1>
            </div>

            {/* Click Me Button */}
            <div className="flex justify-center">
              <button
                onClick={handleNextMessage}
                className="bg-pink-500 text-white text-base sm:text-lg font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse-slow"
              >
                Click Me
              </button>
            </div>
          </div>
        </div>
      ) : !yesPressed ? (
        // Main Question Screen
        <div className="w-full max-w-md mx-auto relative z-10">
          <div className="animate-bounceIn">
            {/* Animated Heart */}
            <div className="flex justify-center mb-4">
              {noCount >= 12 ? (
                <span className="text-5xl sm:text-6xl animate-pulse-slow">
                  💔
                </span>
              ) : (
                <Heart
                  className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 animate-pulse-slow"
                  fill="currentColor"
                />
              )}
            </div>

            {/* Question Text */}
            <div className="text-center mb-4 sm:mb-5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-500 animate-wiggle">
                {getPhrase()}
              </h1>
            </div>

            {/* GIF/Image Placeholder */}
            <div
              className="mb-4 sm:mb-5 rounded-2xl p-4 sm:p-5 flex items-center justify-center"
              style={{ height: "180px" }}
            >
              <div className="text-center">
                <div className="text-5xl sm:text-6xl mb-2">🥺</div>
                <p className="text-gray-600 text-sm sm:text-base animate-pulse-slow">
                  Please say yes...
                </p>
              </div>
            </div>

            {/* Buttons Container */}
            <div
              className="relative flex items-center justify-center gap-2 sm:gap-4 mb-3"
              style={{ minHeight: "70px" }}
            >
              {/* Yes Button - Gets Bigger */}
              <button
                onClick={handleYesClick}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-2xl active:scale-95 transition-all duration-300 flex items-center justify-center animate-pulse-slow"
                style={{
                  width: `${Math.min(getYesButtonSize(), 200)}px`,
                  height: `${Math.min(getYesButtonSize() * 0.5, 100)}px`,
                  fontSize: `${Math.min(getYesButtonSize() * 0.15, 24)}px`,
                }}
              >
                Yes! 💕
              </button>

              {/* No Button - Gets Smaller and Moves */}
              <button
                onClick={handleNoClick}
                className="bg-gradient-to-r from-red-400 to-red-600 text-white font-bold rounded-full shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center"
                style={{
                  width: `${getNoButtonSize()}px`,
                  height: `${getNoButtonSize() * 0.5}px`,
                  fontSize: `${Math.min(getNoButtonSize() * 0.15, 18)}px`,
                  left: noCount > 0 ? `${noButtonPosition.x}px` : "auto",
                  top: noCount > 0 ? `${noButtonPosition.y}px` : "auto",
                  position: noCount > 0 ? "fixed" : "relative",
                }}
              >
                {getNoButtonText()}
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Success Screen
        <div className="w-full max-w-md mx-auto animate-bounceIn">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 border border-white/30">
            {/* Success Animation with Star */}
            <div className="flex justify-center mb-4 sm:mb-5">
              <span className="text-6xl sm:text-7xl animate-pulse-slow">
                😍
              </span>
            </div>

            <div className="text-center mb-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent animate-wiggle">
                She Said Yessss! 🎉
              </h1>
            </div>

            <div className="mb-4 sm:mb-5 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-4 sm:p-5">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl mb-2 animate-pulse-slow">
                  💖
                </div>
                <p className="text-lg sm:text-xl text-gray-700 font-semibold animate-pulse-slow">
                  You just made me the happiest person alive!
                </p>
              </div>
            </div>

            <div className="text-center space-y-2 text-gray-700 text-sm sm:text-base mb-4 sm:mb-5">
              <p className="text-xl sm:text-2xl animate-pulse-slow">
                I love you! ❤️
              </p>
              <p className="animate-pulse-slow">
                Get ready for the best Valentine's Day ever!
              </p>
              <p>👇</p>
              <p className="text-xs text-pink-500 mt-2 animate-wiggle">
                Pls screenshot this and sent it to me! 💕✨
              </p>
            </div>

            {/* Confetti Hearts */}
            <div className="flex justify-center gap-1 sm:gap-3 text-2xl sm:text-3xl">
              <span className="animate-bounce">❤️</span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                💕
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                💖
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                💝
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.4s" }}
              >
                💗
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

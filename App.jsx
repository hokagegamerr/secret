import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

const App = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [surpriseEmojis, setSurpriseEmojis] = useState([]);

  // Emoji variety for the floating elements
  const emojis = ["❤️", "💖", "💕", "🌸", "🌹", "✨", "🥰", "😍", "💘", "💝"];

  // Generate floating elements at random positions
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => [
        ...prevHearts,
        {
          id: Date.now(), // Unique ID for each element
          top: `${Math.random() * 90 + 5}%`,
          left: `${Math.random() * 90 + 5}%`,
          emoji: emojis[Math.floor(Math.random() * emojis.length)], // Random emoji
          size: `${Math.random() * 3 + 2}rem`, // Random size
        },
      ]);
    }, 300); // Adjust frequency for more or fewer elements

    // Cleanup elements to avoid memory leaks
    const cleanupHearts = setInterval(() => {
      setHearts((prevHearts) => prevHearts.slice(-50)); // Keep only the last 50 elements
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanupHearts);
    };
  }, []);

  const handleClick = () => {
    setShowWindow(true);
    // Generate surprise emojis when window appears
    setSurpriseEmojis(
      Array.from({ length: 10 }, () => ({
        id: Date.now() + Math.random(),
        top: `${Math.random() * 90 + 5}%`,
        left: `${Math.random() * 90 + 5}%`,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: `${Math.random() * 3 + 2}rem`,
      }))
    );
  };

  const handleCloseWindow = () => {
    setShowWindow(false);
  };

  return (
    <div className="container">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="title"
      >
        To My Love ❤️
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
        className="message"
      >
        You are the best thing that ever happened to me.
      </motion.p>

      {/* Floating Emojis */}
      <div className="floating-container">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="floating-emoji"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0], // Fade in and out
              scale: [0, 1, 0],
              rotate: Math.random() * 360,
              x: `${Math.random() * 100 - 50}%`, // Random horizontal movement
              y: `${Math.random() * 100 - 50}%`, // Random vertical movement
            }}
            transition={{
              duration: Math.random() * 4 + 2, // Random duration
              ease: "easeInOut",
              delay: Math.random() * 2,
              repeat: Infinity, // Loop forever
            }}
            style={{
              top: heart.top,
              left: heart.left,
              fontSize: heart.size,
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </div>

      {/* Surprise Button */}
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "#ff85b3" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5, ease: "easeOut" }}
        className="love-button"
        onClick={handleClick}
      >
        Click for a Surprise
      </motion.button>

      {/* Surprise Window */}
      {showWindow && (
        <motion.div
          className="surprise-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="surprise-window"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
          >
            <motion.h2
              className="surprise-message"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              You are my everything ❤️
            </motion.h2>
            <motion.p
              className="surprise-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Words can't express how much you mean to me and how much I love you. You've been there at my lowest,
              and I cherished every second of it. . You're one of the main reasons why I'm still alive and kicking.
              You're the first person who has ever liked me back, and I will  never take you for granted. You truly mean the world to me; I love you.
            </motion.p>
            <motion.button
              className="close-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCloseWindow}
            >
              Close
            </motion.button>
          </motion.div>

          {/* Surprise Emojis */}
          <div className="surprise-emojis">
            {surpriseEmojis.map((emoji) => (
              <motion.div
                key={emoji.id}
                className="surprise-emoji"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: Math.random() * 360,
                  x: `${Math.random() * 100 - 50}%`,
                  y: `${Math.random() * 100 - 50}%`,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                style={{
                  top: emoji.top,
                  left: emoji.left,
                  fontSize: emoji.size,
                }}
              >
                {emoji.emoji}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default App;

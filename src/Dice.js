import React, { useState, useEffect } from 'react';
import './Dice.css';

const Dice = () => {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  // Generate a random number when component mounts
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDiceValue(randomNumber);
  }, []);

  const rollDice = () => {
    setIsRolling(true);
    setCelebrate(false);
    
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      setDiceValue(randomNumber);
      setIsRolling(false);
      
      // Celebrate if we rolled a 6
      if (randomNumber === 6) {
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 1500);
      }
    }, 1000);
  };

  return (
    <div className="dice-container">
      {/* Decorative elements */}
      <div className="dice-decoration deco-1"></div>
      <div className="dice-decoration deco-2"></div>
      <div className="dice-decoration deco-3"></div>
      <div className="dice-decoration deco-4"></div>
      
      <div className="dice-content">
        <h1>Dice Roller</h1>
        
        <div className="dice-image">
          <img 
            src={`${process.env.PUBLIC_URL}/dice-images/dice${diceValue}.png`} 
            alt={`Dice showing ${diceValue}`}
            className={`${isRolling ? 'rolling' : ''} ${celebrate ? 'celebrate' : ''}`}
          />
        </div>
        
        <button 
          onClick={rollDice} 
          disabled={isRolling}
          className="roll-button"
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
        
        {isRolling && (
          <div className="rolling-text">
            <p>Dice is rolling...</p>
          </div>
        )}
        
        {!isRolling && (
          <div className="result-text">
            <p>You rolled: {diceValue}{diceValue === 6 ? '! 🎉' : ''}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dice;
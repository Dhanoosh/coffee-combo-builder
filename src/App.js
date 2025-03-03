// src/App.js
import React, { useState } from 'react';
import drinksData from './data/drinks.json';
import './App.css';

function App() {
  // Main states
  const [temperature, setTemperature] = useState('hot'); // 'hot' or 'iced'
  const [selectedDrink, setSelectedDrink] = useState(null);
  
  // Customization states for the selected drink
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMilk, setSelectedMilk] = useState('');
  const [selectedEspresso, setSelectedEspresso] = useState('');
  const [selectedSyrup, setSelectedSyrup] = useState('');
  const [selectedExtra, setSelectedExtra] = useState('');
  
  // View toggle: main customization vs. final summary page
  const [showFinal, setShowFinal] = useState(false);

  // Array of uplifting quotes
  const quotes = [
    "Today is a great day to have a great day!",
    "Sip, smile, and conquer the day!",
    "Coffee: because life happens.",
    "Wake up and smell the coffee!",
    "May your coffee be strong and your day be sweet."
  ];

  // Get a random quote
  const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

  // Filter drinks based on temperature selection
  const filteredDrinks = drinksData.drinks.filter(drink => {
    if (temperature === 'hot' && drink.category === 'Hot Coffee') return true;
    if (temperature === 'iced' && drink.category === 'Iced Coffee') return true;
    return false;
  });

  // Reset customization selections when a new drink is selected
  const initializeCustomizations = (drink, commonKey) => {
    setSelectedSize(drink.sizes[0]);
    const commonOptions = drinksData.globalOptions[commonKey];
    setSelectedMilk(commonOptions.milkOptions[0]);
    setSelectedEspresso(commonOptions.espressoOptions[0]);
    setSelectedSyrup(commonOptions.syrupOptions[0]);
    setSelectedExtra(commonOptions.extras[0]);
  };

  // When a drink is selected manually
  const handleDrinkSelect = (drink) => {
    setSelectedDrink(drink);
    initializeCustomizations(drink, drink.commonOptions);
  };

  // Surprise Me functionality: uses the current temperature
  const handleSurpriseMe = () => {
    // Use the already-selected temperature (default is hot)
    const drinksForTemp = drinksData.drinks.filter(drink => {
      if (temperature === 'hot' && drink.category === 'Hot Coffee') return true;
      if (temperature === 'iced' && drink.category === 'Iced Coffee') return true;
      return false;
    });
    const randomDrink = drinksForTemp[Math.floor(Math.random() * drinksForTemp.length)];
    setSelectedDrink(randomDrink);
    // Initialize customizations randomly based on current temperature
    const randomSize = randomDrink.sizes[Math.floor(Math.random() * randomDrink.sizes.length)];
    setSelectedSize(randomSize);
    const commonOptions = drinksData.globalOptions[randomDrink.commonOptions];
    const randomMilk = commonOptions.milkOptions[Math.floor(Math.random() * commonOptions.milkOptions.length)];
    const randomEspresso = commonOptions.espressoOptions[Math.floor(Math.random() * commonOptions.espressoOptions.length)];
    const randomSyrup = commonOptions.syrupOptions[Math.floor(Math.random() * commonOptions.syrupOptions.length)];
    const randomExtra = commonOptions.extras[Math.floor(Math.random() * commonOptions.extras.length)];
    setSelectedMilk(randomMilk);
    setSelectedEspresso(randomEspresso);
    setSelectedSyrup(randomSyrup);
    setSelectedExtra(randomExtra);
    
    // Directly show the final view
    setShowFinal(true);
  };

  // Finalize customization manually
  const handleFinalize = () => {
    setShowFinal(true);
  };

  // Handle going back from final view to main customization page
  const handleGoBack = () => {
    setShowFinal(false);
  };

  // Render the customization panel for a selected drink
  const renderCustomizationPanel = () => {
    if (!selectedDrink) return null;
    const commonOptions = drinksData.globalOptions[selectedDrink.commonOptions];

    return (
      <div className="customization-panel">
        <h2>Customize Your {selectedDrink.name}</h2>
        {/* Size Options */}
        <div>
          <strong>Size:</strong>
          <div className="customization-options">
            {selectedDrink.sizes.map((size) => (
              <div
                key={size}
                className={`customization-option ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Milk Options */}
        <div>
          <strong>Milk:</strong>
          <div className="customization-options">
            {commonOptions.milkOptions.map((milk) => (
              <div
                key={milk}
                className={`customization-option ${selectedMilk === milk ? 'active' : ''}`}
                onClick={() => setSelectedMilk(milk)}
              >
                {milk}
              </div>
            ))}
          </div>
        </div>

        {/* Espresso Options */}
        <div>
          <strong>Espresso:</strong>
          <div className="customization-options">
            {commonOptions.espressoOptions.map((espresso) => (
              <div
                key={espresso}
                className={`customization-option ${selectedEspresso === espresso ? 'active' : ''}`}
                onClick={() => setSelectedEspresso(espresso)}
              >
                {espresso}
              </div>
            ))}
          </div>
        </div>

        {/* Syrup Options */}
        <div>
          <strong>Syrup:</strong>
          <div className="customization-options">
            {commonOptions.syrupOptions.map((syrup) => (
              <div
                key={syrup}
                className={`customization-option ${selectedSyrup === syrup ? 'active' : ''}`}
                onClick={() => setSelectedSyrup(syrup)}
              >
                {syrup}
              </div>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div>
          <strong>Extras:</strong>
          <div className="customization-options">
            {commonOptions.extras.map((extra) => (
              <div
                key={extra}
                className={`customization-option ${selectedExtra === extra ? 'active' : ''}`}
                onClick={() => setSelectedExtra(extra)}
              >
                {extra}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button className="hand-drawn-button" onClick={handleFinalize}>
            Finalize Combo
          </button>
        </div>
      </div>
    );
  };

  // Main view: temperature, drink selection, customization panel
  const renderMainView = () => (
    <>
      {/* Top row: Temperature selector & Surprise Me */}
      <div className="top-row">
        <div>
          <button
            className={`hand-drawn-button ${temperature === 'hot' ? 'active' : ''}`}
            onClick={() => {
              setTemperature('hot');
              setSelectedDrink(null);
            }}
          >
            Hot
          </button>
          <button
            className={`hand-drawn-button ${temperature === 'iced' ? 'active' : ''}`}
            onClick={() => {
              setTemperature('iced');
              setSelectedDrink(null);
            }}
          >
            Cold
          </button>
        </div>
        <div>
          <button className="hand-drawn-button" onClick={handleSurpriseMe}>
            Surprise Me!
          </button>
        </div>
      </div>

      {/* Drink Type Selector */}
      <div className="drink-type-selector">
        <h2>Select a Drink Type</h2>
        <div className="drink-list">
          {filteredDrinks.map(drink => (
            <div
              key={drink.id}
              className={`drink-card ${selectedDrink && selectedDrink.id === drink.id ? 'active' : ''}`}
              onClick={() => handleDrinkSelect(drink)}
            >
              <img
                src={`assets/${drink.id}.png`}
                alt={drink.name}
                className="drink-icon"
              />
              <h3>{drink.name}</h3>
              <p>{drink.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customization Panel */}
      {selectedDrink && !showFinal && renderCustomizationPanel()}
    </>
  );

  // Final view: summary for barista with base drink icon and an uplifting quote
  const renderFinalView = () => (
    <div className="final-view">
      <h1>Coffee Combo</h1>
      <div className="final-view-container">
        <div className="final-view-details">
          <h2>{selectedDrink ? selectedDrink.name : ''}</h2>
          <p><strong>Temperature:</strong> {temperature === 'hot' ? 'Hot' : 'Cold'}</p>
          <p><strong>Size:</strong> {selectedSize}</p>
          <p><strong>Milk:</strong> {selectedMilk}</p>
          <p><strong>Espresso:</strong> {selectedEspresso}</p>
          <p><strong>Syrup:</strong> {selectedSyrup}</p>
          <p><strong>Extras:</strong> {selectedExtra}</p>
        </div>
        <div>
          <img
            src={`assets/${selectedDrink.id}.png`}
            alt={selectedDrink.name}
            className="final-drink-icon"
          />
        </div>
      </div>
      <div className="quote">{getRandomQuote()}</div>
      <div style={{ marginTop: '20px' }}>
        <button className="hand-drawn-button" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="App">
      <header className="header">
        <h1>Coffee Combo Recommender</h1>
        <p>Discover your perfect coffee combo!</p>
      </header>
      
      {showFinal ? renderFinalView() : renderMainView()}

      {/* Footer with attribution links */}
      <footer className="footer">
        <p>
          <a href="https://www.flaticon.com/free-icons/mocha" title="mocha icons">
            Mocha icons created by Smashicons - Flaticon
          </a>
          {" | "}
          <a href="https://www.flaticon.com/free-icons/latte-art" title="latte art icons">
            Latte art icons created by nangicon - Flaticon
          </a>
          {" | "}
          <a href="https://www.flaticon.com/free-icons/cappucino" title="cappucino icons">
            Cappucino icons created by khulqi Rosyid - Flaticon
          </a>
          {" | "}
          <a href="https://www.flaticon.com/free-icons/hot-americano" title="hot americano icons">
            Hot americano icons created by nangicon - Flaticon
          </a>
          {" | "}
          <a href="https://www.flaticon.com/free-icons/cold-coffee" title="cold coffee icons">
            Cold coffee icons created by ICs Icons - Flaticon
          </a>
          {" | "}
          <a href="https://www.flaticon.com/free-icons/iced-latte" title="iced latte icons">
            Iced latte icons created by Freepik - Flaticon
          </a>
          {" | "}
          <a href="https://www.flaticon.com/free-icons/milkshake" title="milkshake icons">
            Milkshake icons created by Superarticons - Flaticon
          </a>
          {" | "}
          <a href="https://www.flaticon.com/free-icons/builder" title="builder icons">
            Builder icons created by Roundicons Premium - Flaticon
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

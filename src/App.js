import './App.css';
import { useState } from 'react';
import Timer from './Headers/Timer';
import Reset from './Headers/Reset';
import Game from './Game/Game';
import { GameContext, TimerContext } from './context';

const App = () => {

  const [gameState, setGameState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currTime, setCurrTime] = useState(120);
  const [lastTimer, setLastTimer] = useState(Date.now());
  const [timer, setTimer] = useState(null);

  return (
    <GameContext.Provider value={{ gameState, setGameState, isLoading, setIsLoading }}>
      <header>
        <TimerContext.Provider value={{ currTime, setCurrTime, lastTimer, setLastTimer, timer, setTimer }}>
          <Timer />
          <Reset />
        </TimerContext.Provider>
      </header>
      <Game gameName='memory-game' />
    </GameContext.Provider>
  );
}

export default App;

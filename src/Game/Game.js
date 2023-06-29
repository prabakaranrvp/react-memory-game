import { useContext } from 'react';
import MemoryGame from './MemoryGame';
import { GameContext } from '../context';

const GAME_MAP = {
  'memory-game': MemoryGame
}

const Game = ({ gameName }) => {
  const CurrGame = GAME_MAP[gameName];
  const { gameState } = useContext(GameContext);

  return (
    <div className="game-parent-container">
      <CurrGame />
      {gameState === true && (<h1 className='game-msg'>🏆 Game Won 🏆</h1>)}
      {gameState === false && (<h1 className='game-msg'>😢 Game Over 😢</h1>)}
    </div>
  )
}

export default Game;
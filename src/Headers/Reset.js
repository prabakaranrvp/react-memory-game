import { useContext, useState } from "react";
import { GameContext, TimerContext } from '../context';

const Reset = () => {

  const [isResetting, setIsResetting] = useState(false);

  const { setIsLoading, setGameState } = useContext(GameContext);
  const { setCurrTime, setLastTimer, timer } = useContext(TimerContext);

  const resetGame = () => {
    setIsResetting(true);
    setIsLoading(true);
    setLastTimer(Date.now());
    setGameState(null);
    timer && clearTimeout(timer);
    setCurrTime(120 + Math.random());
    setTimeout(() => setIsResetting(false), 300);
  }

  return (
    <button onClick={resetGame} disabled={isResetting}>Reset</button>
  )

}

export default Reset;

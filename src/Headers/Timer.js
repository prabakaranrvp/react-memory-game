import { useContext, useEffect, useCallback } from "react";
import { GameContext, TimerContext } from '../context';

const Timer = () => {

  const { gameState, setGameState } = useContext(GameContext);
  const { currTime, setCurrTime, lastTimer, setLastTimer, setTimer } = useContext(TimerContext);

  const updateTimer = useCallback(() => {
    let timer = setTimeout(() => {
      if(gameState !== null) return;
      const newCurrTime = currTime - ((Date.now() - lastTimer)/1000);
      setLastTimer(Date.now());
      
      newCurrTime >=0 && setCurrTime(newCurrTime);
      newCurrTime <=1 && setGameState(false);
    }, 900);
    setTimer(timer);
  },[currTime, gameState, lastTimer, setCurrTime, setGameState, setLastTimer, setTimer]);


  useEffect(() => {
    if(currTime > 0) {
      updateTimer();
    } 
    else {
      setGameState(false);
    }
  }, [currTime, setGameState, updateTimer]);

  return (
    <>{Math.floor(currTime,0)}</>
  )

}

export default Timer;

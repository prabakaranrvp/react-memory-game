import { useState, useContext, useEffect } from 'react';
import MOCK from './Mock';
import { blankCard } from './images/index';
import { GameContext } from '../context';


const MemoryGame = () => {

  const initializedCards = MOCK.map((card) => ({...card, isFlipped: false}));

  const [cards, setCards] = useState([...initializedCards].sort(() => Math.random() - 0.5));

  const [flipState, setFlipState] = useState({
    lastFlippedCard: null,
    isFlipping: false,
    flipTimer: null
  });
  const { isFlipping, flipTimer, lastFlippedCard } = flipState;
  const { gameState, setGameState, isLoading, setIsLoading } = useContext(GameContext);

  const shouldStayFlipped = (card) => flipState.lastFlippedCard.name === card.name;

  const flipCard = (card) => {  
    if(gameState !== null) return;


    flipTimer && clearTimeout(flipTimer);
    isFlipping && flipBack(true);
    setCards(prevState => {
      const dupCards = [...prevState];
      dupCards.find((_card) => _card.id === card.id).isFlipped = true;
      return dupCards;
    })

    if(lastFlippedCard === null) {
      setFlipState(prevState => ({
        ...prevState,
        lastFlippedCard: card
      }));
    } else {
      updateGameState(card);
    }
  }


  const updateGameState = (card) => {
    setFlipState(prevState => ({
      ...prevState,
      lastFlippedCard: null
    }));

    (!shouldStayFlipped(card)) && updateFlipBackCards(card);
  }

  const updateFlipBackCards = (card) => {
    const filterIds = [card.id, lastFlippedCard.id];
    
    setFlipState(prevState => ({
      ...prevState,
      isFlipping: true
    }));
    setCards(prevState => {
      return prevState.map((_card) => ({..._card, shouldFlipBack: filterIds.includes(_card.id)}));
    });
  }

  const flipBack = (shouldReturnInsteadOfSetting = false) => {
    if(isFlipping === false) return;
    
    setFlipState(prevState => ({
      ...prevState,
      isFlipping: false
    }));
    
    setCards(prevState => {
      let flippedCards = [...prevState];
      flippedCards.forEach((_card) => {
        if(_card.shouldFlipBack) {
          _card.shouldFlipBack = false;
          _card.isFlipped = false;
        }
      });
      return flippedCards;
    });
  }

  useEffect(() => {
    if(isFlipping) {
      const _timer = setTimeout(() => {
        flipBack()
      }, 600);
      
      setFlipState(prevState => ({
      ...prevState,
      flipTimer: _timer
    }));
    }
  }, [isFlipping])

  useEffect(() => {
    if(isLoading === true) {
      setCards([...initializedCards].sort(() => Math.random() - 0.5));
      
      setFlipState({
        flipTimer: null,
        lastFlippedCard: null,
        isFlipping: false
      });
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading])

  useEffect(() => {
    (!cards.find((_card) => !_card.isFlipped)) && setGameState(true);
  }, [cards])

  return (
    <div className="game-container">
      {cards.map((card, index) => {
        if(card.isFlipped) {
          return (
            <div className="card" key={`${index}-div`}>
              <img src={card.pic} alt="card" />
            </div>
          )
        }
        else {
          return (
            <button className="card" key={index} onClick={() => flipCard(card)}>
              <img src={blankCard} alt="card" />
            </button>
          )
        }
        
      })}
    </div>
  )
}

export default MemoryGame;

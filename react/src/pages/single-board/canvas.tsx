import React, { useState, useEffect } from 'react';
import {Card} from '../../app/fetch-data/apiSlice';
import './canvas.css';


const CanvasComponent = (props:any) => {
  const [draggingCard, setDraggingCard] = useState(null);
  // const [cards, setCards] = useState([
  //   { id: 1, x: 50, y: 50 },
  //   { id: 2, x: 150, y: 150 },
  //   { id: 3, x: 250, y: 250 },
  // ]);
  const [activeObject, setActiveObject] = useState<{objectID: number}>({
    objectID: -1
  })

  const handleMouseDown = (e: React.MouseEvent, id:number) => {
    //setDraggingCard(id);
  };

  const handleMouseUp = () => {
    setDraggingCard(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // if (draggingCard !== null) {
    //   const newCards = cards.map((card) =>
    //     card.id === draggingCard
    //       ? { ...card, x: e.clientX - 50, y: e.clientY - 50 }
    //       : card
    //   );
    //   setCards(newCards);
    //}
  };

  const handleClickCard = (e: React.MouseEvent, card:Card) => {
    console.log(e);
    setActiveObject({objectID: card.cardID});
  }

  useEffect(() => {
     
  }, [activeObject]);

  return (
    <svg className='svg-canvas'
      width="1000"
      height="600"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      //onMouseDown={handleMouseDown}
    >
      {props.cardList.map((card:Card) => (
        <rect
          key={card.cardID}
          x={card.squaresTop * 14}
          y={card.squaresLeft * 14}
          width="100"
          height="100"
          fill="blue"
          onClick={(e) => handleClickCard(e, card)}
          //onMouseDown={(e) => handleMouseDown(e, props.cardList.cardID)}
        />
      ))}
    </svg>
  );
};

export default CanvasComponent;

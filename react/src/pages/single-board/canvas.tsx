import React, { useState, useEffect } from 'react';
import {Card} from '../../app/fetch-data/apiSlice';
import './canvas.css';

interface canvasProps {
cardList: Card[]
}

const CanvasComponent = (props: canvasProps) => {
  const [draggingCard, setDraggingCard] = useState(null);
  const [cards, setCards] = useState(
    props.cardList
  );

  // currently only the active card who is to move is tracked here, later also the arrows.
  // in each case only one object, whether card or arrow, can be active.
  const [activeObject, setActiveObject] = useState<{objectID: number, x: number, y:number}>({
    objectID: -1,
    x: -1,
    y: -1
  })


  //const handleMouseMove = (e: React.MouseEvent) => {
    // if (draggingCard !== null) {
    //   const newCards = cards.map((card) =>
    //     card.id === draggingCard
    //       ? { ...card, x: e.clientX - 50, y: e.clientY - 50 }
    //       : card
    //   );
    //   setCards(newCards);
    //}
  //};

  const handleClickCard = (e: React.MouseEvent, card:Card) => {
    console.log(e);
    setActiveObject({objectID: card.cardID, x: card.squaresTop * 14, y: card.squaresLeft * 14});

  }

  const handleClickEmpty = () => {
    console.log("clicked in empty space");
    setActiveObject({objectID: -1, x: -1, y: -1});

  }

  const handleDownCard = () => {
    console.log("now Card should drag")
  }
  const handleUpCard = () => {
    console.log("now drag should leave")
  }
  
  // useEffect(() => {
  // }, [activeObject]);

  return (
    <svg className='svg-canvas'
      width="1000"
      height="600"
    >
      <rect
      //element shall have the same size as the svg-element to catch clicks in empty space
          width="1000"
          height="600"
          fill="white"
          fillOpacity={0.5}
          onClick={(e) => handleClickEmpty()}
        />
      {cards.map((card:Card) => (
        <rect
          key={card.cardID}
          x={card.squaresTop * 14}
          y={card.squaresLeft * 14}
          width="100"
          height="100"
          fill="blue"
          onClick={(e) => handleClickCard(e, card)}
          onMouseDown={(e) => handleDownCard()}
          onMouseUp={(e) => handleUpCard()}
        />
      ))}
      {activeObject.objectID !== -1 && (
        <>
          <circle cx={activeObject.x} cy={activeObject.y} r="4" stroke="black" strokeWidth="1" fill="white" />
          <circle cx={activeObject.x + 100} cy={activeObject.y} r="4" stroke="black" strokeWidth="1" fill="white" />
          <circle cx={activeObject.x} cy={activeObject.y + 100} r="4" stroke="black" strokeWidth="1" fill="white" />
          <circle cx={activeObject.x + 100} cy={activeObject.y + 100} r="4" stroke="black" strokeWidth="1" fill="white" />
        </>
    )}
      </svg>
  );
};

export default CanvasComponent;

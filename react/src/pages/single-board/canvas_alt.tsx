import React, { useState, useEffect } from 'react';
import { Card } from '../../app/fetch-data/apiSlice';
import './canvas.css';

interface canvasProps {
  cardList: Card[]
}

interface activeObject {
  objectID: number;
  x: number;
  y: number;
}
interface CardWithOffsets extends Card {
  xOffset: number;
  yOffset: number;
}


const CanvasComponent = (props: canvasProps) => {

  const [cardsWithOffsets, setCardsWithOffsets] = useState<CardWithOffsets[]>(
    props.cardList.map(card => ({
      ...card,
      xOffset: -1, // Initialwert für xOffset
      yOffset: -1, // Initialwert für yOffset
    }))
  );

  const [cards, setCards] = useState({
    cardList: props.cardList
  });

  // currently only the active card who is to move is tracked here, later also the arrows.
  // in each case only one object, whether card or arrow, can be active.
  const [activeObject, setActiveObject] = useState<activeObject>({
    objectID: -1,
    x: -1,
    y: -1,
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

  const handleClickCard = (e: React.MouseEvent, card: Card) => {
    console.log(e);
    setActiveObject({ objectID: card.cardID, x: card.x, y: card.x});

  }

  const handleClickEmpty = () => {
    console.log("clicked in empty space");
    setActiveObject({ objectID: -1, x: -1, y: -1 });

  }

  const handleDownCard = (e: React.PointerEvent<SVGElement>, cardID1: number) => {
    console.log("e:",e, "cardID:", cardID1)
    if (activeObject.objectID == cardID1) {
      console.log("now Card should drag")
      //CardWithOffset is the type of newCard
      let newCardWithOffset = cardsWithOffsets.map(function (card, index2): CardWithOffsets {
         
        if (card.cardID === cardID1) {
          const el = e.currentTarget;
          const bbox = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - bbox.left;
          const y = e.clientY - bbox.top;
          el.setPointerCapture(e.pointerId);
          return { ...card, xOffset: x, yOffset: y };
        }
        return card
      });
  
      setCardsWithOffsets(newCardWithOffset);

    }
  }

  const handleMoveCard = (e: React.PointerEvent<SVGElement>, cardID1: number) => {
    if (activeObject.objectID === cardID1) {
      console.log("now Card should move")
      let newCardWithOffset = cardsWithOffsets.map(function (card, index2): CardWithOffsets {
        if (card.cardID === cardID1 ) {
          const bbox = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - bbox.left;
          const y = e.clientY - bbox.top;
  
          return {
            ...card,
            x: card.x - (card.xOffset - x),
            y: card.y - (card.yOffset - y),
          };
        }
        return card;
      });

      setCardsWithOffsets(newCardWithOffset);

    }
  }

  const handleUpCard = (e: React.PointerEvent<SVGElement>, cardID1: number) => {
    if (activeObject.objectID !== -1) {
      console.log("now drag should leave")
    }

  }


  // useEffect(() => {
  // }, [activeObject]);

  return (
    <svg className='svg-canvas'
    // width="1000"
    // height="600"
    >
      <rect
        //element shall have the same size as the svg-element to catch clicks in empty space
        className="svg-canvas-rect"


        fill="white"
        fillOpacity={0.5}
        onClick={(e) => handleClickEmpty()}
      />
      {props.cardList.map((card: Card) => (
        <rect
          key={card.cardID}
          x={card.x}
          y={card.y}
          width="100"
          height="100"
          fill="blue"
          onClick={(e) => handleClickCard(e, card)}
          onPointerDown={(e) => handleDownCard(e, card.cardID)}
          onPointerUp={(e) => handleUpCard(e, card.cardID)}
          onPointerMove={(e) => handleMoveCard(e, card.cardID)}
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

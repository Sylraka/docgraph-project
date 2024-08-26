import React, { useState } from 'react';
import { Card } from '../../app/fetch-data/apiSlice';

import './canvas.css';

interface canvasProps {
    cardList: Card[]
  }

interface DragElement{ 
  x: number;
  y: number;
  active : boolean;
  xOffset: number;
  yOffset: number;
}

// interface chosenObject {
//   objectID: number;
//   x: number;
//   y: number;
// }

export default function CanvasComponent (props:canvasProps) {
  const [elements, setElements] = useState<DragElement[]>(
    props.cardList.map(card => ({
        ...card,
        active:false,
        xOffset: -1, // Initialwert für xOffset
        yOffset: -1, // Initialwert für yOffset
      }))
  );



  function handlePointerDown(index1: number, e: React.PointerEvent<SVGElement>) {
    let newElements = elements.map(function (item, index2): DragElement {
        console.log("index1:",index1)
      if (index1 === index2) {
        const el = e.currentTarget;
        const bbox = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;
        el.setPointerCapture(e.pointerId);
        return { ...item, xOffset: x, yOffset: y, active: true };
      }
      return item
    });

    setElements(newElements);
  }

  function handlePointerMove(index1: number, e: React.PointerEvent<SVGElement>) {
    let newElements = elements.map(function (item, index2): DragElement {
      if (index1 === index2 && item.active === true) {
        const bbox = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;

        return {
          ...item,
          x: item.x - (item.xOffset - x),
          y: item.y - (item.yOffset - y),
        };
      }
      return item;
    });
    setElements(newElements);
  }

  function handlePointerUp(index1: number, e: React.PointerEvent<SVGElement>) {
    let newElements = elements.map(function (item, index2): DragElement {
      if (index1 === index2) {
        return { ...item, active: false };
      }
      return item;
    });

    setElements(newElements);
  }

  const rectElements = elements.map(function (item, index) {
    return (
      <rect
        key={index.toString()}
        x={item.x}
        y={item.y}
        fill="yellow"
        stroke="blue"
        width={100}
        height={200}
        onPointerDown={(event) => handlePointerDown(index, event)}
        onPointerUp={(event) => handlePointerUp(index, event)}
        onPointerMove={(event) => handlePointerMove(index, event)}
      />
    );
  });

  return (
    <svg className='svg-canvas'
    > 
      {rectElements}
    </svg>
  );
}
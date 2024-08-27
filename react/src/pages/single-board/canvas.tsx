//dragNdrop svg: https://gist.github.com/hashrock/0e8f10d9a233127c5e33b09ca6883ff4

import React, { useState } from 'react';
import { Card } from '../../app/fetch-data/apiSlice';

import './canvas.css';

interface canvasProps {
  cardList: Card[]
}

//the attributes we need to drag plus the card attributes
interface DragElement {
  x: number;
  y: number;
  active: boolean;
  xOffset: number;
  yOffset: number;
  canvasNumber: number;
  cardID: number;
  width: number;
  height: number;
  text: string;
  math: object;
}

//TODO show active element
// interface chosenObject {
//   objectID: number;
//   x: number;
//   y: number;
// }

export default function CanvasComponent(props: canvasProps) {
  const [elements, setElements] = useState<DragElement[]>(
    // the attributes the cards didnt have
    props.cardList.map(card => ({
      ...card,
      active: false,
      xOffset: -1, // Initialwert für xOffset
      yOffset: -1, // Initialwert für yOffset
    }))
  );



  function handlePointerDown(index1: number, e: React.PointerEvent<SVGElement>) {
    let newElements = elements.map(function (item, index2): DragElement {
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
      console.log("item: ", item)
      if (index1 === index2) {
        return { ...item, active: false, xOffset: -1, yOffset: -1 };
      }
      return item;
    });

    setElements(newElements);
  }

  const rectElements = elements.map(function (item, index) {
    return (
      <>
        <g>
          <rect
            key={index.toString()}
            x={item.x}
            y={item.y}
            fill="#555555"
            stroke="white"
            rx="10"
            width={item.width + 30}
            height={item.height + 30}
            onPointerDown={(event) => handlePointerDown(index, event)}
            onPointerUp={(event) => handlePointerUp(index, event)}
            onPointerMove={(event) => handlePointerMove(index, event)}
          />
          <rect
            x={item.x + 15}
            y={item.y + 15}
            width={item.width}
            height={item.height}
            fill="white"
            rx="6"
          />
          {/* <text
            x={item.x + 30}
            y={item.y + 30}
            width={item.width}
            className="small"
          >
            {item.text}
          </text> */}
        </g>
      </>
    );
  });

  const textElements = elements.map(function (item, index) {
    return (
      <p
      key={index.toString()}
      className='text-element'
      style={{'top': item.y, 'left': item.x, 'width': item.width - 10, 'height':item.height - 40}}
      >
        {item.text}
      </p>

    )});

  return (
    <>
      <svg className='svg-canvas'
      >
        {rectElements}
      </svg>
      {textElements}
    </>
  );
}
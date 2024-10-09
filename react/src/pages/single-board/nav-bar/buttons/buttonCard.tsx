import { /*useState,*/ useEffect } from "react";

import { useDrag, DragPreviewImage } from "react-dnd";
import { ItemTypes } from "../../../../dragConstants";

import cardPreviewImg from "./../../../../images/newCardPreview.png";

import cardImg from "./../../../../images/card.svg"
import './buttons.css'


export const ButtonCard = () => {



  const handleButton = () => {
    console.log("you clicked buttonCard!")
  }
  
//useDragHook
  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: ItemTypes.NEWCARD, //drop targets react to this type
    //item: { }, // information the drop targets have
    collect: (monitor) => ({
      //pick up informations from the monitor object and inject them in this dragging source (usedrag)
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {

  }, [isDragging]);


  return (
    <>
    <DragPreviewImage connect={preview} src={cardPreviewImg} />

    <div 
    ref={dragRef}  
    className="sidebar-button" 
    onClick={handleButton} 
    >
      <img className="sidebar-button-img" alt="new card" src={cardImg} />
      
    </div>
    </>
  );
}



import { /*useState,*/ useEffect } from "react";

import { useDrag, DragPreviewImage } from "react-dnd";
import { ItemTypes } from "../dragConstants";

import cardPreviewImg from "../images/newCardMathPreview.png";

import cardImg from "../images/newCardMath.png"
import './buttons.css'


export const ButtonCardMath = () => {



  const handleButton = () => {
    console.log("you clicked new math card!")
  }
  
//useDragHook
  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: ItemTypes.NEWCARDMATH, //drop targets react to this type
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



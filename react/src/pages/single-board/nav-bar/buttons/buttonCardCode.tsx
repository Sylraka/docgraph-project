import { /*useState,*/ useEffect } from "react";

import { useDrag, DragPreviewImage } from "react-dnd";
import { ItemTypes } from "../../../../dragConstants";

import cardPreviewImg from "./../../../../images/newCardCodePreview.png";

import cardImg from "./../../../../images/newCardCode.png"
import './buttons.css'


export const ButtonCardCode = () => {



  const handleButton = () => {
    console.log("you clicked buttonCard Code!")
  }
  
//useDragHook
  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: ItemTypes.NEWCARDCODE, //drop targets react to this type
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
      <img className="sidebar-button-img" alt="new code card" src={cardImg} />
      
    </div>
    </>
  );
}



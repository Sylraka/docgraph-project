import { /*useState,*/ useEffect } from "react";

import { useDrag, DragPreviewImage } from "react-dnd";
import { ItemTypes } from "../dragConstants";

import arrowPreviewImg from "../images/newArrowPreview.png";

import arrowImg from "../images/arrow_01.svg"
import './buttons.css'


export const ButtonArrow = () => {



  const handleButton = () => {
    console.log("you clicked buttonArrow!")
  }
  
//useDragHook
  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: ItemTypes.NEWARROW, //drop targets react to this type
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
    <DragPreviewImage connect={preview} src={arrowPreviewImg} />

    <div 
    ref={dragRef}  
    className="sidebar-button" 
    onClick={handleButton} 
    >
      <img className="sidebar-button-img" alt="new card" src={arrowImg} />
      
    </div>
    </>
  );
}



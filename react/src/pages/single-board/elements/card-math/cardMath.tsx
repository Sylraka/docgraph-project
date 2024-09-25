import { useState, useRef, useEffect } from "react";
import { MathJax } from "better-react-mathjax";


import { useAppDispatch, useAppSelector } from "./../../../../app/hooks"
import { Card } from '../../../../app/fetch-data/dataTypes';
import { setCardInside, } from "./../../singleBoardSlice"

import "../card.css"

interface mathProps {
    card: Card;
}

const CardTextMath = (props: mathProps) => {
    const activeDragValue = useAppSelector((state) => state.drag)
    const dispatch = useAppDispatch()

    const [element, setElement] = useState<Card>({
        ...props.card,
        x: props.card.x + 60
    });

    //update width and height of a card (cardFocus is moving)
    useEffect(() => {
        if (activeDragValue.elementType === "card") {
            setTextPosition();
        }


        if (activeDragValue.elementType === "cardAnchorBottomRight" && activeDragValue.ID == element.cardID) {
            setElement(prevElement => ({
                ...prevElement,
                width: Math.max(prevElement.width + activeDragValue.width, 30),
                height: Math.max(prevElement.height + activeDragValue.height, 30)
            }))

        } else if (activeDragValue.elementType === "cardAnchorBottomLeft" && activeDragValue.ID == element.cardID) {
            setElement(prevElement => ({
                ...prevElement,
                x: prevElement.x + activeDragValue.width,
                width: Math.max(prevElement.width - activeDragValue.width, 30),
                height: Math.max(prevElement.height + activeDragValue.height, 30)
            }))

        } else if (activeDragValue.elementType === "cardAnchorTopRight" && activeDragValue.ID == element.cardID) {
            setElement(prevElement => ({
                ...prevElement,
                y: prevElement.y + activeDragValue.height,
                width: Math.max(prevElement.width + activeDragValue.width, 30),
                height: Math.max(prevElement.height - activeDragValue.height, 30)
            }))

        } else if (activeDragValue.elementType === "cardAnchorTopLeft" && activeDragValue.ID == element.cardID) {
            setElement(prevElement => ({
                ...prevElement,
                y: prevElement.y + activeDragValue.height,
                x: prevElement.x + activeDragValue.width,
                width: Math.max(prevElement.width - activeDragValue.width, 30),
                height: Math.max(prevElement.height - activeDragValue.height, 30)
            }))

        }

    }, [activeDragValue]);


    const setTextPosition = () => {

        if (activeDragValue.ID === props.card.cardID && activeDragValue.elementType === "card") {
            setElement((prevElement) => ({
                ...prevElement,
                x: activeDragValue.placeToLeftX + 60,
                y: activeDragValue.placeToTopY
            }))
        }
    }


    const manageTextInput = (value: string, fieldId: string) => {
        let newCard: Card;
        // let element = document.getElementById(fieldId) ;
        newCard = {
            ...props.card,
            text: value,
        }
        dispatch(setCardInside(newCard));
        setElement(prevElement => ({
            ...prevElement,
            text: value
        }))
    }
    //let mathString = "\\int_0^1 x^2\\ dx";
    //const [mathString, setMathString] = useState(props.cardTextInfos.mathText);


    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);

    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };



    return (
        <>{/* input fields have to be in one start/closing tag */}
            <div
                style={{ 'top': element.y, 'left': element.x, 'width': element.width - 10, 'height': element.height - 10 }}
                className="text-element">
                {isHovering && <span className="tooltiptext">
                    \\\int_0^1 für sum <br />
                    x^2 für exponent <br />
                    \sqrt{"{}"} für wurzel <br />
                    \overrightarrow{"x"} <br />
                    \frac{"{Zähler}{Nenner}"}
                </span>}
                <textarea
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    id={"mathID" + props.card.cardID}
                    className="card-math-input no-cursor strong tooltip"
                    defaultValue={props.card.text}
                    onChange={(event) => manageTextInput(event.target.value, "mathID" + props.card.cardID)}
                    // onInput={() => manageTextInput("mathID" + props.card.cardID)}
                    spellCheck="false"
                ></textarea>
                <div className="mathOutput">
                    <MathJax
                        hideUntilTypeset={"first"}
                        inline
                        dynamic>
                        {`$$${element.text}$$`}{/* $$ are needed for interpretation in math */}
                    </MathJax>
                </div>
            </div>
        </>
    )





}

export default CardTextMath
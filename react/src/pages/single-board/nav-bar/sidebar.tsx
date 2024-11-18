
import "./sidebar.scss"

import { ButtonArrow } from "./buttons/buttonArrow"
import { ButtonCard } from "./buttons/buttonCard"
import { ButtonCardMath } from "./buttons/buttonCardMath"
import { ButtonCardCode } from "./buttons/buttonCardCode"

export const Sidebar = () => {





    return (
        <div className="sidebar">
            <ButtonArrow />
            <ButtonCard />
            <ButtonCardMath />
            <ButtonCardCode />
        </div>
    )
}
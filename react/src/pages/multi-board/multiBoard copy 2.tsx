import { useEffect, useState, useRef } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setNavigationToMultiBoard } from "./../slices/navigationSlice"

//for insert new elements
import { useDrop } from "react-dnd";
import { ItemTypes } from '../../dragConstants';
import { createNewArrow, multiBoardArrowState } from "../../app/fetch-data/multiBoardArrowSlice"
import { boardsApiState, createNewBoard } from "../../app/fetch-data/allBoardsSlice"
import { newMultiBoardArrowData } from "../../app/newElementData"
import { newBoardData } from "../../app/newBoardData"

import { Sidebar } from "./nav-bar/multiSidebar";

import { BoardMiniature } from "./elements/boardMiniature";
import BoardMiniatureText from "./elements/boardMiniatureText"
import "./multiBoard.css"

import { ArrowComponent } from "./elements/multiBoardArrow"
import { fetchAllArrows } from "../../app/fetch-data/multiBoardArrowSlice"

import cytoscape, { Core, EdgeSingular, NodeSingular } from 'cytoscape';
import { Board } from "../../app/fetch-data/dataTypes";



export const MultiBoard = () => {
    const dispatch = useAppDispatch()
    let data = useAppSelector(state => state.allBoards)
    let arrows = useAppSelector(state => state.multiBoardArrow)




    const cyRef = useRef<HTMLDivElement>(null);
    let cy: cytoscape.Core | null = null; // Cytoscape-Instanz

    const [cyInstance, setCyInstance] = useState<Core | null>(null);
    const [ghostEdge, setGhostEdge] = useState<EdgeSingular | null>(null);
    const [sourceNode, setSourceNode] = useState<NodeSingular | null>(null);

    useEffect(() => {
        dispatch(setNavigationToMultiBoard());
        dispatch(fetchAllArrows())
    }, [])

    useEffect(() => {

        if (!cyRef.current || !data) return;
        cy = cytoscape({
            container: cyRef.current,
            elements: transformDataToCytoscapeElements(data, arrows),
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        label: 'data(label)', // Anzeige des Labels, das in den Knotendaten gespeichert ist
                        'text-valign': 'center', // Text vertikal in der Mitte
                        'text-halign': 'center', // Text horizontal in der Mitte
                        'color': '#fff', // Textfarbe
                        'font-size': '12px', // Schriftgröße
                        'text-wrap': 'wrap', // Textumbruch für lange Labels
                        'text-max-width': '100px', // Maximale Breite des Textes für den Umbruch
                        'width': 150, // Knotengröße
                        'height': 100, // Knotengröße
                        'border-width': 2,
                        'border-color': '#000'
                    }
                },
                // {
                //     selector: 'edge',
                //     style: {
                //         'width': 3,
                //         'line-color': '#ccc',
                //         'target-arrow-color': '#ccc',
                //         'target-arrow-shape': 'triangle'
                //     }
                // },
                // {
                //     selector: '.ghost-edge',
                //     style: {
                //         'line-color': '#d3d3d3',
                //         'line-style': 'dashed',
                //         'width': 2,
                //         'target-arrow-color': '#d3d3d3',
                //         'target-arrow-shape': 'triangle'
                //     }
                // }
            ],
            layout: {
                name: 'cose',
                fit: true,    // Passt die Ansicht an, um alle Knoten zu zeigen
                padding: 30,  // Abstand zwischen Knoten und Rand des Containers
                animate: true // Animation beim Layout-Wechsel
            },
            // rendering options:
            headless: false,
        });

        //setCyInstance(cy);

        // Cleanup on component unmount
        return () => {
            if (cy) {
                cy.destroy();
            }
        };
    }, []);

    const transformDataToCytoscapeElements = (data: boardsApiState, arrows: multiBoardArrowState) => {
        // Konvertiere die Daten in Knoten- und Kantenstrukturen
        if (data.boards !== undefined) {
            const nodes = data.boards.map(board => ({
                data: { id: board._id, label: board.boardName },
                position: { ...board.boardPosition }
            }));

            // Wenn es Verbindungen (Edges) gibt, kannst du sie hier hinzufügen
            const edges = [
                { data: { source: '633858cf10ff1a53060fec2e', target: '63385aae10ff1a53060fec32' } },
            ];

            return [...nodes, ...edges];
        } else {
            console.error("data.boards is undefined!")
        }
    }


    return (
        <div ref={cyRef}
            className="multi-board-wrapper"
        // style={{ width: '800px', height: '600px' }} 
        />
    );
};




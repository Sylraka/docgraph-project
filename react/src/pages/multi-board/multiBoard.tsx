import { FC, useMemo, useState, useEffect } from "react";

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
    SimulationNodeDatum,
    SimulationLinkDatum,
    forceSimulation,
    forceLink,
    forceCenter,
    forceManyBody,
    forceCollide
} from "d3-force";



interface CustomNode extends SimulationNodeDatum {
    id: string;
    name: string;
}

interface CustomLink extends SimulationLinkDatum<CustomNode> {
    strength: number;
}

const getId = (node: { id: any; }) => node.id;

function d3Map<T, U>(
    data: T[],
    keyAccessor: (datum: T) => string,
    valueAccessor: (datum: T) => U
): Map<string, U> {
    return new Map(
        Array.from(data, (datum) => [keyAccessor(datum), valueAccessor(datum)])
    );
}


export const MultiBoard = () => {
    // Daten aus dem Redux-Store abrufen
    const boardData = useAppSelector(state => state.allBoards.boards);  // z.B. [{_id: "1", boardName: "Board1"}, {...}]
    const linkData = useAppSelector(state => state.multiBoardArrow.multiBoardArrows);    // z.B. [{source: "1", target: "2", strength: 1}, {...}]

    // Konvertiere Boards zu Nodes und Links zu CustomLinks
    const initNodes: CustomNode[] = useMemo(() => {
        if (!boardData) return []; // Fallback auf leeres Array, wenn boardData undefined ist
        return boardData?.map((board: any) => ({
            id: board._id,  // `_id` von den Boards aus dem Redux-Store
            name: board.boardName,  // `boardName` wird der Knoten-Name
        }));  // Fallback: leeres Array, wenn `boardData` undefined ist;
    }, [boardData]);

    const initLinks: CustomLink[] = useMemo(() => {
        if (!linkData) return []; // Fallback auf leeres Array, wenn linkData undefined ist
        return linkData?.map((link: any) => ({
            source: link.anchorStart.onCard,  // `source` ist die ID des Quellknotens
            target: link.anchorEnd.onCard,  // `target` ist die ID des Zielknotens
            strength: 3,  // Link-Stärke
        }));
    }, [linkData]);




    const newLinks = useMemo(() => {
        const sources = initLinks.map((link) => link.source);
        const targets = initLinks.map((link) => link.target);
        const nodesMap = d3Map(initNodes, getId, (d) => d);

        const newLinks: CustomLink[] = initLinks.map((_, i) => ({
            source: nodesMap.get(sources[i].toString()),
            target: nodesMap.get(targets[i].toString()),
            strength: _.strength,
        }));
        return newLinks;
    }, [initNodes]);

    const [nodes, setNodes] = useState<CustomNode[]>(initNodes);
    const [links, setLinks] = useState<CustomLink[]>(newLinks);
    const RADIUS = 8;
    const LINK_WIDTH = 3;
    const LINK_DISTANCE = 30;
    const FORCE_RADIUS_FACTOR = 1.5;
    const NODE_STRENGTH = -50;
    const WIDTH = 1200;
    const HEIGTH = 1000;

    // Funktion für das Umbrechen des Textes nach 20 Zeichen
    const wrapText = (text: string, maxLength: number) => {
        const regex = new RegExp(`(.{1,${maxLength}})(\\s|$)`, 'g');
        return text.match(regex)?.join('\n') || text;
    };


    useEffect(() => {
        const simulation = forceSimulation<CustomNode, CustomLink>(initNodes)
            .force(
                "link",
                forceLink<CustomNode, CustomLink>(newLinks)
                    .id((d) => d.id)
                    .distance(LINK_DISTANCE)
            )
            .force("center", forceCenter(WIDTH / 2, HEIGTH / 2).strength(0.05))
            .force("charge", forceManyBody().strength(NODE_STRENGTH))
            .force("collision", forceCollide(RADIUS * FORCE_RADIUS_FACTOR));

        // update state on every frame
        simulation.on("tick", () => {
            setNodes([...simulation.nodes()]);
            setLinks([...newLinks]);
        });

        return () => {
            simulation.stop();
        };
    }, [newLinks, initNodes]);

    return (
        <svg height={HEIGTH} width={WIDTH}>

            {links.map((link) => {
                const { source, target } = link;
                const modSource = source as CustomNode;
                const modTarget = target as CustomNode;

                return (
                    <line
                        key={`${modSource.id}-${modTarget.id}`}
                        stroke="white"
                        strokeWidth={3}
                        strokeOpacity={1}
                        x1={modSource.x}
                        y1={modSource.y}
                        x2={modTarget.x}
                        y2={modTarget.y}
                    />
                );
            })}
            {nodes.map((node) => (
                <g key={node.id} transform={`translate(${node.x},${node.y})`}>
                    <ellipse
                        rx="120"
                        ry="30"
                        stroke="white"
                        strokeWidth={1}
                        fill="white"
                    />

                    <text
                        textAnchor="middle"
                        dy="-200"  // Position des Textes oberhalb des Knotens
                        fill="black"
                    >
                        {wrapText(node.name, 40).split('\n').map((line, i) => (
                            <tspan x="0" dy={`${i === 0 ? 0 : 1.2}em`} key={i}>
                                {line}
                            </tspan>
                        ))}
                    </text>
                    {/* Link to the node's detail page */}
                    <foreignObject x="30"y="20" width="50" height="20">
                        <Link to={`/board/${node.id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                            Details
                        </Link>
                    </foreignObject>
                </g>
            ))}
        </svg>
    );
};
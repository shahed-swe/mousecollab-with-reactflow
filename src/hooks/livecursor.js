import { useEffect, useState } from "react";
import { useUpdateMyPresence, useOthers } from "../liveblocks.config";

export function useLiveCursors() {
    const updateMyPresence = useUpdateMyPresence();
    const others = useOthers();
    const [cursorstate, setCursorState] = useState({})

    let cursors = [];
    useEffect(() => {
        let scroll = {
            x: window.scrollX,
            y: window.scrollY,
        };



        let lastPosition = null;

        function transformPosition(cursor) {
            // console.log(cursor.x / window.innerWidth)
            return {
                x: cursor.x / window.innerWidth,
                y: cursor.y,
            };
        }
        const newdoc = document.querySelector(".react-flow__viewport")


        function onPointerMove(event) {
            event.preventDefault();

            const style = window.getComputedStyle(newdoc)
            const matrix = new DOMMatrixReadOnly(style.transform)
            console.log(matrix)
            setCursorState({ x: matrix.m41, y: matrix.m42 })

            const position = {
                x: event.pageX,
                y: event.pageY,
            };
            lastPosition = position;
            updateMyPresence({
                cursor: transformPosition(position),
            });
        }

        function onPointerLeave() {
            lastPosition = null;
            updateMyPresence({ cursor: null });
        }

        function onDocumentScroll() {
            if (lastPosition) {
                const offsetX = window.scrollX - scroll.x;
                const offsetY = window.scrollY - scroll.y;
                const position = {
                    x: lastPosition.x + offsetX,
                    y: lastPosition.y + offsetY,
                };
                lastPosition = position;
                updateMyPresence({
                    cursor: transformPosition(position),
                });
            }
            scroll.x = window.scrollX;
            scroll.y = window.scrollY;
        }


        document.addEventListener("scroll", onDocumentScroll);
        document.addEventListener("pointermove", onPointerMove);
        // document.addEventListener("pointerleave", onPointerLeave);

        return () => {
            document.removeEventListener("scroll", onDocumentScroll);
            document.removeEventListener("pointermove", onPointerMove);
            // document.removeEventListener("pointerleave", onPointerLeave);
        };
    }, [updateMyPresence]);





    for (const { connectionId, presence } of others) {
        if (presence.cursor) {
            cursors.push({
                x: presence.cursor.x * window.innerWidth + cursorstate.x,
                y: presence.cursor.y + cursorstate.y,
                connectionId,
            });
        }
    }


    return cursors;
}
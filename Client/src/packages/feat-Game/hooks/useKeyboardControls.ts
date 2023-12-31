import { useEffect } from "react";
import { handleKeyDown, handleKeyUp } from "../utils/drawing";
import { Socket } from "socket.io-client";



export const useKeyboardControls = (
    emitEvent: (event: string, data?: any) => void,
    socket: Socket | null
) => {
    useEffect(() => {
   
        const onKeyDown = (e: KeyboardEvent) => handleKeyDown(e, emitEvent, socket);
        const onKeyUp = (e: KeyboardEvent) => handleKeyUp(e, emitEvent, socket);

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);
        };
    }, [emitEvent]);
};

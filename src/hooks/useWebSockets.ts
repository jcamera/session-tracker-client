import { useState, useEffect } from 'react';
import { WebsocketsMessage, Session } from '../lib/types';

export function useWebSockets () {

    const [sessionsRT, setSessionsRT] = useState<Session[]>([]);

    const handleMessage = (e: WebsocketsMessage) => {
        console.log('useWebSockets handleMessage: ', e.data);
        const data: Session[] = JSON.parse(e.data);
        if (Array.isArray(data)) {
            setSessionsRT(data);
        }
    }

    useEffect(() => {

        const ws  = new WebSocket('ws://localhost:8080/ws');
        ws.onopen = () => {
            ws.send(JSON.stringify({message: "hi from react"}));
            ws.onmessage = handleMessage; 
        }

    }, []); //call only once

    return [sessionsRT] as const;
}

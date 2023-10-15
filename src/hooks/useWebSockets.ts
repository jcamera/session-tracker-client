import { useState, useEffect } from 'react';
import { WebsocketsMessage, Session } from '../lib/types';
import API from '../lib/API';

export function useWebSockets (isLoggedIn: boolean) {

    const [sessionsRT, setSessionsRT] = useState<Session[]>([]);

    const handleMessage = (e: WebsocketsMessage) => {
        console.log('websockets message received');
        const data: Session[] = JSON.parse(e.data);
        if (Array.isArray(data)) {
            setSessionsRT(data);
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            const ws  = API.createWSConnection(); 
            ws.onopen = () => {
                ws.send(JSON.stringify({message: "hi from react"}));
                ws.onmessage = handleMessage; 
            }
        }
    }, [isLoggedIn]); 

    return [sessionsRT] as const;
}

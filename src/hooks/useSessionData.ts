import { useState, useEffect } from 'react';
import API from '../lib/API';

export function useSessionData (isLoggedIn: boolean) {

    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isLoggedIn) {
            const fetchData = async () => {
                setIsLoading(true);
                const sessions = await API.getSessions();
                setSessions(sessions);
                setIsLoading(false);
            }
            fetchData();
        }
    }, [isLoggedIn]);


    return [sessions, isLoading] as const;
}


import { useState, useEffect } from 'react';
import API from '../lib/API';

export function useSessionData (isLoggedIn: boolean) {

    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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


    return [sessions, isLoading, error] as const;
}


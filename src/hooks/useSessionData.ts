import { useState, useEffect } from 'react';

export function useSessionData () {

    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/api/parking_sessions');
            if (!response.ok) {
                setError('sessions fetch failed');
            }
            const data = await response.json();
            setSessions(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);


    return [sessions, isLoading, error] as const;
}


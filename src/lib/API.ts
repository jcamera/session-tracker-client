import { Session, CreateSession, LoginUser } from './types';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // 'http://localhost:8080';
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

async function makeFetch(method: string, route: string, data: object | null, callback: Function | null) {
    console.log('api call ', {method, route});
    let options = {
        method,
        headers: { 
            'Content-type': 'application/json',
            'Authorization': window.jwt ? `Bearer ${window.jwt}` : ``
        },
        body: data ? JSON.stringify(data) : null
    };

    const response = await fetch(`${API_BASE_URL}${route}`, options);
    if (!response || !response.ok) {
        console.log(`no response for ${method} call to ${route}`);
        return; 
    }

    const responseJson = await response.json();
    if (callback) {
        callback(responseJson);
        return;
    }
    else {
        return responseJson;
    }
}

const API = {
    getSessions: async () => {
        return await makeFetch('GET', '/api/parking_sessions', null, null);
    },
    createSession: async (data: CreateSession, onSuccess: () => void) => {
        return await makeFetch('POST', '/api/parking_sessions', data, onSuccess);
    },
    editSession: async (data: Session, onSuccess: () => void) => {
        if (!data?.id) {
            return Promise.reject("edit session missing id");
        }
        return await makeFetch('PUT', `/api/parking_sessions/${data.id}`, data, onSuccess);
    },
    login: async (data: LoginUser) => { 
        return await makeFetch('POST', `/login`, data, null);
    },
    createWSConnection: () => {
        return new WebSocket(WS_BASE_URL);
    }
}

export default API;
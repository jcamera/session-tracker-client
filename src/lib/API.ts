import { Session, CreateSession } from './types';


const BASE_URL = 'http://localhost:8080';

const API = {
    createSession: async (data: CreateSession, onSuccess: () => void) => {
        let options = {
            method: "POST",
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(data)
        };

        const response = await fetch(`${BASE_URL}/api/parking_sessions`, options);

        if (response.ok) {
            console.log('response ok: ', response);
            onSuccess && onSuccess();
        }
        else {
            console.log('post session failed: ', response);
        }
    },
    editSession: async (data: Session, onSuccess: () => void) => {
        let options = {
            method: "PUT",
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(data)
        };

        //check for id, other fields

        const response = await fetch(`${BASE_URL}/api/parking_sessions/${data.id}`, options); //'http://localhost:8080/api/parking_sessions', options);
        if (response.ok) {
            console.log('edit response ok: ', response);
            onSuccess && onSuccess();
        }
        else {
            console.log('edit session failed: ', response);
        }
    }
}

export default API;
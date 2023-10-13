
export type SessionStatus = 'ACTIVE' | 'COMPLETE' | 'CANCELLED';

export const SESSION_VALUES = {
    ACTIVE: 'ACTIVE',
    COMPLETE: 'COMPLETE',
    CANCELLED: 'CANCELLED',
};

export interface Session {
    id: string; 
    plate_number: string;
    status: SessionStatus;
    created_on?: string;
};

export interface CreateSession {
    plate_number: string;
    status: SessionStatus;
};

export interface WebsocketsMessage {
    data: string;
}
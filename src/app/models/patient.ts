import { Session } from "./session";

export interface Patient {
    id?: number;
    patientRegistrationNumber?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: any;
    age?: string;
    phoneNumber?: string;
    residence?: string;
    registrationDate?: Date;
    lastUpdated?: Date;
    visits?: Array<Session>
}




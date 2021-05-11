import { Vitals } from './vitals';
import { Payment } from './payment';
import { Notes } from './notes';
import { Patient } from './patient';
import { Investigations } from './investigation';

export interface Session {
    id?: number;
    date?: string;
    status?: string;
    patient: Patient;

    payments?: Array<Payment>;
    vitals?: Array<Vitals>;
    complaints?: Array<Notes>;
    physicalExams?: Array<Notes>;
    comorbidities?: Array<Notes>;
    investigations?: Array<Investigations>;
    diagnosis?: Array<Notes>;
    treatment?: Array<Notes>;
    remarks?: Array<Notes>;

    followUpDate?: Date;
    followUpStatus?: string;
}

export interface MergedSessions {
    id?: number;
    previous?: Session;
    next?: Session;
}


import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {

    constructor() { }

    //log
    log(message: any, ...optionalParams: any[]) {
        if (!environment.production) {
            console.log(message + ' ' + optionalParams);
        }
    }

    //table
    table(message: any) {
        if (!environment.production) {
            console.table(message );
        }
    }

    //table
    tableWithOption(message: any, ...optionalParams: any[]) {
        if (!environment.production) {
            console.table(message + ' ' + optionalParams);
        }
    }

    //table with label
    tableWithLabel(label: string, message: any) {
        if (!environment.production) {
            console.table(label, message);
        }
    }

}
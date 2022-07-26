import { environment } from "src/environments/environment";

export class GlobalConstants {
    public static endPoints = {
        EMPLOYEE: {
            get: `${environment.serverBaseUrl}employee/{employeeId}`,
            getAll: `${environment.serverBaseUrl}employees`,
            create: `${environment.serverBaseUrl}create`,
            update: `${environment.serverBaseUrl}update/{employeeId}`,
            delete: `${environment.serverBaseUrl}delete/{employeeId}`,
        }
    }
}
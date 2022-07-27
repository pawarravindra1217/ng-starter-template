import { Observable } from "rxjs";
import { DTOFormatter } from "./dto-formatter";

export interface HttpServiceInterface<T> {
    getOne(url:string, dataFormatter: DTOFormatter): Observable<T>;
    getAll(url: string, dataFormatter: DTOFormatter): Observable<T[]>;
    create(url: string, body: T, dataFormatter: DTOFormatter): Observable<T>;
    createMany(url: string, body: T, dataFormatter: DTOFormatter): Observable<T[]>;
    update(url: string, body: T, dataFormatter: DTOFormatter): Observable<T>;
    delete(url: string): Observable<T>;
    convertData(data: any, dataFormatter: DTOFormatter): T[];
}
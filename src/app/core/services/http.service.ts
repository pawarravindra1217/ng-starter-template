import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DTOFormatter } from '../interfaces/dto-formatter';
import { Resource } from '../models/Resource';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T extends Resource> {

  constructor(private httpClient: HttpClient) { }

  getOne(url:string, dataFormatter: DTOFormatter): Observable<T> {
    return this.httpClient.get<T>(url)
            .pipe(map((data: any) => dataFormatter.formatGetData(data) as T));
  }

  getAll(url: string, dataFormatter: DTOFormatter): Observable<T[]> {
    return this.httpClient.get<T[]>(url).pipe(map((data:any) => this.convertData(data.data, dataFormatter) as T[]))
  }

  create(url: string, body: T, dataFormatter: DTOFormatter): Observable<T> {
    return this.httpClient.post<T>(url,dataFormatter.createPostData(body))
            .pipe(map(data => dataFormatter.formatGetData(data) as T));
  }

  createMany(url: string, body: T, dataFormatter: DTOFormatter): Observable<T[]> {
    return this.httpClient.post<T[]>(url,dataFormatter.createPostData(body))
            .pipe(map(data => this.convertData(data, dataFormatter) as T[]));
  }

  update(url: string, body: T, dataFormatter: DTOFormatter): Observable<T> {
    return this.httpClient.post<T>(url,dataFormatter.createPostData(body))
            .pipe(map(data => dataFormatter.formatGetData(data) as T));
  }

  delete(url: string){
    this.httpClient.delete(url);
  }

  private convertData(data: any, dataFormatter: DTOFormatter): T[] {
    return data.map((item: T) => dataFormatter.formatGetData(item));
  }
}

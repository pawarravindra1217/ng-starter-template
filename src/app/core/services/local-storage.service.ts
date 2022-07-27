import { Injectable } from '@angular/core';
import { LocalStorageServiceInterface } from '../interfaces/local-storage-service-interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements LocalStorageServiceInterface {

  constructor() { }

  setItem(key:string, value:any): void {
    localStorage.setItem(key,JSON.stringify(value));
  }

  getItem(key: string): any {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from '../collection.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  url = environment.backendUrl;
  constructor(private http: HttpClient) {}

  getAllCollections() {
    console.log('yo');
    return this.http.get<Collection[]>(`${this.url}/collection`);
  }
}

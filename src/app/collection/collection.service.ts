import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from '../collection.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  url = environment.backendUrl;

  constructor(private http: HttpClient) {}

  getAllCollections() {
    return this.http.get<Collection[]>(`${this.url}/collection`);
  }
}

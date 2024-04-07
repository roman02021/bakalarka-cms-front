import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from './collection.interface';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getAllCollections() {
    console.log('yo');
    return this.http.get<Collection[]>(`${this.url}collection/all`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('id_token'),
      },
    });
  }
}

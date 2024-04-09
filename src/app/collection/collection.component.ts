import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CollectionService } from './collection.service';
import { RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment.development';
export interface Collection {
  id?: string;
  displayName: string;
  name: string;
}

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
})
export class CollectionComponent implements OnInit {
  url = environment.backendUrl;
  collections: Collection[] = [];

  constructor(
    private http: HttpClient,
    private collectionService: CollectionService
  ) {}
  getAllCollections() {
    console.log('yo');
    return this.http.get<Collection[]>(`${this.url}/collection`);
  }
  loadCollections() {
    this.collectionService.getAllCollections().subscribe((data) => {
      this.collections = data;
    });
  }

  ngOnInit() {
    this.loadCollections();
  }
}

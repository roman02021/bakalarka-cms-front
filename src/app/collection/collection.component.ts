import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { CollectionService } from './collection.service';
import { RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { CreateCollectionComponent } from '../create-collection/create-collection.component';
export interface Collection {
  id?: string;
  displayName: string;
  name: string;
}

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [RouterLink, CreateCollectionComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
})
export class CollectionComponent implements OnInit {
  url = environment.backendUrl;
  collections = signal<Collection[]>([]);
  collectionFormOpen = signal<boolean>(false);

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
      this.collections.set(data);
    });
  }
  openCreateCollectionForm() {
    this.collectionFormOpen.set(!this.collectionFormOpen());
  }

  ngOnInit() {
    this.loadCollections();
  }
}

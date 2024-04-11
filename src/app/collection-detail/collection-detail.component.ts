import { HttpClient } from '@angular/common/http';
import { Component, effect, model, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

import { Item, Schema } from '../interfaces';
import { ItemsComponent } from '../items/items.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collection-detail',
  standalone: true,
  imports: [ModalComponent, ItemsComponent],
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.scss',
})
export class CollectionDetailComponent {
  url = environment.backendUrl;
  items = model<Item[]>([]);
  schema = signal<Schema>({
    displayName: '',
    name: '',
    attributes: [],
  });
  showCreateItemForm = signal(false);

  dataUrl = `${this.url}/collections/${this.schema().name}`;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    effect(() => {
      console.log(this.items(), 'IN COL DET');
      this.dataUrl = `${this.url}/item/${this.schema().name}`;
    });
  }

  loadItems() {
    this.route.params.subscribe((params) => {
      this.http
        .get<Item[]>(`${this.url}/item/${params['id']}`)
        .subscribe((items) => {
          items = items.sort((itemA, itemB) => (itemA.id > itemB.id ? -1 : 1));
          this.items.set(items.sort((item) => item.id));
          console.log(this.items, 'COCOO');
        });
    });
    // this.http.get<Object[]>(`${this.url}item/${}`);
  }

  loadSchema() {
    this.route.params.subscribe((params) => {
      this.http
        .get<Schema>(`${this.url}/collection/${params['id']}`)
        .subscribe((schema) => {
          this.schema.set(schema);
          console.log(this.schema, 'ayooo');
        });
    });
  }

  openForm() {
    this.showCreateItemForm.set(true);
  }

  ngOnInit() {
    this.loadItems();
    this.loadSchema();
  }
}

import {
  Component,
  ViewEncapsulation,
  input,
  model,
  signal,
} from '@angular/core';
import { Item, Attribute, Schema } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { EditItemComponent } from '../edit-item/edit-item.component';

@Component({
  selector: 'item',
  standalone: true,
  imports: [EditItemComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
})
export class ItemsComponent {
  constructor(private http: HttpClient) {}

  url = environment.backendUrl;
  item = input.required<Item>();
  items = model.required<Item[]>();
  index = input.required<number>();
  schema = input.required<Schema>();
  showEditItemForm = signal(false);

  deleteItem(itemId: number) {
    this.http
      .delete(`${this.url}/item/${this.schema().name}/${itemId}`)
      .subscribe((res) => {
        this.http
          .get<Item[]>(`${this.url}/item/${this.schema().name}`)
          .subscribe((items) => {
            this.items.set(items);
            console.log(this.items, 'COCOO');
          });
      });
  }

  openEditForm() {
    this.showEditItemForm.set(!this.showEditItemForm());
  }

  editItem(itemId: number) {
    //TODO
    console.log(itemId);
  }
}

import { Component, effect, input, model } from '@angular/core';
import { Item, Schema } from '../interfaces';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AttributeComponent } from '../attribute/attribute.component';

@Component({
  selector: 'edit-item-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AttributeComponent],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss',
})
export class EditItemComponent {
  url = environment.backendUrl;
  isOpen = input(false);
  id = input.required<number>();
  schema = model<Schema>({
    displayName: '',
    name: '',
    attributes: [],
  });
  items = model<Item[]>([]);
  item = input.required<Item>();

  dynamicForm!: FormGroup;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    effect(() => {
      // console.log(this.id(), 'golodrel', this.inputAttributes());
      if (this.schema().attributes.length > 0) {
        let formGroup: Record<string, string | null | number[]> = {};
        this.schema().attributes.forEach((attribute) => {
          if (attribute.type === 'relation') {
            if (attribute.relationType === 'oneToMany') {
              formGroup[attribute.name] = [];
            }
          } else {
            formGroup[attribute.name] = this.item()[attribute.name] as string;
          }
        });
        console.log(formGroup, 'yoooo', this.id());
        this.dynamicForm = this.formBuilder.group(formGroup);
      }
    });
  }
  onSubmit() {
    console.log(this.dynamicForm.value);
    this.http
      .put(
        `${this.url}/item/${this.schema().name}/${this.id()}`,
        this.dynamicForm.value
      )
      .subscribe((res) => {
        return this.http
          .get<Item[]>(`${this.url}/item/${this.schema().name}`)
          .subscribe((items) => {
            // this.items.set(items);

            this.items.update((curr) => {
              items = items.sort((itemA, itemB) =>
                itemA.id > itemB.id ? -1 : 1
              );

              console.log(
                items.sort((item) => item.id),
                items,
                this.id()
              );
              curr?.splice(0, curr?.length, ...items);
              console.log(curr);
              // console.log(curr, 'YOYOYOYOY', items);
              // curr?.push(items[0]);
              return curr;
            });

            return items;
          });

        console.log(this.schema(), this.items(), 'PEPIS');
      });
  }
}

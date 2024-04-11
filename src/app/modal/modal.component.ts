import { Component, OnInit, effect, input, model } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilesComponent } from '../files/files.component';
import { AttributeComponent } from '../attribute/attribute.component';
import { Attribute, Item, Schema } from '../interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'create-item-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FilesComponent,
    AttributeComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  url = environment.backendUrl;
  inputAttributes = model<Attribute[]>([]);

  isOpen = input(false);
  id = input<number>();

  items = model<Item[]>();

  schema = model<Schema>({
    displayName: '',
    name: '',
    attributes: [],
  });
  dynamicForm!: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    effect(() => {
      // console.log(this.id(), 'golodrel', this.inputAttributes());
      if (this.schema().attributes.length > 0) {
        let formGroup: Record<string, string | null> = {};
        this.schema().attributes.forEach((attribute) => {
          formGroup[attribute.name] = null;
        });
        console.log(formGroup, 'yoooo', this.id());
        this.dynamicForm = this.formBuilder.group(formGroup);
      }
    });
  }

  createItem() {
    // this.http.post<string>(`${this.url}item/${this.id()}`, {
    //   this.createItemForm.attributes
    // }).subscribe((res) => {
    //   console.log(res);
    // });
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
    this.http
      .post(`${this.url}/item/${this.schema().name}`, this.dynamicForm.value)
      .subscribe((res) => {
        return this.http
          .get<Item[]>(`${this.url}/item/${this.schema().name}`)
          .subscribe((items) => {
            // this.items.set(items);

            this.items.update((curr) => {
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

  // this.route.params.subscribe((params) => {
  //   this.http
  //     .get<Schema>(`${this.url}collection/${params['id']}`)
  //     .subscribe((schema) => {
  //       this.schema = schema;
  //       console.log(this.schema, 'ayooo');
  //     });
  // });
  // }

  ngOnInit() {}
}

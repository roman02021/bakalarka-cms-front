import { HttpClient } from '@angular/common/http';
import { Component, input, model } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';

import { environment } from 'src/environments/environment';
import { Collection } from '../collection.interface';
import { CreateAttributeFormComponent } from '../create-attribute-form/create-attribute-form.component';

@Component({
  selector: 'create-collection-form',
  standalone: true,
  imports: [ReactiveFormsModule, CreateAttributeFormComponent],
  templateUrl: './create-collection.component.html',
  styleUrl: './create-collection.component.scss',
})
export class CreateCollectionComponent {
  isOpen = input<boolean>(false);
  url = environment.backendUrl;
  collections = model.required<Collection[]>();

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  collectionForm = this.formBuilder.group({
    name: ['', Validators.required],
    displayName: ['', Validators.required],
    attributes: this.formBuilder.array([
      this.formBuilder.group({
        name: [''],
        displayName: [''],
        type: [''],
      }),
    ]),
  });

  createCollection() {
    console.log(this.collectionForm.value);
    this.http
      .post(`${this.url}/collection`, this.collectionForm.value)
      .subscribe((res) => {
        this.http
          .get<Collection[]>(`${this.url}/collection`)
          .subscribe((collections) => {
            this.collections.update((curr) =>
              curr.splice(0, curr?.length, ...collections)
            );
          });
      });
  }
  get attributes() {
    return this.collectionForm.get('attributes') as FormArray;
  }

  addAttribute() {
    const attribute = this.formBuilder.group({
      name: [''],
      displayName: [''],
      type: [''],
    });
    this.attributes.push(attribute);
    console.log(this.collectionForm.value);
  }
  onSubmit() {
    this.http
      .post(`${this.url}/collection`, this.collectionForm.value)
      .subscribe((res) => {
        this.http
          .get<Collection[]>(`${this.url}/collection`)
          .subscribe((collections) => {
            this.collections.update((curr) =>
              curr.splice(0, curr?.length, ...collections)
            );
          });
      });
  }
}

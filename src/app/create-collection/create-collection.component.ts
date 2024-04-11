import { HttpClient } from '@angular/common/http';
import { Component, input, model } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { Collection } from '../collection.interface';

@Component({
  selector: 'create-collection-form',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    attributes: [[]],
  });

  // get attributes() {
  //   return this.collectionForm.get('attributes') as FormArray;
  // }
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

  // addAttribute() {
  //   this.attributes.push(this.formBuilder.control(''));
  // }
}

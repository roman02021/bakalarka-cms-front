import { Component, effect, input, model, signal } from '@angular/core';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilesComponent } from '../files/files.component';
import { HttpClient } from '@angular/common/http';
import { Attribute } from '../interfaces';
import { environment } from 'src/environments/environment';

interface Relation {
  id: number;
  name: string;
}

@Component({
  selector: 'attribute',
  standalone: true,
  imports: [ReactiveFormsModule, FilesComponent, FormsModule],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.scss',
})
export class AttributeComponent {
  attribute = input.required<Attribute>();
  isFileManagerOpen = signal<boolean>(false);
  chosenFile = signal<number>(0);
  parentFormGroup = model.required<FormGroup>();
  url = environment.backendUrl;
  collectionName = input<string>('');
  relations = signal<Relation[]>([]);

  constructor(private http: HttpClient) {
    effect(() => {
      if (this.attribute()?.type === 'file') {
        console.log(
          this.chosenFile(),
          this.parentFormGroup().controls[
            this.attribute()?.name ?? ''
          ].setValue(this.chosenFile())
        );
      }
      if (this.attribute()?.type === 'relation') {
        if (this.attribute()) {
          const id = this.attribute().referencedTable;
          if (id !== undefined) {
            this.getRelations(id);
          }
        }
      }
    });
  }

  getRelations(name: string) {
    this.http
      .get<Relation[]>(`${this.url}/item/${name}`)
      .subscribe((relation) => {
        console.log(relation);
        this.relations.set(relation);
      });
  }

  openFileManager() {
    this.isFileManagerOpen.set(!this.isFileManagerOpen());
  }
}

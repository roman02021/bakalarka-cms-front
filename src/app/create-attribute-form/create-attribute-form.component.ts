import { Component, input, model, signal } from '@angular/core';
import { TYPES } from '../interfaces';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'create-attribute-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-attribute-form.component.html',
  styleUrl: './create-attribute-form.component.scss',
})
export class CreateAttributeFormComponent {
  // type = model.required<string>();
  // nameFormControl = input.required<string>();
  // displayNameFormControl = input.required<string>;
  index = model.required<number>();
  formGroup = input.required<FormGroup>();
}

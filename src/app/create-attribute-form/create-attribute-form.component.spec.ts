import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttributeFormComponent } from './create-attribute-form.component';

describe('CreateAttributeFormComponent', () => {
  let component: CreateAttributeFormComponent;
  let fixture: ComponentFixture<CreateAttributeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAttributeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAttributeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

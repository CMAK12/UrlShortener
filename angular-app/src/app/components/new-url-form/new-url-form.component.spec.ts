import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUrlFormComponent } from './new-url-form.component';

describe('NewUrlFormComponent', () => {
  let component: NewUrlFormComponent;
  let fixture: ComponentFixture<NewUrlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUrlFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewUrlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

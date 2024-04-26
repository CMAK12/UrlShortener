import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUrlComponent } from './about-url.component';

describe('AboutUrlComponent', () => {
  let component: AboutUrlComponent;
  let fixture: ComponentFixture<AboutUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUrlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobaComponentComponent } from './coba-component.component';

describe('CobaComponentComponent', () => {
  let component: CobaComponentComponent;
  let fixture: ComponentFixture<CobaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CobaComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CobaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

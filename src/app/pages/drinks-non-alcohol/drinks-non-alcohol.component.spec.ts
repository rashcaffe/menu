import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksNonAlcoholComponent } from './drinks-non-alcohol.component';

describe('DrinksNonAlcoholComponent', () => {
  let component: DrinksNonAlcoholComponent;
  let fixture: ComponentFixture<DrinksNonAlcoholComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrinksNonAlcoholComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrinksNonAlcoholComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

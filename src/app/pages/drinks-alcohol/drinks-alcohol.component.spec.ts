import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksAlcoholComponent } from './drinks-alcohol.component';

describe('DrinksAlcoholComponent', () => {
  let component: DrinksAlcoholComponent;
  let fixture: ComponentFixture<DrinksAlcoholComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrinksAlcoholComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrinksAlcoholComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

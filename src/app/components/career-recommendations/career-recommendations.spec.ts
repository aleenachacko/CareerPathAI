import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerRecommendations } from './career-recommendations';

describe('CareerRecommendations', () => {
  let component: CareerRecommendations;
  let fixture: ComponentFixture<CareerRecommendations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareerRecommendations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerRecommendations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

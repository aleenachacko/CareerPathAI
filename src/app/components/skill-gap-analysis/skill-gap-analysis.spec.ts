import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillGapAnalysis } from './skill-gap-analysis';

describe('SkillGapAnalysis', () => {
  let component: SkillGapAnalysis;
  let fixture: ComponentFixture<SkillGapAnalysis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillGapAnalysis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillGapAnalysis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

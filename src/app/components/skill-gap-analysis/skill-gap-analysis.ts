import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SkillsService } from '../../services/skills-service';
import { AuthService } from '../../services/auth-service';
import { SessionService } from '../../SessionService';

@Component({
  selector: 'app-skill-gap-analysis',
  standalone: false,
  templateUrl: './skill-gap-analysis.html',
  styleUrl: './skill-gap-analysis.css'
})
export class SkillGapAnalysis implements OnInit {
  analysisForm: FormGroup;
  currentSkills: string[] = [];
  desiredSkills: string[] = [];
  analysisResult: any = null;
  isLoading = false;
  errorMessage = '';
   userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private skillsService: SkillsService,
    private authService: AuthService,
    private sessionService: SessionService
  ) {
    this.analysisForm = this.fb.group({
      newCurrentSkill: [''],
      newDesiredSkill: ['']
    });
  }
  ngOnInit(): void {
     this.userId = this.sessionService.getUserId();
    this.loadSkillAnalysis();
  }
  loadSkillAnalysis() {
    this.skillsService.getSkillAnalysis(this.userId!).subscribe({
      next: (analysis) => {
        if (analysis) {
          this.currentSkills = analysis.current_skills || [];
          this.desiredSkills = analysis.desired_skills || [];
          this.analysisResult = analysis.analysis_result;
        }
      },
      error: (err) => {
        console.error('Failed to load skill analysis', err);
      }
    });
  }
  addCurrentSkill() {
    const skill = this.analysisForm.get('newCurrentSkill')?.value.trim();
    if (skill && !this.currentSkills.includes(skill)) {
      this.currentSkills.push(skill);
      this.analysisForm.get('newCurrentSkill')?.reset();
    }
  }
  addDesiredSkill() {
    const skill = this.analysisForm.get('newDesiredSkill')?.value.trim();
    if (skill && !this.desiredSkills.includes(skill)) {
      this.desiredSkills.push(skill);
      this.analysisForm.get('newDesiredSkill')?.reset();
    }
  }
  removeCurrentSkill(index: number) {
    this.currentSkills.splice(index, 1);
  }
  removeDesiredSkill(index: number) {
    this.desiredSkills.splice(index, 1);
  }
  analyzeSkills() {
    if (this.currentSkills.length === 0 || this.desiredSkills.length === 0) {
      this.errorMessage = 'Please add both current and desired skills';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    const analysisData = {
      current_skills: this.currentSkills,
      desired_skills: this.desiredSkills
    };
    this.skillsService.analyzeSkills(analysisData).subscribe({
      next: (result) => {
        this.analysisResult = result;
        this.isLoading = false;
        this.loadSkillAnalysis(); // Refresh from server
      },
      error: (err) => {
        this.errorMessage = 'Failed to analyze skills';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
  saveAnalysis() {
    if (!this.analysisResult) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    const analysisData = {
      current_skills: this.currentSkills,
      desired_skills: this.desiredSkills,
      analysis_result: this.analysisResult
    };
    this.skillsService.saveSkillAnalysis(analysisData).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Skill analysis saved successfully!');
      },
      error: (err) => {
        this.errorMessage = 'Failed to save analysis';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CareerService } from '../../services/career-service';
import { ResumeService } from '../../services/resume-service';
import { SkillsService } from '../../services/skills-service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{
  careerStats: any;
  resumeStats: any;
  skillStats: any;
  isLoading = true;
  //userId: string = ''; // TODO: Assign actual user ID from authentication context or user service

  constructor(
    private careerService: CareerService,
    private resumeService: ResumeService,
    private skillsService: SkillsService
  ) { }
  ngOnInit(): void {
    this.loadDashboardData();
  }
  loadDashboardData() {
    this.careerService.getUserCareerProfile().subscribe({
      next: (data) => {
        this.careerStats = {
          hasProfile: !!data,
          lastUpdated: data?.updated_at
        };
        this.checkLoadingComplete();
      },
      error: (err) => console.error(err)
    });
    this.resumeService.getResumes('16').subscribe({
      next: (data) => {
        this.resumeStats = {
          count: data.length,
          lastUpdated: data.length > 0 ? data[0].updated_at : null
        };
        this.checkLoadingComplete();
      },
      error: (err) => console.error(err)
    });
    this.skillsService.getSkillAnalysis().subscribe({
      next: (data) => {
        this.skillStats = {
          hasAnalysis: !!data,
          missingSkills: data?.missing_skills?.length || 0,
          lastUpdated: data?.updated_at
        };
        this.checkLoadingComplete();
      },
      error: (err) => console.error(err)
    });
  }
  checkLoadingComplete() {
    if (this.careerStats && this.resumeStats && this.skillStats) {
      this.isLoading = false;
    }
  }
}

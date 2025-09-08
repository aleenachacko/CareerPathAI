import { Component, OnInit } from '@angular/core';
import { CareerService } from '../../services/career-service';
import { ResumeService } from '../../services/resume-service';
import { SkillsService } from '../../services/skills-service';
import { SessionService } from '../../SessionService';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'] // ✅ corrected from styleUrl
})
export class Dashboard implements OnInit {
  careerStats: any;
  resumeStats: any;
  skillStats: any;
  isLoading = true;
  userId: string | null = null;

  constructor(
    private careerService: CareerService,
    private resumeService: ResumeService,
    private skillsService: SkillsService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.userId = this.sessionService.getUserId();

    if (!this.userId) {
      console.warn('No userId found in session. Redirecting or showing login...');
      // Optionally redirect to login or show error
      return;
    }

    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.careerService.getUserCareerProfile(this.userId!).subscribe({
      next: (data) => {
        this.careerStats = {
          hasProfile: !!data,
          lastUpdated: data?.updated_at
        };
        this.checkLoadingComplete();
      },
      error: (err) => console.error('CareerService error:', err)
    });

    this.resumeService.getResumes(this.userId!).subscribe({
      next: (data) => {
        this.resumeStats = {
          count: data.length,
          lastUpdated: data.length > 0 ? data[0].updated_at : null
        };
        this.checkLoadingComplete();
      },
      error: (err) => console.error('ResumeService error:', err)
    });

    this.skillsService.getSkillAnalysis(this.userId!).subscribe({
      next: (data) => {
        this.skillStats = {
          hasAnalysis: !!data,
          missingSkills: data?.missing_skills?.length || 0,
          lastUpdated: data?.updated_at
        };
        this.checkLoadingComplete();
      },
      error: (err) => console.error('SkillsService error:', err)
    });
  }

  checkLoadingComplete(): void {
    if (this.careerStats && this.resumeStats && this.skillStats) {
      this.isLoading = false;
    }
  }
}
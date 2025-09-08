import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CareerService } from '../../services/career-service';
import { SessionService } from '../../SessionService';

@Component({
  selector: 'app-career-recommendations',
  standalone: false,
  templateUrl: './career-recommendations.html',
  styleUrl: './career-recommendations.css'
})
export class CareerRecommendations implements OnInit {
careerForm: FormGroup;
  recommendations: any[] = [];
  isLoading = false;
  errorMessage = '';
  userId: string | null = null;
  constructor(
    private fb: FormBuilder,
    private careerService: CareerService,
    private sessionService: SessionService
  ) {
    this.careerForm = this.fb.group({
      skills: ['', Validators.required],
      interests: ['', Validators.required],
      experience: ['', Validators.required],
      education: ['', Validators.required]
    });
  }

  ngOnInit(): void {
     this.userId = this.sessionService.getUserId();
      if (!this.userId) {
      console.warn('No userId found in session. Redirecting or showing login...');
      // Optionally redirect to login or show error
      return;
    }
    this.loadUserCareerData();
  }

  loadUserCareerData() {
    this.careerService.getUserCareerProfile(this.userId !).subscribe({
      next: (data) => {
        if (data) {
          this.careerForm.patchValue(data);
        }
      },
      error: (err) => {
        console.error('Failed to load career profile', err);
      }
    });
  }

  onSubmit() {
    if (this.careerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.careerService.getRecommendations(this.careerForm.value).subscribe({
        next: (data) => {
          this.recommendations = data.recommendations;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to get recommendations. Please try again.';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }

  saveProfile() {
    if (this.careerForm.valid) {
      this.careerService.saveCareerProfile(this.careerForm.value).subscribe({
        next: () => {
          alert('Career profile saved successfully!');
        },
        error: (err) => {
          console.error('Failed to save career profile', err);
          alert('Failed to save career profile');
        }
      });
    }
  }
}


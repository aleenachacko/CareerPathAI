import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../services/resume-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-resume-builder',
  standalone: false,
  templateUrl: './resume-builder.html',
  styleUrl: './resume-builder.css'
})
export class ResumeBuilder implements OnInit {
  resumeForm: FormGroup;
  resumes: any[] = [];
  isEditing = false;
  currentResumeId: number | null = null;
  isLoading = false;
  errorMessage = '';
  userId: string | null = null;
 
  // Removed: sessionService is not injected and userId should be set in a method, not at class level
  

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    private authService: AuthService
  ) {
    this.resumeForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      experience: this.fb.array([]),
      education: this.fb.array([]),
      skills: this.fb.array([]),
      certifications: this.fb.array([])
    });
  }
  ngOnInit(): void {
    this.loadResumes();
  }

  loadResumes() {
    this.authService.getCurrentUser().subscribe({
      next: (user: any) => {
      
        this.userId = user?.id || null;
        if (this.userId) {
          this.resumeService.getResumes(this.userId).subscribe({
            next: (resumes) => {
              this.resumes = resumes;
            },
            error: (err) => {
              console.error('Failed to load resumes', err);
            }
          });
        } else {
          console.error('User ID is null, cannot load resumes.');
        }
      },
      error: (err) => {
        console.error('Failed to get current user', err);
      }
    });
  }

  onSubmit() {
    if (this.resumeForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const resumeData = this.resumeForm.value;
      // Do NOT set resumeData.userId, backend gets userId from authentication
      const operation = this.isEditing && this.currentResumeId
        ? this.resumeService.updateResume(this.currentResumeId, resumeData)
        : this.resumeService.createResume(resumeData);
      operation.subscribe({
        next: () => {
          this.loadResumes();
          this.resetForm();
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to save resume';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }

  editResume(resume: any) {
    this.isEditing = true;
    this.currentResumeId = resume.id;
    this.resumeForm.patchValue({
      title: resume.title,
      summary: resume.summary,
      // Patch other form arrays as needed
    });
  }

  deleteResume(id: number) {
    if (confirm('Are you sure you want to delete this resume?')) {
      this.resumeService.deleteResume(id).subscribe({
        next: () => {
          this.loadResumes();
        },
        error: (err) => {
          console.error('Failed to delete resume', err);
        }
      });
    }
  }

  resetForm() {
    this.resumeForm.reset();
    this.isEditing = false;
    this.currentResumeId = null;
  }
}

function getUserId(): string {
  throw new Error('Function not implemented.');
}

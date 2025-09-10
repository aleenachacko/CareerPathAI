import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { ResumeService } from '../../services/resume-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-resume-builder',
  standalone: false,
  templateUrl: './resume-builder.html',
  styleUrls: ['./resume-builder.css']
})
export class ResumeBuilder implements OnInit {
  resumeForm: FormGroup;
  resumes: any[] = [];
  isEditing = false;
  currentResumeId: number | null = null;
  isLoading = false;
  errorMessage = '';
  userId: string | null = null;

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

  // FormArray Getters
  get experience(): FormArray {
    return this.resumeForm.get('experience') as FormArray;
  }
  get education(): FormArray {
    return this.resumeForm.get('education') as FormArray;
  }
  get skills(): FormArray {
    return this.resumeForm.get('skills') as FormArray;
  }
  get certifications(): FormArray {
    return this.resumeForm.get('certifications') as FormArray;
  }

  // Add/Remove Helpers
  addItem(array: FormArray): void {
    array.push(this.fb.control(''));
  }

  removeItem(array: FormArray, index: number): void {
    array.removeAt(index);
  }

  loadResumes(): void {
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

  onSubmit(): void {
    if (this.resumeForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const resumeData = this.resumeForm.value;

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

  editResume(resume: any): void {
    this.isEditing = true;
    this.currentResumeId = resume.id;

    this.resumeForm.patchValue({
      title: resume.title,
      summary: resume.summary
    });

    this.setFormArray(this.experience, resume.experience);
    this.setFormArray(this.education, resume.education);
    this.setFormArray(this.skills, resume.skills);
    this.setFormArray(this.certifications, resume.certifications);
  }

  deleteResume(id: number): void {
    if (confirm('Are you sure you want to delete this resume?')) {
      this.resumeService.deleteResume(id).subscribe({
        next: () => this.loadResumes(),
        error: (err) => console.error('Failed to delete resume', err)
      });
    }
  }

  resetForm(): void {
    this.resumeForm.reset();
    this.experience.clear();
    this.education.clear();
    this.skills.clear();
    this.certifications.clear();
    this.isEditing = false;
    this.currentResumeId = null;
    this.errorMessage = '';
  }

  getFormControl(ctrl: AbstractControl): FormControl {
  return ctrl as FormControl;
}
  private setFormArray(array: FormArray, values: string[]): void {
    array.clear();
    values?.forEach(val => array.push(this.fb.control(val)));
  }
}
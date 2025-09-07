import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  user: any;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }
  ngOnInit(): void {
    this.loadUserProfile();
  }
  loadUserProfile() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        const userData = user as Record<string, any>;
        this.profileForm.patchValue({
          name: userData['name'],
          email: userData['email']
        });
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
      }
    });
  }
  updateProfile() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      this.userService.updateProfile(this.profileForm.value).subscribe({
        next: () => {
          this.successMessage = 'Profile updated successfully!';
          this.isLoading = false;
          this.loadUserProfile(); // Refresh user data
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Failed to update profile';
          this.isLoading = false;
        }
      });
    }
  }
  changePassword() {
    if (this.passwordForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      this.userService.changePassword(this.passwordForm.value).subscribe({
        next: () => {
          this.successMessage = 'Password changed successfully!';
          this.passwordForm.reset();
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Failed to change password';
          this.isLoading = false;
        }
      });
    }
  }
}

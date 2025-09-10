import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { UserService } from '../../services/user-service';
import { SessionService } from '../../SessionService';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  user: any;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  userId: string | null = null;

  // 👁️ Password visibility toggles
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private sessionService: SessionService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator = (group: FormGroup): ValidationErrors | null => {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  };

  ngOnInit(): void {
    this.userId = this.sessionService.getUserId();
    this.loadUserProfile();
  }

  loadUserProfile(): void {
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
        this.errorMessage = 'Unable to fetch user data.';
      }
    });
  }

  updateProfile(): void {
    if (!this.profileForm.valid || this.userId === null) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.updateProfile(this.userId, this.profileForm.value).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully!';
        this.loadUserProfile();
      },
      error: (err) => {
        console.error('Update error:', err);
        this.errorMessage = err.error?.message || 'Failed to update profile';
        this.isLoading = false;
      }
    });
  }

  changePassword(): void {
    if (!this.passwordForm.valid || this.userId === null) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.changePassword(this.userId!, this.passwordForm.value).subscribe({
      next: () => {
        this.successMessage = 'Password changed successfully!';
        this.passwordForm.reset();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Password change error:', err);
        this.errorMessage = err.error?.message || 'Failed to change password';
        this.isLoading = false;
      }
    });
  }
}
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CareerRecommendations } from './components/career-recommendations/career-recommendations';
import { ResumeBuilder } from './components/resume-builder/resume-builder';
import { SkillGapAnalysis } from './components/skill-gap-analysis/skill-gap-analysis';
import { Navbar } from './components/navbar/navbar';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Profile } from './components/profile/profile';
import { AuthService } from './services/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    CareerRecommendations,
    ResumeBuilder,
    SkillGapAnalysis,
    Navbar,
    Register,
    Home,
    Login,
    Dashboard,
    Profile
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    
  ],
  bootstrap: [App]
})
export class AppModule { }

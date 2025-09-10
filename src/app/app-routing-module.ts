import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { CareerRecommendations } from './components/career-recommendations/career-recommendations';
import { ResumeBuilder } from './components/resume-builder/resume-builder';
import { SkillGapAnalysis } from './components/skill-gap-analysis/skill-gap-analysis';
import { Profile } from './components/profile/profile';

const routes: Routes = [{ path: '', component: Home },
      { path: 'register', component: Register},
      { path: 'login', component: Login},
      { path: 'dashboard', component: Dashboard},
      { path: 'career-recommendations', component: CareerRecommendations },
      { path: 'resume-builder', component: ResumeBuilder},
      { path: 'skill-gap-analysis', component: SkillGapAnalysis},
      { path: 'profile', component: Profile},
      // { path: '**', redirectTo: '' }
       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

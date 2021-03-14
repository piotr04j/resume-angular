import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumeComponent } from './resume/resume/resume.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
    {
      path: 'resume-creator',
      loadChildren: () => import('./resume/resume.module').then( m => m.ResumeModule),
      canLoad: [AuthGuard]

    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

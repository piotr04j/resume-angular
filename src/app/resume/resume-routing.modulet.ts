import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResumeComponent } from './resume/resume.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: ResumeComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResumeRoutingModule { }

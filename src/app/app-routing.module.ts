import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './auth.guard';
import { TaskListComponent } from './components/task-list/task-list.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';


const routes: Routes = [
  {path:'', component	: TaskListComponent},
  {path:"projects", component: ProjectListComponent, canActivate:[AuthGuard]},
  {path:"projects/:id", component: ProjectDetailsComponent, canActivate:[AuthGuard]},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"welcome", component: WelcomeComponent, canActivate:[AuthGuard]},
  {path:"dashboard", component: TaskListComponent, canActivate:[AuthGuard]},
  {path:'**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

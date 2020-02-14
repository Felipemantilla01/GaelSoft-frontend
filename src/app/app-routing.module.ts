import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './auth.guard';
import { TaskListComponent } from './components/task-list/task-list.component';


const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"welcome", component: WelcomeComponent, canActivate:[AuthGuard]},
  {path:"dashboard", component: TaskListComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

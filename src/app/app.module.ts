import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TasksService } from './services/tasks.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MantillaModule } from 'mantilla'
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DialogComponent } from './components/task-list/dialog/dialog.component';
import { CommentsComponent } from './components/task-list/comments/comments.component';
import { DialogProjectComponent } from './components/task-list/dialog-project/dialog-project.component';
import { UsersService } from './services/users.service';
import { ProjectsService } from './services/projects.service';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    RegisterComponent,
    LoginComponent,
    WelcomeComponent,
    DialogComponent,
    CommentsComponent,
    DialogProjectComponent,
    PagenotfoundComponent
  ],
  entryComponents:[DialogComponent, DialogProjectComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MantillaModule,
    MatChipsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [UsersService,ProjectsService,TasksService, AuthService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

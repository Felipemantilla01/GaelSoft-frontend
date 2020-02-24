import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { DialogProjectComponent } from './dialog-project/dialog-project.component';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects:any
  ownProjects
  partProjects

  projectsdialog

  constructor(
    private _projectService : ProjectsService,
    private _router : Router,
    private dialog : MatDialog,
    private _authService : AuthService
  ) { }

  ngOnInit() {    

    let userId = this._authService.getUserId()

    this._projectService.getUserProjects(userId).subscribe(
      res=>{
        this.projects = res
        this.ownProjects = this.projects.ownProjects
        this.partProjects = this.projects.partProjects

        //console.log(this.ownProjects)
      },
      err=>console.log(err)
    )


    // this._projectService.getProjects().subscribe(
    //   projects =>  {
    //     this.projects = projects; 
    //     //console.log(this.projects)
    //   },
    //   err   =>  {
    //     if(err instanceof HttpErrorResponse){
    //       if(err.status === 401){
    //         this._router.navigate(['/login'])
    //       }
    //     }
    //   })
  }


  openNewProject(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true
    dialogConfig.width = "35%"

    this.dialog.open(DialogProjectComponent, dialogConfig);

  }

  onSelect(project_id){

    //console.log(project_id)
    this._router.navigate(['/projects',project_id])

  }

}

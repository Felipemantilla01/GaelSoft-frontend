import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-project',
  templateUrl: './dialog-project.component.html',
  styleUrls: ['./dialog-project.component.scss']
})
export class DialogProjectComponent implements OnInit {

  constructor(
    private _projectService: ProjectsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  createProject(description, name, repository){

    let project={
      description,
      name,
      repository
    }

    console.log(project)

    this._projectService.createProject(project).subscribe(
      res=>{
        this.openSnackBar('Project created successfully','Understood', 1000)

        setTimeout(() => {
          location.reload()
        }, 1000);
        
      },
      err=>console.log(err)
    )
  }


  openSnackBar(message: string, action: string, time:number) {
    this._snackBar.open(message, action, {
      duration: time,
    });
  }
  

}

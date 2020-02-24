import { Component, OnInit, Inject } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SprintService } from 'src/app/services/sprint.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-sprint',
  templateUrl: './dialog-sprint.component.html',
  styleUrls: ['./dialog-sprint.component.scss']
})
export class DialogSprintComponent implements OnInit {


  sprints

  times =[
    {'name': '1 day' },
    {'name': '3 days' },
    {'name': '5 days' },
    {'name': '1 week' },
    {'name': '2 week' },    
  ]


  constructor(
    private _projectService : ProjectsService,
    private _router : Router,
    private _sprintService : SprintService,
    public dialogRef: MatDialogRef<DialogSprintComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }

  createSprint(name,description,duration){
    let sprint= {
      name,
      description,
      project:{
        _id:this.data._id,
      },
      duration
    }
    //console.log(sprint)

    this._projectService.createSprint(sprint).subscribe(
      res => console.log(res),
      err => console.log(err)
      )
  }
}

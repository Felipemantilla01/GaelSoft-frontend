import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TasksService } from 'src/app/services/tasks.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.scss']
})
export class DialogTaskComponent implements OnInit {


  users
  projects
  Type=""

  public taskTypes =[
    {name:"Story", icon:"amp_stories"},
    {name:"Task", icon:"receipt"},
    {name:"Epic", icon:"looks"},
    {name:"Bug", icon:"bug_report"}
  ]
  public prioritys =[
    {name:"Highest", icon:"stars", color:"primary"},
    {name:"Medium", icon:"star", color:"warn"},
    {name:"Low", icon:"start_border", color:"accent"},
    {name:"Lowest", icon:"star_half", color:""}
  ]

  constructor(
    private _usersService: UsersService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _taskService : TasksService,
    private _projectService : ProjectsService,
    public dialogRef: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this._usersService.getUsers().subscribe(
      users =>  {
        this.users = users
        //console.log(users)
      },
      err   =>  {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['/login'])
          }
        }
      })

      this._projectService.getProjects().subscribe(
        projects =>  this.projects = projects,
        err   =>  {
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this._router.navigate(['/login'])
            }
          }
        })
   
  }
  
  createNew(description,type,priority,assignee,title){    

    if(!!description && !!type && !!priority && !!assignee && !!title){
      
      let task = {
        title,
        description,
        project:{
          _id: this.data._id
        },
        type,
        priority,
        assignee:{
          _id:assignee
        }
      }      

      //console.log(task)
      this._taskService.createTask(task).subscribe(
        res => {
          this.openSnackBar('Task created', 'Understood', 1000)
          setTimeout(() => {
            location.reload()
          }, 500);
        } ,
        err   =>  {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['/login'])
          }
          if(err.status === 500){
            this.openSnackBar('Error creating task, try again', 'Understood', 2000)
          }
        }
      })      
    
    }else{
      this.openSnackBar('Error creating task, try again', 'Understood', 2000)
    }

  }

  openSnackBar(message: string, action: string, time:number) {
    this._snackBar.open(message, action, {
      duration: time,
    });
  }
  
}
import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks:any[] // deberia llevar una interfaz para mejorar el tratamiento de los datos

  constructor(
    private _tasksService : TasksService,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getTasks()
  }

  private getTasks(){
    this._tasksService.getTasks().subscribe(
      tasks =>  this.tasks = tasks,
      err   =>  {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['/login'])
          }
        }
      })
  }

  openNewTask(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true
    dialogConfig.width = "35%"

    let dialogRef = this.dialog.open(DialogComponent,dialogConfig)
  }

  changeState(state, _id){
    //console.log(state, taskId)
    let task={
      _id,
      state
    }
    this._tasksService.updateTask(task).subscribe(
      res=> this.getTasks(),
      err => console.log(err)
      )
  }


  deleteTask(_id){

    let task={
      _id
    }
    let response = confirm('Are you sure?')
    if(response){
      console.log(task)
      this._tasksService.deleteTask(task).subscribe(
        res=> this.getTasks(),
        err => console.log(err)
      )
    }
  }

  addComment(_id){
    let comment = prompt('Add new Task comment or advance')
    if(!!comment){
      let task ={
        _id,
        comment
      }
      this._tasksService.createComment(task).subscribe(
        res=> this.getTasks(),
        err => console.log(err)
        )
    }
  }


}

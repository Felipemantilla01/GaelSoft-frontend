import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

@Input() projectId : string
@Input() projectLead : string
project:any
tasks:any

  constructor(
    private _taskService: TasksService,
    private _route: ActivatedRoute,
    private _projectService: ProjectsService,
    private _authService:AuthService
  ){
    
  }

  ngOnInit(){

    this.getTasks()
  }


  todo = [];
  inProgress = [];
  done = [];

  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    console.log(event.previousContainer.element.nativeElement.id)
    console.log(event.container.element.nativeElement.id)
    console.log(event.item.element.nativeElement.id)
    console.log(this.todo)

    let previous = event.previousContainer.element.nativeElement.id
    let current = event.container.element.nativeElement.id
    let _id = event.item.element.nativeElement.id

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      switch(previous){
        case 'todo':
          if (current === 'inProgress') { this.changeContainer(event, _id, current) }
          break;
        case 'inProgress':
          if (current === 'done') { this.changeContainer(event, _id, current) }
          break;
        default:
          
          break;
      }
      
    }
  }


  changeContainer(event, _id, state){
    
    let task={
      _id,
      state
    }
    this._taskService.updateTask(task).subscribe(
      res=> {
        this.done=[]
        this.inProgress=[]
        this.todo=[]
        this.getTasks()
      },
      err => console.log(err)
      )
      
    transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);                          
  }

  pushTasks(tasks){
    tasks.forEach(task => {
      if(task.state.todo.state==='active'){this.todo.push(task)}
      if(task.state.inProgress.state==='active'){this.inProgress.push(task)}
      if(task.state.done.state==='active'){this.done.push(task)}
    });
  }


  getTasks(){
    const id: string = this._route.snapshot.params.id; 
    //console.log(id)
    this._projectService.getProject(id).subscribe(
      res=>{
        
        this.project = res
        let userId = this._authService.getUserId()
        //console.log(userId)
        if(userId===this.project.lead){
          console.log('same lead?',true, 'all project tasks')
          this._taskService.getProjectTasks(this.project._id).subscribe(
            tasks=>{
              this.pushTasks(tasks)
            },
            err=>console.log(err)
          )
        }else{
          console.log('same lead?',false, 'only user project tasks')
          this._taskService.getUserTasks(userId,this.project._id).subscribe(
            tasks=>{

              this.pushTasks(tasks)
            },
            err=>console.log(err)
          )
        }
      },
      err=>console.log(err)
    )
  }



}
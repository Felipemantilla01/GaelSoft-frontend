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

  todo = [];
  inProgress = [];
  done = [];

  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    console.log(event.previousContainer.element.nativeElement)

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }


  pushTasks(tasks){
    tasks.forEach(task => {
      if(task.state.todo.state==='active'){this.todo.push(task)}
      if(task.state.inProgress.state==='active'){this.inProgress.push(task)}
      if(task.state.done.state==='active'){this.done.push(task)}

    });
  }



}
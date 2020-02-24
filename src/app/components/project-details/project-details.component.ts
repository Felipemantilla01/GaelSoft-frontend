import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DialogSprintComponent } from './dialog-sprint/dialog-sprint.component';
import { DialogTaskComponent } from './dialog-task/dialog-task.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

 /**@params arreglo de sprints relacionados con el proyecto */
sprints
 /**@params id del proyecto para futuras peticiones */
_id
 /**@params proyecto */
project:any ={
  name:'Loading...'
}

  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectsService,
    private dialog: MatDialog,
  ) {
    const id: string = _route.snapshot.params.id;  
    this._id = id
     this._projectService.getProject(id).subscribe(project=>{
      this.project = project
      //console.log(project)
     },
     err=>console.log(err))

     this._projectService.getSprints(id).subscribe(res=>{
      this.sprints = res      
      //console.log(this.sprints)
    }, err =>{
      console.log(err)
    })
   }

  ngOnInit() {    
    
  }




  openNewSprint(){

    //console.log(this.project)
    let dialogRef = this.dialog.open(DialogSprintComponent, {
      autoFocus:true,
      width :"35%",
      data:this.project
    });
    

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
             
      }
    })

  }


  openNewTask(){

    let dialogRef = this.dialog.open(DialogTaskComponent,{
      autoFocus:true,
      width :"35%",
      data:this.project
    });    

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
             
      }
    })
  }








}

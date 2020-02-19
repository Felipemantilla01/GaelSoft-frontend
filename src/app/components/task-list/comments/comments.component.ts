import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { TasksService } from 'src/app/services/tasks.service';

export interface IComment {
  at:String, // have change to Date
  message:String
}


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

@Input() _id:string // se recibe el id de la tarea para traer los comentarios de la misma

ELEMENT_DATA:IComment[] = [
  {at:'123123123', message:'sdasdoaisdoiasjdijas ddasidja sdiasd n asuh asdb uasdh aisudh asduih asduih as daisuh dasdh aiush ad auishdaushd '},
  {at:'1231231asd', message:'hola mundo 2'},
  {at:'123123547234', message:'hola mundo 3'},
]
COMMENTS

displayedColumns: string[] = ['Date', 'Message'];
dataSource

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  constructor(
    private _taskService :TasksService
  ) {
    
  }

  ngOnInit() {
    //console.log(this._id)
    this._taskService.getComments(this._id).subscribe(
      res=> {
        this.COMMENTS = res
        this.dataSource = new MatTableDataSource(this.COMMENTS);
      
    },
      err=>console.log(err)
      )
    
  }

}

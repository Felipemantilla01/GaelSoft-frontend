import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
    console.log(this.taskTypes)
  }

  createNew(){
    console.log('hola')
  }
}

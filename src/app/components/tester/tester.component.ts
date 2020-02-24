import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss']
})
export class TesterComponent implements OnInit {

  time =[
    {'name': '1 hour', 'value': 1},
    {'name': '3 hours', 'value': 3},
    {'name': '5 hours', 'value': 5},
    {'name': '7 hours', 'value': 7},
    {'name': '1 day', 'value': 1},
    {'name': '3 days', 'value': 3},
    {'name': '5 days', 'value': 5},
  ]

  constructor() { }

  ngOnInit() {
  }

}

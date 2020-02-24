import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSprintComponent } from './dialog-sprint.component';

describe('DialogSprintComponent', () => {
  let component: DialogSprintComponent;
  let fixture: ComponentFixture<DialogSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

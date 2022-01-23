import { EditTaskComponent } from './edit-task/edit-task.component';
import { AppConstants } from './../../../../utils/app.constants';
import { FirebaseTaskService } from './../../../../services/firebase-task.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  public tasks: any[] = [];
  private taskListSubscriber: Subscription;
  private projectidSubscriber: Subscription;
  private projectid: string = null;
  constructor(
    private _dialog: MatDialog,
    private _taskService: FirebaseTaskService
  ) {}

  ngOnInit(): void {
    this.projectidSubscriber = this._taskService
      .getCurrentActiveProject(localStorage.getItem(AppConstants.USER_ID))
      .subscribe((project) => {
        console.log(project);
        this.projectid = project[0].project_id;
        console.log(this.projectid);

        this.taskListSubscriber = this._taskService
          .getAllTask(
            this.projectid,
            localStorage.getItem(AppConstants.USER_ID)
          )
          .subscribe((tasks) => {
            console.log(tasks);

            this.tasks = tasks;
          });
      });
  }

  addTask() {
    let dialogRef = this._dialog.open(AddTaskComponent, {
      data: this.projectid,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  editTask(task) {
    let dialogRef = this._dialog.open(EditTaskComponent, {
      data: task,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  delete(taskid) {
    this._taskService.deleteTask(taskid);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.taskListSubscriber.unsubscribe();
    this.projectidSubscriber.unsubscribe();
  }
}

import { AppConstants } from './../../../../utils/app.constants';
import { FirebaseProjectService } from 'src/app/services/firebase-project.service';
import { FirebaseTaskService } from './../../../../services/firebase-task.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
// ];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public totalProjects: number = 0;
  public totalTasks: number = 0;
  public totalPendingTasks: number = 0;
  public totalCompletedTasks: number = 0;
  private projectListSubscription: Subscription;
  private taskListSubscription: Subscription;
  private activeProjectListSubscription: Subscription;
  public taskList: any[] = [];
  private projectid: string = null;
  displayedColumns: string[] = ['task_name', 'task_description', 'task_status'];
  dataSource = [];
  constructor(
    private _projectService: FirebaseProjectService,
    private _taskService: FirebaseTaskService
  ) {}

  ngOnInit(): void {
    this.projectListSubscription = this._projectService
      .getAllProjects(localStorage.getItem(AppConstants.USER_ID))
      .subscribe((projects) => {
        console.log('project list ', projects);
        this.totalProjects = projects.length;
      });
    this.activeProjectListSubscription = this._taskService
      .getCurrentActiveProject(localStorage.getItem(AppConstants.USER_ID))
      .subscribe((project) => {
        console.log(project);
        this.projectid = project[0].project_id;
        console.log(this.projectid);

        this.taskListSubscription = this._taskService
          .getAllTask(
            this.projectid,
            localStorage.getItem(AppConstants.USER_ID)
          )
          .subscribe((tasks) => {
            this.totalCompletedTasks = 0;
            this.totalPendingTasks = 0;
            this.totalTasks = tasks.length;
            console.log('task list ', tasks);
            tasks.map((task) => {
              if (task.task_status === 'Completed') {
                this.totalCompletedTasks++;
              } else {
                this.totalPendingTasks++;
              }
            });
            if (tasks.length > 6) {
              this.taskList = tasks.slice(0, 6);
            } else {
              this.taskList = tasks;
            }
            this.dataSource = this.taskList;
          });
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.projectListSubscription.unsubscribe();
    this.taskListSubscription.unsubscribe();
    this.activeProjectListSubscription.unsubscribe();
  }
}

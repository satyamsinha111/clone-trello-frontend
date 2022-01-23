import { Task } from './../shared/models/task.model';
import { AppConstants } from 'src/app/utils/app.constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class FirebaseTaskService {
  constructor(private db: AngularFireDatabase) {}

  getCurrentActiveProject(userid: string): Observable<any> {
    return new Observable((observer) => {
      this.db
        .list('/projects')
        .valueChanges()
        .subscribe((data) => {
          let activeProject = data.filter(
            (project: any) =>
              project.is_active === true && project.user_id === userid
          );
          observer.next(activeProject);
        });
    });
  }

  createTask(userid, projectid, task: Task): Promise<any> {
    return new Promise((resolve, reject) => {
      let taskid = uuidv4();
      this.db.database
        .ref(`/tasks/${taskid}`)
        .set({
          task_id: taskid,
          project_id: projectid,
          task_name: task.name,
          task_description: task.description,
          task_status: task.status,
          user_id: userid,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateTask(taskid: string, task: Task): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .object(`/tasks/${taskid}`)
        .update({
          task_name: task.name,
          task_description: task.description,
          task_status: task.status,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteTask(taskid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .object(`/tasks/${taskid}`)
        .remove()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getAllTask(projectid: string, userid: string): Observable<any> {
    return new Observable((observer) => {
      this.db
        .list(`/tasks`)
        .valueChanges()
        .subscribe((tasks) => {
          let currentProjectTasks = tasks.filter(
            (task: any) =>
              task.project_id === projectid && task.user_id === userid
          );
          observer.next(currentProjectTasks);
        });
    });
  }
}

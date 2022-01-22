import { AppConstants } from 'src/app/utils/app.constants';
import { Project } from './../shared/models/project.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class FirebaseProjectService {
  constructor(private db: AngularFireDatabase) {}

  createProject(userid: string, projectData: Project) {
    return new Promise((resolve, reject) => {
      let projectid: string = uuidv4();
      this.db.database
        .ref(`/projects/${projectid}`)
        .set({
          project_id: projectid,
          project_name: projectData.name,
          project_status: projectData.status,
          is_active: projectData.isactive,
          description: projectData.description,
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

  makeProjectActive(projectid: string, value: boolean): Promise<any> {
    console.log(value, projectid);

    return new Promise((resolve, reject) => {
      this.db
        .object(`/projects/${projectid}`)
        .update({
          is_active: value,
        })
        .then((response) => {
          localStorage.setItem(AppConstants.CURRENT_ACTIVE_PROJECT, projectid);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateProject(projectid: string, projectData: Project) {
    console.log(projectData, projectid);

    return new Promise((resolve, reject) => {
      this.db
        .object(`/projects/${projectid}`)
        .update({
          project_id: projectid,
          project_name: projectData.name,
          project_status: projectData.status,
          description: projectData.description,
        })
        .then((response) => {
          console.log(response);

          resolve(response);
        })
        .catch((error) => {
          console.log(error);

          reject(error);
        });
    });
  }

  getAllProjects(userid: string): Observable<any> {
    console.log(userid);
    return new Observable((observer) => {
      this.db
        .list('/projects')
        .valueChanges()
        .subscribe((data) => {
          let curentUserProjects = data.filter(
            (v: any, i) =>
              v.user_id === localStorage.getItem(AppConstants.USER_ID)
          );
          observer.next(curentUserProjects);
        });
    });
  }

  deleteProject(projectId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .object(`/projects/${projectId}`)
        .remove()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

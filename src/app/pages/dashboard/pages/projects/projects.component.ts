import { EditProjectComponent } from './edit-project/edit-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FirebaseProjectService } from 'src/app/services/firebase-project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstants } from 'src/app/utils/app.constants';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  public projects: any[] = [];
  constructor(
    private _firebaseProjectService: FirebaseProjectService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._firebaseProjectService
      .getAllProjects(localStorage.getItem(AppConstants.USER_ID))
      .subscribe((projects) => {
        console.log(projects);

        this.projects = projects;
      });
  }

  delete(projectid: string) {
    this._firebaseProjectService.deleteProject(projectid);
  }

  makeActive(value: boolean, projectid: string) {
    if (value) {
      this._firebaseProjectService.makeProjectActive(projectid, false);
    } else {
      this._firebaseProjectService.makeProjectActive(projectid, true);
    }
  }

  editProject(project) {
    // console.log(project);
    let dialogRef = this._dialog.open(EditProjectComponent, {
      data: project,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  addProject() {
    let dialogRef = this._dialog.open(AddProjectComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}

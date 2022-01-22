import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppConstants } from './../../../../../utils/app.constants';
import { Project } from './../../../../../utils/app.model';
import { FirebaseProjectService } from './../../../../../services/firebase-project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  public projectStatus: string[] = [
    'Started',
    'Ongoing',
    'Completed',
    'On review',
    'Delayed',
    'Closed',
  ];
  public projectForm: FormGroup;
  public projectData: Project = {
    name: '',
    description: '',
    isactive: false,
    status: '',
  };
  public isLoading: boolean = false;

  constructor(
    private _firebaseProjectService: FirebaseProjectService,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<AddProjectComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      projectStatus: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    // console.log('data submitted', this.projectForm.value);
    this.projectData.name = this.projectForm.value.name;
    this.projectData.status = this.projectForm.value.projectStatus;
    this.projectData.description = this.projectForm.value.description;
    this.projectData.isactive = false;
    this._firebaseProjectService
      .createProject(
        localStorage.getItem(AppConstants.USER_ID),
        this.projectData
      )
      .then((response) => {
        console.log(response);
        this._snackBar.open('Project created successfully', 'OK');
        this._dialogRef.close();
      })
      .catch((error) => {
        console.log(error);
        this._snackBar.open('Project creation failed', 'OK');
      });
  }
}

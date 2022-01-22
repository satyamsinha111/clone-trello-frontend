import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseProjectService } from 'src/app/services/firebase-project.service';
import { Project } from 'src/app/utils/app.model';
import { AddProjectComponent } from '../add-project/add-project.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
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
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {}

  ngOnInit(): void {
    console.log(this.inputData);

    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      projectStatus: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.projectForm.patchValue({
      name: this.inputData.project_name,
      projectStatus: this.inputData.project_status,
      description: this.inputData.description,
    });
  }
  onSubmit() {
    console.log(this.projectForm.value);
    this.projectData.name = this.projectForm.value.name;
    this.projectData.description = this.projectForm.value.description;
    this.projectData.status = this.projectForm.value.projectStatus;
    this._firebaseProjectService
      .updateProject(this.inputData.project_id, this.projectData)
      .then((response) => {
        this._dialogRef.close(true);
      });
  }
}

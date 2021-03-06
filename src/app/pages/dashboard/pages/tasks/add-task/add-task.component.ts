import { AppConstants } from './../../../../../utils/app.constants';
import { FirebaseTaskService } from './../../../../../services/firebase-task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  public taskStatus: string[] = [
    'Started',
    'Ongoing',
    'Completed',
    'On review',
    'Delayed',
    'Closed',
  ];

  public taskForm: FormGroup;
  private taskData: Task = {
    name: '',
    description: '',
    status: '',
    projectid: '',
    userid: '',
  };

  constructor(
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<AddTaskComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    private _taskService: FirebaseTaskService
  ) {}

  ngOnInit(): void {
    console.log(this.inputData);

    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.taskForm.value);
    this.taskData.name = this.taskForm.value.name;
    this.taskData.status = this.taskForm.value.status;
    this.taskData.description = this.taskForm.value.description;
    this._taskService
      .createTask(
        localStorage.getItem(AppConstants.USER_ID),
        this.inputData,
        this.taskData
      )
      .then((response) => {
        this._snackBar.open('Task added successfully', 'OK');
        this._dialogRef.close(true);
      })
      .catch((error) => {
        this._snackBar.open('Task adding failed', 'OK');
        this._dialogRef.close(true);
      });
  }
}

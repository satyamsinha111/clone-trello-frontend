import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/shared/models/task.model';
import { AppConstants } from './../../../../../utils/app.constants';
import { FirebaseTaskService } from './../../../../../services/firebase-task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
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
    private _dialogRef: MatDialogRef<EditTaskComponent>,
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
    this.taskForm.patchValue({
      name: this.inputData.task_name,
      status: this.inputData.task_status,
      description: this.inputData.task_description,
    });
  }

  onSubmit() {
    console.log(this.taskForm.value);
    this.taskData.name = this.taskForm.value.name;
    this.taskData.status = this.taskForm.value.status;
    this.taskData.description = this.taskForm.value.description;
    this._taskService
      .updateTask(this.inputData.task_id, this.taskData)
      .then(() => {
        this._dialogRef.close(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

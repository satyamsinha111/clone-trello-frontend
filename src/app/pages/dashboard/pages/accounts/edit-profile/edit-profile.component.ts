import { AppConstants } from './../../../../../utils/app.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseAuthService } from './../../../../../services/firebase-auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public profileForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<EditProfileComponent>,
    private _authService: FirebaseAuthService,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      address: new FormControl('', [Validators.required]),
      profession: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
    });
    this.profileForm.patchValue({
      address: this.inputData.address,
      profession: this.inputData.profession,
      companyName: this.inputData.companyName,
    });
  }

  onSave() {
    console.log(this.profileForm.value);
    this._authService
      .updateUser(
        localStorage.getItem(AppConstants.USER_ID),
        this.profileForm.value
      )
      .then((res) => {
        this._dialogRef.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

import { AppConstants } from './../../../../utils/app.constants';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { UploadResumeComponent } from './upload-resume/upload-resume.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  private _userIdSubscription: Subscription;
  public userData: string[] = [];
  constructor(
    private _dialog: MatDialog,
    private _authService: FirebaseAuthService
  ) {}

  ngOnInit(): void {
    this._userIdSubscription = this._authService
      .getUserById(localStorage.getItem(AppConstants.USER_ID))
      .subscribe((data) => {
        console.log(data);
        this.userData = data;
      });
  }

  onEdit() {
    let dialogRef = this._dialog.open(EditProfileComponent, {
      data: {
        address: this.userData[0],
        profession: this.userData[2],
        companyName: this.userData[1],
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.ngOnInit();
    });
  }

  onResumeUpload() {
    let dialogRef = this._dialog.open(UploadResumeComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.ngOnInit();
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._userIdSubscription.unsubscribe();
  }
}

import { MatDialogRef } from '@angular/material/dialog';
import { AppConstants } from './../../../../../utils/app.constants';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { FileUploadService } from './../../../../../services/file-upload.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-resume',
  templateUrl: './upload-resume.component.html',
  styleUrls: ['./upload-resume.component.scss'],
})
export class UploadResumeComponent implements OnInit {
  public filename: string = null;
  public fileObj: File;
  private _fileUploadSubscription: Subscription;
  public downloadUrl: string = null;
  public isLoading: boolean = false;
  constructor(
    private _fileUpload: FileUploadService,
    private _authService: FirebaseAuthService,
    private _dialogRef: MatDialogRef<UploadResumeComponent>
  ) {}

  ngOnInit(): void {}

  onFileChange(ev) {
    this.fileObj = ev.target.files[0];
    this.filename = this.fileObj.name;
  }

  onFileUpload() {
    this.isLoading = true;
    this._fileUploadSubscription = this._fileUpload
      .uploadResume(this.fileObj)
      .subscribe((data) => {
        console.log(data);
        this.downloadUrl = data;
        this.isLoading = false;
      });
  }

  onSave() {
    this._authService
      .updateResume(
        localStorage.getItem(AppConstants.USER_ID),
        this.downloadUrl
      )
      .then((res) => {
        this._dialogRef.close(true);
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._fileUploadSubscription.unsubscribe();
  }
}

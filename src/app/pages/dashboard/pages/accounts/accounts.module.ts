import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { MatCardModule } from '@angular/material/card';
import { UploadResumeComponent } from './upload-resume/upload-resume.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AccountsComponent,
    UploadResumeComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFileUploadModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
})
export class AccountsModule {}

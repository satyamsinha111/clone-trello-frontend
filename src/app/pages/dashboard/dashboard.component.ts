import { AppConstants } from './../../utils/app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public displayName: string = '';
  constructor(
    private router: Router,
    private _authService: FirebaseAuthService,
    private _matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._authService.userData.subscribe((data) => {
      // console.log(data.multiFactor.user);
      if (data) {
        this.displayName = data.multiFactor.user.displayName;
        localStorage.setItem(AppConstants.USER_ID, data.multiFactor.user.uid);
      }
      if (data === null) {
        localStorage.clear();
        this.router.navigate(['login']);
      }
    });
  }

  jumpToPage(routename: string, menuid: number) {
    switch (menuid) {
      case 0:
        this.router.navigate([routename]);
        break;
      case 1:
        this.router.navigate([routename]);
        break;
      case 2:
        this.router.navigate([routename]);
        break;
      case 3:
        this.router.navigate([routename]);
        break;
      case 4:
        this._authService
          .userSignout()
          .then((res) => {
            this._matSnackBar.open('Logged out successfully', 'OK');
          })
          .catch((error) => {
            this._matSnackBar.open('Logged out successfully', 'OK');
          });
        break;
      default:
        break;
    }
  }
}

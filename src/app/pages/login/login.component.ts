import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup | undefined;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private authService: FirebaseAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.authService.userData.subscribe((data) => {
      if (data) {
        this._router.navigate(['/dashboard/home']);
      }
    });
  }

  onLogin(ev: any) {
    console.log(this.loginForm?.value, ev.target.value);
    this.authService
      .loginUser(this.loginForm?.value.email, this.loginForm.value.password)
      .then((response) => {
        this._matSnackBar.open('Logged in successfully', 'OK');
      })
      .catch((error) => {
        this._matSnackBar.open('Logged in failed', 'OK');
      });
  }
}

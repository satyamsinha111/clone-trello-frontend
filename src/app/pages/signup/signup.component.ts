import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup | undefined;

  constructor(
    private _authService: FirebaseAuthService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this._authService.userData.subscribe((data) => {
      // console.log(data);
      if (data) {
        this._router.navigate(['/dashboard/home']);
      }
    });
  }

  onSignup() {
    console.log(this.signupForm?.value);
    this._authService
      .userSignup(
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.username
      )
      .then((res) => {
        console.log(res);
        this._snackBar.open('Signup successfully!!', 'OK');
        this._router.navigate(['login']);
      })
      .catch((error) => {
        console.log(error);
        this._snackBar.open('Signup failed', 'OK');
      });
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  public userData: Observable<any>;
  constructor(
    private _angularAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.userData = this._angularAuth.authState;
  }

  userSignout() {
    return new Promise((resolve, reject) => {
      this._angularAuth
        .signOut()
        .then((_) => {
          resolve({
            message: 'User signed out successfully',
          });
        })
        .catch((_) => {
          reject({
            message: 'Signing out user failed',
          });
        });
    });
  }

  userSignup(email: string, password: string, username: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._angularAuth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          let userid = response.user.uid;
          console.log(response.user.uid);
          response.user
            .updateProfile({
              displayName: username,
            })
            .then((response) => {
              this.writeUserData(userid, username)
                .then((response) => {
                  resolve({
                    message: 'Signed up user successfully',
                  });
                })
                .catch((error) => {
                  console.log(error);
                  reject(error);
                });
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  writeUserData(user_id: string, username: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.database
        .ref('/user/' + user_id)
        .set({
          username: username,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  loginUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._angularAuth
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

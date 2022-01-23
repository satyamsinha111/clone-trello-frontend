import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private _fireStorage: AngularFireStorage) {}

  uploadResume(fileObj: any): Observable<any> {
    return new Observable((observer) => {
      let filename = Date.now() + '_resume';
      let filepath = `user_resume/${filename}`;
      let fileref = this._fireStorage.ref(filepath);
      const task = this._fireStorage.upload(filepath, fileObj);
      task.snapshotChanges().subscribe((data) => {
        console.log(data);
        fileref.getDownloadURL().subscribe((data) => {
          observer.next(data);
        });
      });
    });
  }
}

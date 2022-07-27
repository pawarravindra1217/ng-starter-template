import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserInterface } from '../interfaces/user-interface';
import * as auth from 'firebase/auth';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Router } from '@angular/router';
import { AuthStringConstants } from '../utils/auth-string-constants';
import { LoginDataInterface } from '../interfaces/login-data-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any;
  constructor(
      public _afs: AngularFirestore, 
      public _afAuth: AngularFireAuth, 
      public _router: Router,
      public _ngZone: NgZone,
      public _localStorageService: LocalStorageService
    ) {
      this._afAuth.authState.subscribe((user) => {
        if(user) {
          this.userData = user;
          localStorage.setItem(AuthStringConstants.LOCAL_STORAGE_CONSTANTS.USER, JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem(AuthStringConstants.LOCAL_STORAGE_CONSTANTS.USER)!);
        } else {  
          localStorage.setItem(AuthStringConstants.LOCAL_STORAGE_CONSTANTS.USER, 'null');
          JSON.parse(localStorage.getItem(AuthStringConstants.LOCAL_STORAGE_CONSTANTS.USER)!);
        }
      })
    }
  // Sign in with email/password
  SignIn(body: LoginDataInterface) {
    return this._afAuth
      .signInWithEmailAndPassword(body.email, body.password)
      .then((result) => {
        this._ngZone.run(() => {
          this._router.navigate(['/features/home/dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(body: LoginDataInterface) {
    return this._afAuth
      .createUserWithEmailAndPassword(body.email, body.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this._afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this._router.navigate(['/features/verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this._afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(AuthStringConstants.LOCAL_STORAGE_CONSTANTS.USER)!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this._router.navigate(['/features/home/dashboard']);
      }
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this._afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this._ngZone.run(() => {
          this._router.navigate(['/features/home/dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this._afs.doc(
      `users/${user.uid}`
    );
    const userData: UserInterface = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this._afAuth.signOut().then(() => {
      localStorage.removeItem(AuthStringConstants.LOCAL_STORAGE_CONSTANTS.USER);
      this._router.navigate(['/features/login']);
    }).catch((err) => {console.log(err.message)});
  }
}

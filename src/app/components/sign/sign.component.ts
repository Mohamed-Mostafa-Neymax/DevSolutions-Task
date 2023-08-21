import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SignService, User } from 'src/app/services/sign.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  signupForm!: FormGroup;
  isLoginMode = false;
  hidePassword = true;
  authObservable!: Observable<any>;

  constructor(private router: Router, private signService: SignService) {}
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });
  }
  
  toggleFormStatusHandler() {
    this.isLoginMode = !this.isLoginMode;
    if( this.isLoginMode ) 
      this.signupForm.removeControl('email');
    else 
      this.signupForm.addControl('email', new FormControl(null, Validators.required));
  }

  submitHandler() {
    if( this.isLoginMode ) {
      this.authObservable = this.signService.login(this.signupForm.value);
    }
    else {
      // this.authObservable = this.signService.signup(this.signupForm.value);
    }

    this.isLoginMode && this.authObservable.subscribe(
        resData => {
          localStorage.setItem('username', (<FormControl>this.signupForm.get('username')).value);
          localStorage.setItem('token', resData.token);
          this.signService.tokenSubject.next(resData.token);
          this.router.navigate(['/board']);
        },
        errData => {
          console.log(errData);
        }
      )
  }
}

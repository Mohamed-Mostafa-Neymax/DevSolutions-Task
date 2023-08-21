import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
    username: 'string';
    email?: 'string';
    password: 'string';
}

@Injectable({ providedIn: 'root' })
export class SignService {
    constructor(private http: HttpClient) {}
    tokenSubject = new BehaviorSubject<string | null>(null);


    // signup(signupData: User) {
    //     return this.http.post<User>('https://fakestoreapi.com/users', signupData);
    // }

    login(loginData: User) {
        return this.http.post('https://fakestoreapi.com/auth/login', loginData);
    }
}
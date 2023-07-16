/**
 * Based on
 * https://github.com/cornflourblue/angular-7-jwt-authentication-example
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '.';
import { UserProfileModel } from '../../shared/models';




export interface ApplicationUser {
	accessToken: string;
	expiresIn: number;
	user?: UserProfileModel;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private currentUserSubject: BehaviorSubject<ApplicationUser>;
	public currentUser: Observable<ApplicationUser>;

	constructor(private readonly http: HttpClient, private apiServices: ApiService) {
		this.currentUserSubject = new BehaviorSubject<ApplicationUser>(
			JSON.parse(localStorage.getItem('currentUser') || '{}')
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): ApplicationUser {
		return this.currentUserSubject.value;
	}

	login(email: string, password: string) {
		return this.apiServices.post<any>('auth/login', { email, password }).pipe(
			map(auth => {
				// login successful if there's a jwt token in the response
				if (auth && auth.accessToken) {
					// store; user; details; and; jwt; token in local
					// storage; to; keep; user; logged in between; page; refreshes;
					localStorage.setItem('currentUser', JSON.stringify(auth));
					this.currentUserSubject.next(auth);
				}

				return auth;
			})
		);
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		const userEmpty: ApplicationUser = {
			accessToken: '',
			expiresIn: 0,
			user: {
				avatar: '',
				email: '',
				firstName: '',
				fullName: '',
				id: '',
				isActive: false,
				lastName: '',
				phone: '',
				userName: '',
				userRole: [],
			}
		};
		this.currentUserSubject.next(userEmpty);
	}
}

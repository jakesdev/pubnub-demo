import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../endpoints';
// import { AppNotify } from '../utils';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient, private router: Router) { }

  get<T>(url: string, showErrMessage?: boolean): Observable<T> {
    return this.httpClient
      .get<T>(`${API_URL}/${url}`)
      .pipe(
        catchError((error) => this.handleError(error, url, showErrMessage))
      );
  }
  getWithOptions<T>(url: string, params: {}): Observable<T> {
    return this.httpClient
      .get<T>(`${API_URL}/${url}`, { params })
      .pipe(catchError((error) => this.handleError(error, url)));
  }
  post<T>(url: string, data: any, showErrMessage?: boolean): Observable<T> {
    console.log(data);
    return this.httpClient
      .post<T>(`${API_URL}/${url}`, data)
      .pipe(
        catchError((error) => {
          return this.handleError(error, url, showErrMessage);
        })
      );
  }


  postFile<T>(
    url: string,
    files: File[],
    showErrMessage?: boolean
  ): Observable<HttpEvent<T>> {
    const formData: FormData = new FormData();
    for (const file of files) {
      formData.append(file.name, file, file.name);
    }
    const uploadReq = new HttpRequest('POST', `${API_URL}/${url}`, formData, {
      reportProgress: true,
    });

    return this.httpClient.request(uploadReq);
  }

  update<T>(url: string, data: any, showErrMessage?: boolean): Observable<T> {
    return this.httpClient
      .patch<T>(`${API_URL}/${url}`, data)
      .pipe(
        catchError((error) => this.handleError(error, url, showErrMessage))
      );
  }

  delete<T>(
    url: string,
    data?: any | null,
    showErrMessage?: boolean
  ): Observable<T> {
    return this.httpClient
      .delete<T>(`${API_URL}/${url}`, {
        body: data,
      })
      .pipe(
        catchError((error) => this.handleError(error, url, showErrMessage))
      );
  }

  private handleError(
    response: HttpErrorResponse,
    requestUrl?: string,
    showErrMessage?: boolean
  ) {
    //
    if (response.status === 403) {
      return throwError(response.error.message);
    }
    //
    if (response.status === 500) {
      let error = response.error ? response.error.message : response.statusText;
      if (!error) {
        error = 'Internal Server Error';
      }
      if (showErrMessage) {
        // AppNotify.error(error);
      }

      return throwError(response);
    }
    //
    let messageError = '';
    if (response.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', response.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${response.status}, ` +
        `body was: ${response.error}`
      );
    }

    if (!!response.error && !!response.error.message) {
      messageError = response.error.message;
    } else {
      messageError = 'Something Bad Happened';
    }
    if (showErrMessage) {
      // AppNotify.error(messageError);
    }

    // return an observable with a user-facing error message
    return throwError(response?.error);
  }

  navigateToLogin(callbackUrl = false) {
    let pathname = window.location.pathname;
    if (pathname === '/' || pathname === '/login') {
      pathname = '';
    }
    //
    //
    if (pathname && callbackUrl) {
      // window.location.href = `${AppUrl.Login}?callback=${callback}`;
      this.router.navigate([ `/login` ], {
        queryParams: { callback: encodeURIComponent(window.location.href) },
      });
    } else {
      // window.location.href = `${AppUrl.Login}`;
      this.router.navigate([ `/login` ]);
    }
  }
}

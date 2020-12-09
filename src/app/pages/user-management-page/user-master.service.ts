import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { User } from '../../dto/user';
import { TokenStorage } from 'src/app/token.storage';


@Injectable({
  providedIn: 'root'
})
export class UserMasterService {
  url = "http://192.168.1.97:9090"
  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {

  }

  private handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public attemptAuth(ussername: string, password: string): Observable<any> {
    var observableObject;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const credentials = { username: ussername, password: password };
    console.log("sent Data: " + credentials.username + ", " + credentials.password);
    console.log('attempAuth ::');

    return this.http.post<any>(this.url + '/token/generate-token', credentials, httpOptions).pipe(catchError((error) => { return this.handleError(error); }));
  }

  getAllUsers(): Observable<any> {
    let token = this.tokenStorage.getToken();
    const headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Authorization': 'Bearer ' + token })
    return this.http.get<User[]>(this.url + "/User/GetAll", { headers: headers, responseType: 'json' }).pipe(catchError(this.handleError));
  }

  deleteUserById(userId: number) {
    let token = this.tokenStorage.getToken();
    const headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Authorization': 'Bearer ' + token })
    return this.http.post(this.url + "/User/Delete", null, { headers: headers, params: { id: userId.toString() }, responseType: 'json' }).pipe(catchError(this.handleError));
  }

  addUser(user: User) {
    let token = this.tokenStorage.getToken();
    const headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    return this.http.post(this.url + "/User/signup", user, { headers: headers, responseType: 'json' }).pipe(catchError(this.handleError));
  }

  updateUser(user: User) {
    let token = this.tokenStorage.getToken();
    const headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.post(this.url + "/User/Update", user, { headers: headers, responseType: 'json' }).pipe(catchError(this.handleError));
  }
}

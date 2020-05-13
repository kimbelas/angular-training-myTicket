import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  isLogged = new Subject();
  onHttpLogin = new Subject();
  onHttpGetTicket = new Subject();
  onHttpGetTicketById = new Subject();
  onHttpGetProfile = new Subject();
  onHttpUpdateProfile = new Subject();

  loginUrl = 'https://api-ubertickets.codestalk.dev/v1/auth/login';
  profileUrl = 'https://api-ubertickets.codestalk.dev/v1/users/my';
  ticketUrl = 'https://api-ubertickets.codestalk.dev/v1/tickets/my?exclude_signature=1';
  ticketByIdUrl = 'https://api-ubertickets.codestalk.dev/v1/tickets/my/';

  constructor(private http: HttpClient) { }

  httpLogin(data) {
    this.http.post(this.loginUrl, data).subscribe(
      (response: any) => {

        this.onHttpLogin.next(response);
      }
    );
  }

  httpGetProfile() {
    const token = this.getToken();

    this.http.get(this.profileUrl, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe((response: any) => {
      
      this.onHttpGetProfile.next(response);
    });
  }

  httpUpdateProfile(data) {
    const token = this.getToken();

    this.http.put(this.profileUrl, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe((response: any) => {

      this.onHttpUpdateProfile.next(response);
    });
  }

  httpGetTickets() {
    const token = this.getToken();

    this.http.get(this.ticketUrl, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe((response: any) => {

      this.onHttpGetTicket.next(response);
    });
  }

  httpGetTicketById(id) {
    const token = this.getToken();

    this.http.get(this.ticketByIdUrl+id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe((response: any) => {
      
      this.onHttpGetTicketById.next(response);
    });
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  checkLogStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
  
  loggedIn() {
    return !!localStorage.getItem('token');
  }
}

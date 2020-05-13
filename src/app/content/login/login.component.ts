import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription, of } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  subscribeOnLogged = new Subscription();
  subscribe1 = new Subscription();

  constructor(private service: GlobalService, private router: Router, private titleService: Title) {
    this.titleService.setTitle("MyTicket | Login");
  }

  ngOnInit(): void {
    this.subscribeOnLogged = this.service.onHttpLogin.subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.service.storeToken(response.data.token);
          this.service.isLogged.next(true);
          this.router.navigate(['/'], {});
          
          setTimeout(()=> {
            swal.close();
            swal.fire({
              icon: 'success',
              title: 'Logged In Successfully!'
            });
          }, 400);
        }
      }
    );
  }

  login() {
    if (this.loginForm.valid) {
      swal.showLoading();
      this.service.httpLogin(this.loginForm.value);
    } else if (this.loginForm.value.username === "" || this.loginForm.value.password === "") {
      swal.fire({
        icon: 'warning',
        title: 'Form Field required',
        text: "Please complete all required fields"
      });
    } else {
      swal.fire({
        icon: 'error',
        title: 'Invalid form',
        text: "Please input valid data"
      });
    }
  }

  ngOnDestroy() {
    this.subscribeOnLogged.unsubscribe();
  }
}

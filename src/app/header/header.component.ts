import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'My Ticket';
  isLogged = false;
  subscribe = new Subscription();
  constructor(private service : GlobalService, private router : Router) { }

  ngOnInit(): void {
    this.subscribe = this.service.isLogged.subscribe(
      (logged : boolean) => {
        this.isLogged = logged;
      }
    );
    this.service.checkLogStatus();
  }

  logout() {
    swal.showLoading();
    this.service.deleteToken();
    setTimeout(()=> {
      swal.close();
      swal.fire({
        icon: 'success',
        title: 'Logged Out Successfully!'
      });
    }, 400);
    
    this.router.navigate(['login'], {});
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}

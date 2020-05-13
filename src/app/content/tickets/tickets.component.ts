import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalService } from 'src/app/services/global.service';
import swal from 'sweetalert2'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, OnDestroy {
  tickets = [];
  isLogged = false;

  subscribe = new Subscription();

  constructor(private titleService : Title, private service : GlobalService) { 
    this.titleService.setTitle("MyTicket | Tickets");
  }

  ngOnInit(): void {
    this.subscribe = this.service.isLogged.subscribe(
      (logged : boolean) => {
        swal.showLoading();
        this.isLogged = logged;
        
        if(this.isLogged === false) {
          setTimeout(()=> {
            swal.close();
            swal.fire({
              icon: 'error',
              title: 'An Error Occured',
              text: 'Unauthorized Access!'
            });
          }, 200);
        }
      }
    );
    this.service.checkLogStatus();

  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}

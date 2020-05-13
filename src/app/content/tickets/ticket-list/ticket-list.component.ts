import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit, OnDestroy {
  subscriptionOnHttpGetTicket = new Subscription();

  tickets = [];
  constructor(private service : GlobalService) { }

  ngOnInit(): void {
    this.service.httpGetTickets();

    this.subscriptionOnHttpGetTicket = this.service.onHttpGetTicket.subscribe(
      (response : any) => {
        if (response.status === 'success') {
          swal.close();
          this.tickets = response.data;
          console.log('onHttpGetTicket', this.tickets);
        } 
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionOnHttpGetTicket.unsubscribe();
  }

}

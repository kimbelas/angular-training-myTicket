import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {
  subscriptionOnHttpGetTicketById = new Subscription();

  ticket;
  constructor(private service : GlobalService, private router : ActivatedRoute) { }

  ngOnInit(): void {
    const routerId = this.router.snapshot.params.id;
    this.service.httpGetTicketById(routerId);

    this.subscriptionOnHttpGetTicketById = this.service.onHttpGetTicketById.subscribe(
      (response: any) => {
        if(response.status === 'success') {
          swal.close();
          this.ticket = response.data;
          console.log(this.ticket);
        } else {
          swal.fire(
            'An Error Occured',
            response.message,
            'error'
          );
        }
      }
    );
  }
}

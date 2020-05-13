import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  alias;
  constructor(private titleService : Title, private service : GlobalService) { 
    this.titleService.setTitle("MyTicket | Home");
  }

  ngOnInit(): void {
    this.alias = '';
    this.service.httpGetProfile();

    this.service.onHttpGetProfile.subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.alias = response.data.alias
        }
    });
  }

}

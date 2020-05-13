import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLogged = false;

  constructor(private service : GlobalService) { }

  ngOnInit(): void {
    this.service.isLogged.subscribe(
      (logged : boolean) => {
        this.isLogged = logged;
      }
    );
    this.service.checkLogStatus();
  }
}

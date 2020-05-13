import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  subscriptionOnHttpGetProfile = new Subscription();
  userInfo:any = [{
    image: '',
    name: '',
    jobTitle: '',
    email: '',
    mobileNo: ''
  }];

  isLogged = false;

  constructor(private service : GlobalService) { }

  ngOnInit(): void {
    this.service.isLogged.subscribe(
      (logged : boolean) => {
        this.isLogged = logged;
      }
    );
    this.service.checkLogStatus();

    this.service.httpGetProfile();

    this.subscriptionOnHttpGetProfile = this.service.onHttpGetProfile.subscribe(
      (response : any) => {
        this.userInfo.image = response.data.meta.photo_url;
        this.userInfo.name = response.data.name;
        this.userInfo.jobTitle = response.data.meta.job_title;
        this.userInfo.email = response.data.email;
        this.userInfo.mobileNo = response.data.meta.mobile_number;
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionOnHttpGetProfile.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2'; 
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm;

  subscriptionOnHttpGetProfile = new Subscription();

  constructor(private service : GlobalService, private titleService : Title) {
    this.titleService.setTitle("MyTicket | My Profile"); 
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      alias: new FormControl('', [Validators.required]),
      jobTitle: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNumber: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
    
    this.service.httpGetProfile();

    this.subscriptionOnHttpGetProfile = this.service.onHttpGetProfile.subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.fillForm(response.data);
          console.log(response);
          
        }
      }
    );
  }

  
  fillForm(data) {
    this.profileForm.patchValue({
      firstName: data.meta.first_name,
      lastName: data.meta.last_name,
      alias: data.alias,
      jobTitle: data.meta.job_title,
      email: data.email,
      mobileNumber: data.meta.mobile_number,
      // password
    });
  }

  onUpdate() {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.value;
      console.log(formValues);
      
      const formValuesUpdated = {
        alias: formValues.alias,
        email: formValues.email,
        meta: {
          first_name: formValues.firstName,
          last_name: formValues.lastName,
          job_title: formValues.jobTitle,
          mobile_number: formValues.mobileNumber,
          timezone: 'Asia/Manila'
        }
      };
      console.log(formValuesUpdated);
      this.service.httpUpdateProfile(formValuesUpdated);
      swal.fire({
        icon: 'success',
        title: 'Successfully updated'
      });
      this.service.httpGetProfile();
    }
  }

  ngOnDestroy() {
    this.subscriptionOnHttpGetProfile.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { apiResponce,constant } from '../constant';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userId: null;
  userData: null;
  imageUrl = constant.imageUrl;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router : Router

  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params.userId;
      if (this.userId)
        this.getUser();
    })
  }

  getUser() {
    let postData = {
      userId: this.userId
    }
    this.apiService.userById(postData).subscribe((responce: apiResponce) => {
      this.userData = responce.data;
    })
  }

  redirect(){
    this.router.navigate(['/user-list'])
  }

}

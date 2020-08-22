import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { apiResponce } from '../constant';
import {constant} from '../constant'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: [];
  imageUrl = constant.imageUrl;
  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getAllUser();
  }

  redirect() {
    this.router.navigate(['/add-user'])
  }

  getAllUser() {
    this.apiService.getUser().subscribe((responce: apiResponce) => {
      this.users = responce.data;
    })
  }

  viewDetail(userId) {
    this.router.navigate(['user-details', { userId: userId }])

  }

  editUser(userId) {
    this.router.navigate(['add-user', { userId: userId }])
  }

  deleteUser(userId) {

    let postData = {
      userId: userId
    }
    this.apiService.deleteUser(postData).subscribe((responce) => {
      this.getAllUser();
    })

  }

}

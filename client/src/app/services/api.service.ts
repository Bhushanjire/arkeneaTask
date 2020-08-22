import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constant } from '../constant/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }


  addUser(data) {
    return this.httpClient.post(constant.baseUrl + 'add-user', data);
  }

  getUser() {
    return this.httpClient.get(constant.baseUrl + 'user-list');
  }

  updateUser(data) {
    return this.httpClient.put(constant.baseUrl + 'update-user', data)
  }

  userById(data) {
    return this.httpClient.post(constant.baseUrl + 'user-by-id', data);
  }

  deleteUser(data) {
    return this.httpClient.post(constant.baseUrl + 'delete-user', data);
  }
}

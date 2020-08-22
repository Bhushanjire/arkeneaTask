import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { apiResponce } from '../constant';
import { LoaderService } from '../services/loader.service';
import { constant } from '../constant';


@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss']
})
export class AddUpdateUserComponent implements OnInit {

  userForm: FormGroup;
  successMessage = null;
  errorMessage = null;
  userId: null;
  imagePath: null;
  imgURL: any;
  imageUrl = constant.imageUrl;
  isNewPhoto = false;
  userData = null;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService
  ) {

    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mobileNoReg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    this.userForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      emailId: new FormControl(null, [Validators.required, Validators.pattern(emailReg)]),
      mobileNo: new FormControl(null, [Validators.required, Validators.pattern(mobileNoReg)]),
      photo: new FormControl(''),
    })

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params.userId;
      if (this.userId)
        this.getUser();
    })
  }

  addUser() {
    this.userForm.markAllAsTouched();

    if (this.isNewPhoto) {
      this.userForm.value['photo'] = this.imgURL;
    } else {
      delete this.userForm.value.photo;
    }

    if (this.userForm.valid) {

      try {
        this.loaderService.show();
        if (this.userId) {
          let postData = {
            userId: this.userId,
            userData: this.userForm.value
          }



          this.apiService.updateUser(postData).subscribe((responce: apiResponce) => {
            this.loaderService.hide();
            if (responce.isSuccess) {
              this.successMessage = responce.message
              setTimeout(() => {
                this.successMessage = null;
              }, 3000);
            } else {
              this.errorMessage = responce.message
              setTimeout(() => {
                this.errorMessage = null;
              }, 3000);
            }
          })

        } else {
          this.apiService.addUser(this.userForm.value).subscribe((responce: apiResponce) => {
            this.loaderService.hide();
            if (responce.isSuccess) {
              this.successMessage = responce.message;
              this.userForm.reset();
              this.imgURL = null;
              setTimeout(() => {
                this.successMessage = null;
              }, 3000);
            } else {
              this.errorMessage = responce.message
              setTimeout(() => {
                this.errorMessage = null;
              }, 3000);
            }

          })
        }
      } catch (error) {

      }

    } else {
      console.log('Form is invalid');

    }
  }

  getUser() {
    let postData = {
      userId: this.userId
    }
    this.apiService.userById(postData).subscribe((responce: apiResponce) => {
      if (responce.isSuccess) {
        if (responce.data.photo) {
          this.imgURL = this.imageUrl + responce.data.photo;
        } else {
          this.imgURL = null;
        }
        this.userData = responce.data;
        this.userForm.patchValue(responce.data)
      }
    })
  }

  redirect() {
    this.router.navigate(['/user-list'])
  }

  fileChanged(event) {
    const file = event.target.files[0]
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.isNewPhoto = true;
    }
  }
}

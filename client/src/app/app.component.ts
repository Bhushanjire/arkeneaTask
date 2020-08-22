import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private loaderService: LoaderService) {

  }
  loader: boolean;
  ngOnInit() {
    this.loaderService.loaderStatus.subscribe((status) => {
      this.loader = status
    })
  }

}

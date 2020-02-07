import { Component, OnInit, NgZone } from '@angular/core';
import { TuvansaService } from 'src/app/services/tuvansa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(private tuvansaService:TuvansaService, private router:Router, private ngZone:NgZone){ 

  }

  ngOnInit() {
  }

  logout(){
    this.tuvansaService.logout()
  }

}

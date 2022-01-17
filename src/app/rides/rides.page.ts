import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.page.html',
  styleUrls: ['./rides.page.scss'],
})
export class RidesPage implements OnInit {
  tabView: any = 1;
  constructor() { }

  ngOnInit() {
  }

  viewTab(tabIndex){
    this.tabView = tabIndex;
  }

}

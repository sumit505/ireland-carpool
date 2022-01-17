import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  tabView = 1;
  constructor() { }

  ngOnInit() {
  }

  viewTab(tabIndex){
    this.tabView = tabIndex;
  }

}

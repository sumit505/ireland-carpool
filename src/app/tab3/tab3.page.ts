import { Component } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userData: any;
  constructor(private commonService: CommonService, private navCtrl: NavController) {}

  ngOnInit(){
    this.userData = this.commonService.getUserData() || JSON.parse(sessionStorage.getItem('userData'));
  }


  profileEdit(){
    this.navCtrl.navigateForward('/profile-edit');
  }

  openPage(routeToPage){
    this.navCtrl.navigateForward(routeToPage);
  }

  logout(){
    sessionStorage.removeItem('userData');
    this.navCtrl.navigateRoot('/login');
  }
}

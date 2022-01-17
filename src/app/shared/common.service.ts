import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userData: any;
  constructor(private toastController: ToastController) { }

  async toastMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  
  setUserData(userInfo){
    this.userData = userInfo;
    sessionStorage.setItem('userData', JSON.stringify(this.userData));
  }

  getUserData(){
    return this.userData || JSON.parse(sessionStorage.getItem('userData'));
  }

}

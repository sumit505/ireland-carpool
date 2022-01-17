import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginView: boolean = true;
  getUsers: any = [];
  constructor(private navCtrl: NavController, private firestore: AngularFirestore, private commonService: CommonService) {
    this.loginForm = new FormGroup({
      mobileNo: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.registerForm = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      registerMobileNo: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      registerPassword: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
    this.firestore.collection('users').get().subscribe(res => {
      this.getUsers = res.docs.map(item => item.data());
    });
  }

  toggleView(){
    this.isLoginView = !this.isLoginView;
  }

  register(registerFormData){
    if(registerFormData && registerFormData.valid){
        // check if user already present
        let isUserPresent = this.getUsers.find(list => list.mobileNo == registerFormData.value.registerMobileNo);
        if(isUserPresent){
          this.commonService.toastMessage('User Already Present!');
        }else {
          let profileObj = {
            fullname: registerFormData.value.fullname,
            mobileNo: registerFormData.value.registerMobileNo,
            emailId: registerFormData.value.emailId,
            gender: registerFormData.value.gender,
            password: registerFormData.value.registerPassword,
            emergencyMobileNo: '',
            profilePhoto: '',
            myRole: 'car',
            fireBaseId: '',
          }
  
          this.firestore.collection('users').add(profileObj).then(response => {
            if(response){
              profileObj.fireBaseId = response.id;
              this.firestore.doc('users/'+response.id).update(profileObj).then(updateRes => {
                this.commonService.toastMessage('Welcome to Ireland Carpool');
                this.commonService.setUserData(profileObj);
                this.navCtrl.navigateRoot('/tabs');
              })
            }
          })
        }


    }else {
      this.commonService.toastMessage('Please fill the required fields');
    }

  }

  submitLogin(loginFormData){
    if(loginFormData.valid){
      if(this.getUsers && this.getUsers.length){
        let isUserPresent = this.getUsers.find(list => list.mobileNo == loginFormData.value.mobileNo && list.password == loginFormData.value.password);
        if(isUserPresent){
          this.commonService.setUserData(isUserPresent);
          this.navCtrl.navigateRoot('/tabs');
        }else {
          this.commonService.toastMessage('User not found. Please enter valid details');
        }
      }else {
        this.commonService.toastMessage('User not found. If new user please register');
      }
    }
  }

}

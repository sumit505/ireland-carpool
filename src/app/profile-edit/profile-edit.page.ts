import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonService } from '../shared/common.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  profileForm: FormGroup;
  userData: any;
  fileName: any;
  constructor(private firestore: AngularFirestore, private commonService: CommonService, private actionSheetController: ActionSheetController) {
    this.profileForm = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      emergencyMobileNo: new FormControl(''),
      emailId: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      registerPassword: new FormControl('', [Validators.required]),
      profilePhoto: new FormControl(''),
      myRole: new FormControl(''),
      fireBaseId: new FormControl(''),
    })
  }

  ngOnInit() { 
  //  this.userData = this.commonService.getUserData();
  let getUserData =  JSON.parse(sessionStorage.getItem('userData'));
   if(getUserData && getUserData.fireBaseId){
     this.firestore.collection('users').get().subscribe(res => {
       this.userData = res.docs.map(list => list.data()).find(item => item['fireBaseId'] == getUserData.fireBaseId);
        if(this.userData){
          this.profileForm.patchValue({
          fullname: this.userData.fullname,
          mobileNo: this.userData.mobileNo,
          emergencyMobileNo: this.userData.emergencyMobileNo || '',
          emailId: this.userData.emailId,
          gender: this.userData.gender,
          registerPassword: this.userData.password,
          profilePhoto: this.userData.profilePhoto,
          myRole: this.userData.myRole,
          fireBaseId: this.userData.fireBaseId,
          })
          this.fileName = this.userData.profilePhoto;
        };
     })
   }


  }

  updateProfile(profileFormData){
    if(profileFormData.valid){

      profileFormData.value.profilePhoto = this.fileName != null ? this.fileName : profileFormData.value.profilePhoto;

      this.firestore.doc('users/'+profileFormData.value.fireBaseId).update(profileFormData.value).then(res => {
        console.log(res, 'response');
        this.commonService.setUserData(profileFormData.value);
        this.commonService.toastMessage('Profile updated successfully');
      })
    }
  }



  async uploadNewFile() {
    let inputNode = document.createElement("input");
    inputNode.setAttribute("type", "file");
    inputNode.setAttribute("accept", "image/png, image/jpg");
    inputNode.setAttribute("style", "position: relative; z-index: 99999; width: 100%; height: 100%; opacity: 0; top: -50px");
    inputNode.addEventListener("change", (event) => { this.uploadProfilePhoto(event) });
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload File',
      cssClass: 'my-custom-class',
      buttons: [ {
        text: 'Gallery',
        icon: 'image-outline',
        handler: () => {
        }
      },
       {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present().then(() => {
      actionSheet.querySelectorAll("button")[0].appendChild(inputNode);
    });

    await actionSheet.onDidDismiss().then(() => {
      inputNode.removeEventListener("change", (event) => { this.uploadProfilePhoto(event) });
    });
  }

  uploadProfilePhoto(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    if(file && file.size < 1000000){
      reader.readAsDataURL(file);
      reader.onload = () => {
          console.log(reader.result, 'base64');
          this.fileName = reader.result;
          this.userData.profilePhoto = reader.result;
      };
    }else {
      this.commonService.toastMessage('File size should not be more than 1MB');
    }
  
  }

}

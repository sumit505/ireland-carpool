import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.page.html',
  styleUrls: ['./verify-account.page.scss'],
})
export class VerifyAccountPage implements OnInit {
  document: any;
  fileName: any;
  constructor() { }

  ngOnInit() {
  }

  loadFile(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result, 'base64');
        this.fileName = reader.result;
    };
  }

}

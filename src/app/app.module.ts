import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CommonService } from './shared/common.service';


const firebaseConfig = {
  apiKey: "AIzaSyB5THy8DmTODi1VZ1Xmq85XvOeSTKUFex4",
  authDomain: "carpool-6b145.firebaseapp.com",
  projectId: "carpool-6b145",
  storageBucket: "carpool-6b145.appspot.com",
  messagingSenderId: "902100594110",
  appId: "1:902100594110:web:d9ff51100925c8d4aa9def",
  measurementId: "G-YDRDTPFD05"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CommonService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

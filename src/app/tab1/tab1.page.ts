import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { CommonService } from '../shared/common.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  map: any;
  rideType = 1;
  bookingDate: any;
  bookingTime: any;
  minDate: any;
  minTime: any;
  seatValue : number = 1;
  icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      // specify the path here
      iconUrl: '/assets/marker-icon.png',
      shadowUrl: '/assets/marker-shadow.png'
   })
};
  constructor(private commonService: CommonService) {}

  ngOnInit(){
    console.log(window, 'window');

    let date = new Date();
    this.bookingDate = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate();
    this.minDate = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate();

    this.bookingTime = date.getHours() + ':' + date.getMinutes();
    this.minTime = date.getHours() + ':' + date.getMinutes();
    // window.navigator.geolocation.getCurrentPosition((positions) => {
   
     
    // }, error => {
    //   console.log(error, 'get current location error');
    // })

    
    // this.map = L.map('map-container', {
    //   center: [53.35269639953139, -6.268811132521372],
    //   zoom: 20
    // });
    
    this.map = L.map('map-container');

    setTimeout(() => {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 3,
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      console.log(L, 'leaflet');



      L.Routing.control({
        fitSelectedRoutes: true,
        waypoints: [
          L.latLng(53.35269639953139, -6.268811132521372),
          L.latLng(53.36311613451685, -6.221465230936673)
        ],
        // geocoder: L.Control.Geocoder.nominatim()
      }).addTo(this.map);

      L.marker([53.35269639953139, -6.268811132521372], this.icon).addTo(this.map);
      L.marker([53.36311613451685, -6.221465230936673], this.icon).addTo(this.map);
    }, 2000);

  }

  selectRide(rideId){
    this.rideType = rideId;
  }

  removeSeat(){
    if(this.seatValue > 1){
      --this.seatValue;
    }else {
      this.commonService.toastMessage('Minimum 1 Seat is mandatory');
    }
  }

  addSeat(){
    if(this.seatValue < 6) {
      ++this.seatValue;
    }else {
      this.commonService.toastMessage('Maximum 6 Seat are allowed');
    }
  }

}

import { Component } from '@angular/core';
// declare const orService: any;
import * as L from 'leaflet';
import 'leaflet-routing-machine';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor() {}
  ngOnInit(){
 
    const map: L.Map = L.map('initialize');
    // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors'
    // }).addTo(map);

    // L.Routing.control({
    //   router: L.Routing.osrmv1({
    //     serviceUrl: `http://router.project-osrm.org/route/v1/`
    //   }),
    //   showAlternatives: true,
    //   // lineOptions: { styles: [{color: '#242c81', weight: 7}]},
    //   fitSelectedRoutes: false,
    // // altLineOptions: {styles: [{color: '#ed6852', weight: 7}]},
    //   show: true,
    //   routeWhileDragging: true,
    //   waypoints: [
    //       L.latLng(57.74, 11.94),
    //       L.latLng(57.6792, 11.949)
    //   ]
    // });


   
    
  }
}

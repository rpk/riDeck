import { Component, HostListener, OnInit } from '@angular/core';

declare var require;
//const data = require('./manhattan.json');
const data = require('./center.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
/*
 // This is the viewport for manhattan.json
 // This gives a better idea of how the webgl layers don't align, but trickier to debug.
  viewport: any = {
    longitude: -74,
    latitude: 40.7,
    zoom: 11,
    minZoom: 1,
    maxZoom: 25,
    pitch: 0,
    bearing: 0,
    width: 1200,
    height: 800
  };
  data = data;
*/
  // Viewport for center.json. Produces a google maps embed fixed at the 0,0 with a gmaps marker at 0,0.
  // The data file also draws a scatterplot dot a 0,0, but you can see that it is offset
  // from gmaps center, and moves around based on zoom level.
  viewport: any = {
    longitude: 0,
    latitude: 0,
    zoom: 10,
    minZoom: 1,
    maxZoom: 25,
    pitch: 0,
    bearing: 0,
    width: 1200,
    height: 800
  };
  data = data;
  ngOnInit() {

  }

}

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';

import {default as ScreenGridLayer} from 'deck.gl/dist-es6/layers/core/screen-grid-layer/screen-grid-layer';
import {default as ScatterplotLayer} from 'deck.gl/dist-es6/layers/core/scatterplot-layer/scatterplot-layer';

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

// const elevationScale = {min: 1, max: 50};

@Component({
  selector: 'ri-ng-deck-overlay',
  templateUrl: './ng-deck-overlay.component.html',
  styleUrls: ['./ng-deck-overlay.component.css']
})
export class NgDeckOverlayComponent implements OnInit, OnDestroy, OnChanges {
  @Input() data: any[] = [];
  @Input() viewport: any;

  @Input() width: number;
  @Input() height: number;
  @Input() longitude: any;
  @Input() latitude: any;
  @Input() zoom: any;
  @Input() minZoom: any;
  @Input() maxZoom: any;
  @Input() pitch: any;
  @Input() bearing: any;

  public layers: any[] = [];
  public radius: any = 1000;
  public upperPercentile: any = 100;
  public coverage: any = 1;

  private startAnimationTimer: any = null;
  private intervalTimer: any = null;
  private state: any = {
  };

  constructor() {
  }

  ngOnInit() {
    if (null == this.viewport && (null == this.width || null == this.height)) {
      throw new Error('Attribute \'viewport\' or \'height\' and \'width\' is required');
    }
    this.render();
  }

  ngOnDestroy() {
  }

  ngOnChanges(nextProps) {
    this.render();
  }

  _initialize(gl) {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }

  render() {
    const MALE_COLOR = [0, 128, 255];
    const FEMALE_COLOR = [255, 0, 128];
    
    this.layers = [
      new ScatterplotLayer({
        id: 'scatter-plot',
        data: this.data,
        radiusScale: 30,
        radiusMinPixels: 0.25,
        getPosition: d => [d[0], d[1], 0],
        getColor: d => d[2] === 1 ? MALE_COLOR : FEMALE_COLOR,
        getRadius: d => 1,
        updateTriggers: {
          getColor: {c1: MALE_COLOR, c2: FEMALE_COLOR}
        }
      })
    ];
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { NgForm } from '@angular/forms';

import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  
  //
  time: number = 0;
  interval: any;

  // public cookieExists: boolean = this.cookieService.hasKey("cameraDetail")

  // initial settings
  public cameraDetail: number = this.cookieService.hasKey("cameraDetail")?Number(this.getCookie("cameraDetail")):1;
  public downloadAsJpg: boolean = this.cookieService.hasKey("downloadAsJpg")?this.getCookie("downloadAsJpg")=='true':true; // as jpg, if false download as png
  public mirrorImage: boolean = this.cookieService.hasKey("mirrorImage")?this.getCookie("mirrorImage")=='true':true;
  public autoDownload: boolean = this.cookieService.hasKey("autoDownload")?this.getCookie("autoDownload")=='true':false;

  // MediaTrackConstraints settings https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints
  public whiteBalanceMode: String = this.cookieService.hasKey("whiteBalanceMode")?String(this.getCookie("whiteBalanceMode")):'none'; // A String specifying one of "none", "manual", "single-shot", or "continuous".
  public exposureMode: String = this.cookieService.hasKey("exposureMode")?String(this.getCookie("exposureMode")):'none';   // A String specifying one of "none", "manual", "single-shot", or "continuous".
  public focusMode: String = this.cookieService.hasKey("focusMode")?String(this.getCookie("focusMode")):'none';      // A String specifying one of "none", "manual", "single-shot", or "continuous".
  // public pointsOfInterest: // The pixel coordinates on the sensor of one or more points of interest. This is either an object in the form { x:value, y:value } or an array of such objects, where value is a double-precision integer.
  // public exposureCompensation: ConstrainDouble //  A ConstrainDouble (a double-precision integer) specifying f-stop adjustment by up to ±3.
  // public colorTemperature: ConstrainDouble// A ConstrainDouble (a double-precision integer) specifying a desired color temperature in degrees kelvin.
  // public iso: ConstrainDouble             // A ConstrainDouble (a double-precision integer) specifying a desired iso setting.
  // public brightness: ConstrainDouble      // A ConstrainDouble (a double-precision integer) specifying a desired brightness setting.
  // public contrast: ConstrainDouble        // A ConstrainDouble (a double-precision integer) specifying the degree of difference between light and dark.
  // public saturation: ConstrainDouble      // A ConstrainDouble (a double-precision integer) specifying the degree of color intensity.
  // public sharpness: ConstrainDouble       // A ConstrainDouble (a double-precision integer) specifying the intensity of edges.
  // public focusDistance: ConstrainDouble   // A ConstrainDouble (a double-precision integer) specifying distance to a focused object.
  // public zoom: ConstrainDouble            // A ConstrainDouble (a double-precision integer) specifying the desired focal length.
  // public torch: boolean            // A boolean value defining whether the fill light is continuously connected, meaning it stays on as long as the track is active.
  

  // form initial content
  public settingsData = {
    "cameraDetail":this.cameraDetail,
    "downloadAsJpg":this.downloadAsJpg,
    "mirrorImage":this.mirrorImage,
    "autoDownload":this.autoDownload
  };

  constructor(private cookieService: CookieService) { }
  
  //https://github.com/salemdar/ngx-cookie#get
  getCookie(key: string){
    return this.cookieService.get(key);
  }

  //https://github.com/salemdar/ngx-cookie#put
  setCookie(key: string, value: Object){
    if (typeof(value)=="boolean"){
      return this.cookieService.put(key,value?'true':'false');
    }
    return this.cookieService.put(key,String(value));
  }

  //https://medium.com/@coolchoudharyvijay/use-webcam-in-angular-simplified-c1ee012e875f

  //videoOptions: MediaTrackConstraints
  //mirrorImage: string | WebcamMirrorProperties
  //imageType: string = 'image/jpeg'
  //imageQuality: number = 0.92 //Must be a number between 0..1. Default is 0.92.

  //https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints
  //MediaTrackConstraints 
  // whiteBalanceMode : A String specifying one of "none", "manual", "single-shot", or "continuous".
  // exposureMode     : A String specifying one of "none", "manual", "single-shot", or "continuous".
  // focusMode        : A String specifying one of "none", "manual", "single-shot", or "continuous".
  // pointsOfInterest : The pixel coordinates on the sensor of one or more points of interest. This is either an object in the form { x:value, y:value } or an array of such objects, where value is a double-precision integer.
  // exposureCompensation :  A ConstrainDouble (a double-precision integer) specifying f-stop adjustment by up to ±3.
  // colorTemperature : A ConstrainDouble (a double-precision integer) specifying a desired color temperature in degrees kelvin.
  // iso              : A ConstrainDouble (a double-precision integer) specifying a desired iso setting.
  // brightness       : A ConstrainDouble (a double-precision integer) specifying a desired brightness setting.
  // contrast         : A ConstrainDouble (a double-precision integer) specifying the degree of difference between light and dark.
  // saturation       : A ConstrainDouble (a double-precision integer) specifying the degree of color intensity.
  // sharpness        : A ConstrainDouble (a double-precision integer) specifying the intensity of edges.
  // focusDistance    : A ConstrainDouble (a double-precision integer) specifying distance to a focused object.
  // zoom             : A ConstrainDouble (a double-precision integer) specifying the desired focal length.
  // torch            : A boolean value defining whether the fill light is continuously connected, meaning it stays on as long as the track is active.
  
  async ngOnInit() {
    // this.cameraDetail = Number(this.getCookie("cameraDetail"));

  }

  public example = "init"

  public settingsSubmit(form: NgForm): void {
    this.settingsData = form.value
    
    // debugger 
    console.log('Settings: ', this.settingsData);
    // alert("Submited"+String( form.value.cameraDetail));

    this.cameraDetail =form.value.cameraDetail;
    this.downloadAsJpg=form.value.imageType=='jpg';
    this.mirrorImage  =form.value.mirrorImg;
    this.autoDownload =form.value.autoDownload;

    this.whiteBalanceMode = form.value.whiteBalanceMode;
    this.exposureMode = form.value.exposureMode;
    this.focusMode = form.value.focusMode;


    this.setCookie("cameraDetail",this.cameraDetail)
    this.setCookie("downloadAsJpg",this.downloadAsJpg)
    this.setCookie("mirrorImage",this.mirrorImage)
    this.setCookie("autoDownload",this.autoDownload)

    this.setCookie("whiteBalanceMode",this.whiteBalanceMode)
    this.setCookie("exposureMode",this.exposureMode)
    this.setCookie("focusMode",this.focusMode)

  }

  public formSubmit(){
    // debugger
    console.log('Settings: ', this.settingsData);
    // alert("You clicked Ok");
  }
}

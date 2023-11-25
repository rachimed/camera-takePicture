import { Component, HostListener } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';

import { FormControl } from '@angular/forms';
import { FullscreenService } from './fullscreen-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  webcamImage: WebcamImage | undefined;

  darkTheme = new FormControl(false);

  isCollapsed = true;

  public getScreenWidth: any;
  public getScreenHeight: any;
  
  ngOnInit() {
      this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

  showMenu = true;

  constructor(private fullscreenService: FullscreenService,  private router: Router){}

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  is_fullscreen(){
    return document.fullscreenElement != null;
  }

  @HostListener('document:keypress', ['$event'])
  keypress(e: KeyboardEvent) {
      console.log("Key Up! " + e.key);
      if(e.key=='q'){
        this.router.navigate(['camera']);
      }else if(e.key=='w'){
        this.router.navigate(['settings']);
      }else if(e.key=='e'){
        this.router.navigate(['about']);
      }
  }
  
}
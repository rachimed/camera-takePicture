import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { interval, Observable, Subject, timeout } from 'rxjs';

import { FullscreenService } from '../fullscreen-service.service';

import { CookieService } from 'ngx-cookie';

import * as FileSaver from 'file-saver';
import * as faceapi from 'face-api.js';
import { CameraService } from '../camera.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit {
  // //ADDED
  // @ViewChild('videoCamera', {static: true}) videoCamera: ElementRef;
  // @ViewChild('canvas', {static: true}) canvas: ElementRef;
  @ViewChild('exampleModal')
  modal!: ElementRef;

  @Output() getPicture = new EventEmitter<WebcamImage>();
  showWebcam = true;
  isCameraExist = true;
  detectedPersonne: string = '';
  idFormation: number = 0;
  idEtudiant: number = 0;
  etudiantNom: string = '';
  formationListe: any[] = [];
  donneeEtudiant!: FormGroup;

  errors: WebcamInitError[] = [];
  //true pour qu on puisse le tester ....
  confirmationDetection: boolean = true;
  createNewEtudiant: boolean = false;
  showMessagePresenceFait: boolean = false;
  confirmationIdentite: boolean = false;
  cardPhotoConfirmation: boolean = false;

  public showOverlay: boolean = false;
  spinnerBlackCamera: boolean = false;

  // window width and height
  public windowWidth: any;
  public windowHeight: any;

  //Webcam image(s)
  webcamImage: WebcamImage | undefined;
  webcamImages: Array<WebcamImage> = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  // webcam options
  public imageQuality: number = this.cookieService.hasKey('cameraDetail')
    ? Number(this.getCookie('cameraDetail'))
    : 1; // 0 to 1 in 0.01 multiples
  public mirrorImage: string = this.cookieService.hasKey('mirrorImage')
    ? this.getCookie('mirrorImage') == 'true'
      ? 'always'
      : 'never'
    : 'always'; //"always" //always or never
  public imageType: string = 'image/jpeg'; //'image/jpeg' or 'image/png'
  public autoDownload: boolean = this.cookieService.hasKey('autoDownload')
    ? this.getCookie('autoDownload') == 'true'
    : false;

  // constructor() { }
  constructor(
    private cameraService: CameraService,
    private fullscreenService: FullscreenService,
    private cookieService: CookieService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.donneeEtudiant = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      formation: new FormControl('', [Validators.required]),
    });
  }

  async ngOnInit() {
    this.showMessagePresenceFait = false;
    await faceapi.nets.tinyFaceDetector.loadFromUri('assets/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('assets/models');

    // WebcamUtil.getAvailableVideoInputs().then(
    //   async (mediaDevices: MediaDeviceInfo[]) => {

    //     this.isCameraExist = mediaDevices && mediaDevices.length > 0;
    //   }
    // );
    //
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }
  async detectFaces(webcamImage: WebcamImage) {
    console.log('visage bien detecté');
    const image = new Image();
    image.src = webcamImage.imageAsDataUrl;
    await image.decode(); // Assurez-vous que l'image est chargée

    const detections = await faceapi
      .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();
    const canvas = faceapi.createCanvasFromMedia(image);
    document.body.append(canvas);

    detections.forEach((detection) => {
      const text = new faceapi.draw.DrawTextField(
        ['Étudiant'],
        detection.detection.box.bottomRight
      );
      text.draw(canvas);
    });

    // Vous devez décider comment intégrer ce canvas dans votre DOM
  }

  @HostListener('window:resize', ['$event'])
  resizeWindow() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }

  // constructor(){
  //   interval(1000){
  //     this.getPicture.emit(webcamImage);
  //   }
  // }

  // Take picture stuffs

  takeSnapshot(): void {
    this.trigger.next();
  }

  onOffWebCame() {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage) {
    console.log('je suis dans handelImage');
    this.getPicture.emit(webcamImage);

    
    this.detectFaces(webcamImage);

    let timer = setInterval(() => this.getPicture.emit(webcamImage), 1000);
    setTimeout(() => {
      console.log('je suis dans handelImage avantsetTimeout');
      clearInterval(timer);
    }, 10000);
    this.webcamImage = webcamImage;
    this.webcamImages.push(webcamImage);

    this.showWebcam = true;

    this.showOverlay = !this.showOverlay;
    setTimeout(() => {
      this.showOverlay = !this.showOverlay;
    }, 220);

    if (this.autoDownload == true) {
      
    }
    this.ImageClick(webcamImage)
  }

  flashOff() {
    return true;
  }

  onKeydown(event: any) {
    if (event.key === 'Enter') {
      console.log(event);
    }
  }

  get triggerObservable(): Observable<void> {
    
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    
    return this.nextWebcam.asObservable();
  }

  facingMode: string = 'user'; //Set front camera
  allowCameraSwitch = true;

  public get videoOptions(): MediaTrackConstraints {
    // https://www.npmjs.com/package/ngx-webcam
    // From above

    //getSettings()

    //you can set ideal,min,max for width and height
    const result: MediaTrackConstraints = {
      width: { min: 640, ideal: 900, max: this.windowWidth },
      height: { min: 480, ideal: 1200, max: (this.windowWidth * 2) / 3 },
    };

    if (this.facingMode && this.facingMode !== '') {
      result.facingMode = { ideal: this.facingMode };
    }
    return result;
  }

  onToggleFullscreen() {
    this.fullscreenService.toggle();
  }

  is_fullscreen() {
    return document.fullscreenElement != null;
  }

  ImageClick(img: WebcamImage) {
    this.spinnerBlackCamera = true;
    //FileSaver.saveAs(img.imageAsDataUrl, 'image.png');
    // console.log('image :::::', img.imageAsDataUrl);
    this.cameraService.sendPictureForPrediction(img.imageAsDataUrl).subscribe({
      next: (data) => {
        this.spinnerBlackCamera = false;
        console.log(data);
        if (data.state == '0') {
          this.createNewEtudiant = true;
          this.confirmationDetection = false;
          this.showMessagePresenceFait = false;
          this.confirmationIdentite = false;
          this.spinnerBlackCamera = false;
        } else {
          this.confirmationIdentite = true;
          this.spinnerBlackCamera = false;
          this.confirmationDetection = false;
          this.idEtudiant = data.resultat.id;
          this.idFormation = data.resultat.id_formation_cal;
          this.etudiantNom = data.nom;
          console.log(
            'id et id formation : ',
            this.idEtudiant,
            this.idFormation
          );
          this.detectedPersonne = data;
        }

        this.spinnerBlackCamera = false;
        console.log('ici la next de subscribe send pic...', data);

        //this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        this.spinnerBlackCamera = false;
        console.log('error pendant service camera ', err);
      },
    });
  }

  // Cookie utilities

  //https://github.com/salemdar/ngx-cookie#get
  getCookie(key: string) {
    console.log('je suis ds getCookies')
    return this.cookieService.get(key);
  }

  //https://github.com/salemdar/ngx-cookie#put
  setCookie(key: string, value: Object) {
    if (typeof value == 'boolean') {
      return this.cookieService.put(key, value ? 'true' : 'false');
    }
    return this.cookieService.put(key, String(value));
  }

  @HostListener('document:keypress', ['$event'])
  keypress(e: KeyboardEvent) {
    console.log('Key Up! ' + e.key);
    if (e.key == 's' || e.key == 'S') {
      this.takeSnapshot();
    } else if (e.key == 'a' || e.key == 'A') {
      this.changeWebCame(true);
    } else if (e.key == 'd' || e.key == 'D') {
      this.onToggleFullscreen();
    }
  }
  onCancelDetection() {
    this.createNewEtudiant = false;
    this.showMessagePresenceFait = false;
    this.confirmationDetection = true;
    this.confirmationIdentite = false;
    this.cardPhotoConfirmation = false;
  }

  onConfirmDetection(etudiantID: number, formationID: number) {
    const maintenant = new Date();
    const midiEtDemi = new Date();
    (this.spinnerBlackCamera = true), (this.confirmationIdentite = false);

    midiEtDemi.setHours(12, 30, 0);

    if (maintenant < midiEtDemi) {
      // Il est avant 12h30
      this.cameraService
        .absentToPresent(this.idEtudiant, this.idFormation)
        .subscribe({
          next: (data) => {
            (this.spinnerBlackCamera = false),
              console.log('data onConfirmDetection', data);
            this.showMessagePresenceFait = true;
            setTimeout(() => {
              this.onCancelDetection();
            }, 10000);
          },
          error: (err) => {
            console.log('error dans onConfirmDetection', err);
          },
        });
    } else {
      // Il est après 12h30
      this.cameraService
        .absentToPresent2(this.idEtudiant, this.idFormation)
        .subscribe({
          next: (data) => {
            (this.spinnerBlackCamera = false),
              console.log('data onConfirmDetection apresM :');
            this.showMessagePresenceFait = true;
            setTimeout(() => {
              this.onCancelDetection();
            }, 10000);
          },
          error: (err) => {
            console.log('error dans onConfirmDetection', err);
          },
        });
    }
  }
  listeFormation() {
    this.cameraService.geCurrentFormationListe().subscribe({
      next: (data) => {
        this.formationListe = data;
      },
      error: (err) => {
        console.log('error dans onConfirmDetection', err);
      },
    });
  }
  ajoutNewEtudiant() {
    console.log('on ajoute un etudiant', this.donneeEtudiant.value);
    this.spinnerBlackCamera = true;
    this.cameraService.ajoutNewEtudiant(this.donneeEtudiant.value).subscribe({
      next: (data) => {
        this.createNewEtudiant = false;
        this.spinnerBlackCamera = false;
        this.confirmationDetection = false;
        this.showMessagePresenceFait = false;
        this.cardPhotoConfirmation = true;
        (this.modal.nativeElement as any).modal('hide');
      },
      error: (err) => {
        this.spinnerBlackCamera = false;
        (this.modal.nativeElement as any).modal('hide');
        console.log('error dans onConfirmDetection', err);
      },
    });
  }
}

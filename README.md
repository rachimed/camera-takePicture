# Camera Site
A simple camera application built on Angular. 

See a live demo [here](https://vmc-7645.github.io/camera-site/main).

## About
A simple webapp used to take pictures with the users webcam, free to use/copy at will without credit (though it would be nice).

Overall errors are prevented via several means throughout the site, those being through immediate dialog and informative documentation. In the “About” section there are several guides regarding different functions within the application, if the user happens to run into some issue or have a question the solution to it is likely going to be here.

There are several aspects utilized in the application to allow for better usability from both advanced and less enabled users. The more advanced users can utilize the shortcuts feature which allows them to quickly access and trigger features easily. For example the keys “q”, “w”, and “e” each bring the user to the Camera, Settings, and the About page respectively. Additionally, when on the camera page the keys “a”, “s”, and “d”, switch the camera, take a picture, and enter/exit fullscreen mode respectively. As for aspects for those less enabled, all interactive elements are made to allow for colorblind users. For example, the function buttons (in addition to changing color) also change size when hovering over them and additionally change size even more once clicked. Additionally the menu buttons are emboldened once if the user is in that specific section. 

The justification for the app is that it allows for users to take pictures via input from any connected camera through the medium of an easily accessible webapp interface capable of being hosted on the web. Compared to other applications is the accessibility, where most other camera applications need to be downloaded all you need for this one is a proper web browser. In future versions of the application I hope to be able to host the users images online to allow for ease of access to their personal gallery from anywhere which would add an additional element of purpose for this application. 

Overall, there are several aspects of this project that could be improved upon and others that I believe are completely finished. When working on it in the future I hope to keep more of the actual principles and guidelines in mind when in the design and improvement process. Hopefully all necessary components will be completed when necessary.


## Images

![Settings](READMEmedia/settings.jpg?raw=true "Settings")

![Camera](READMEmedia/camera.jpg?raw=true "Camera")

# Camera Site Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Deploying to GH Pages

Install gh-pages-cli:

```
ng add angular-cli-ghpages
```

Then run 

```
ng deploy --base-href=/camera-site/
```

Check on [https://<username>.github.io/<repositoryname>](https://vmc-7645.github.io/camera-site).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

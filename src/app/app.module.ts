import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule} from '@angular/material/button';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatToolbarModule } from '@angular/material/toolbar';

import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';

import { WebcamModule } from 'ngx-webcam';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieModule } from 'ngx-cookie';

import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './settings/settings.component';
// import { CameraComponent } from './camera/camera.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FullscreenService } from './fullscreen-service.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    AboutComponent,
    SettingsComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    CookieModule.withOptions(),
  ],
  exports: [],
  providers: [FullscreenService],
  bootstrap: [AppComponent],
})
export class AppModule {
  console = console;
}

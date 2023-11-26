import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './camera/camera.component';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'camera', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'camera', component: CameraComponent },
  { path: 'about', component: AboutComponent },
  { path: 'settings', component: SettingsComponent},
  { path: '**', component: CameraComponent } //ERROR 404 not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

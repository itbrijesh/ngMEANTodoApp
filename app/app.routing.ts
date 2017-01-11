import { ModuleWithProviders } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ProfileComponent } from './components/profile.component';
import { AuthGuard } from './services/authguard.service';

export const routes: Routes = [
    { path: '' , component: HomeComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot( routes );

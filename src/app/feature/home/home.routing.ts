import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HomeComponent} from './home.component';

export const HomeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            breadcrumbs: 'Inicio'
        }
    },
];

export const HomeRouting: ModuleWithProviders = RouterModule.forChild(
    HomeRoutes
);

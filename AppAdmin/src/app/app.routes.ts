import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./nuevo/nuevo.page').then( m => m.NuevoPage)
  },
  {
    path: 'editar',
    loadComponent: () => import('./editar/editar.page').then( m => m.EditarPage)
  },
  {
    path: 'nuevo-t',
    loadComponent: () => import('./nuevo-t/nuevo-t.page').then( m => m.NuevoTPage)
  },
  {
    path: 'editar-t',
    loadComponent: () => import('./editar-t/editar-t.page').then( m => m.EditarTPage)
  },
  {
    path: 'mapa',
    loadComponent: () => import('./mapa/mapa.page').then( m => m.MapaPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
];

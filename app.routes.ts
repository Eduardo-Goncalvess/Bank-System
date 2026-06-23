import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },

  {
    path: 'menu',
    loadComponent: () =>
      import('./pages/menu/menu.page').then(m => m.MenuPage)
  },

  {
    path: 'meus-dados',
    loadComponent: () =>
      import('./pages/meus-dados/meus-dados.page').then(m => m.MeusDadosPage)
  },

  {
    path: 'transferencia',
    loadComponent: () =>
      import('./pages/transferencia/transferencia.page').then(m => m.TransferenciaPage)
  },

  {
    path: 'extrato',
    loadComponent: () =>
      import('./pages/extrato/extrato.page').then(m => m.ExtratoPage)
  },

  {
    path: 'deposito',
    loadComponent: () =>
      import('./pages/deposito/deposito.page').then(m => m.DepositoPage)
  },

  {
    path: 'saque',
    loadComponent: () =>
      import('./pages/saque/saque.page').then(m => m.SaquePage)
  },

  {
    path: 'minhas-contas',
    loadComponent: () =>
      import('./pages/minhas-contas/minhas-contas.page').then(m => m.MinhasContasPage)
  },

];
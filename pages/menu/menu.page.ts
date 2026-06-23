import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButtons,
  IonLabel,
  IonIcon,
  IonList,
  IonMenuButton
} from '@ionic/angular/standalone';

import { RouterModule, Router } from '@angular/router';

import { addIcons } from 'ionicons';

import {
  storefrontOutline,
  cashOutline,
  cardOutline,
  personCircleOutline,
  receiptOutline,
  logOutOutline
} from 'ionicons/icons';

import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteModel } from 'src/app/model/cliente.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonIcon,
    IonLabel,
    IonButtons,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    RouterModule,
    CommonModule,
    FormsModule
  ]
})
export class MenuPage implements OnInit {

  cliente: ClienteModel;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {

    this.cliente = new ClienteModel();

    addIcons({
      'storefront-outline': storefrontOutline,
      'cash-outline': cashOutline,
      'card-outline': cardOutline,
      'person-circle-outline': personCircleOutline,
      'receipt-outline': receiptOutline,
      'log-out-outline': logOutOutline
    });
  }

  menu = [

  {
    descricao: 'Minhas Contas',
    rota: '/minhas-contas',
    icone: 'storefront-outline',
    cor: 'danger'
  },

  {
    descricao: 'Depósito',
    rota: '/deposito',
    icone: 'cash-outline',
    cor: 'danger'
  },

  {
    descricao: 'Saque',
    rota: '/saque',
    icone: 'cash-outline',
    cor: 'danger'
  },

  {
    descricao: 'Transferências',
    rota: '/transferencia',
    icone: 'card-outline',
    cor: 'danger'
  },

  {
    descricao: 'Extrato',
    rota: '/extrato',
    icone: 'receipt-outline',
    cor: 'danger'
  },

{
    descricao: 'Meus Dados',
    rota: '/meus-dados',
    icone: 'person-circle-outline',
    cor: 'danger'
  },
  {
    descricao: 'Sair',
    rota: '/login',
    icone: 'log-out-outline',
    cor: 'danger'
  }

];

  ngOnInit() {

    if (!this.clienteService.verificarSessao()) {

      this.router.navigate(['/login']);

    } else {

      this.cliente = this.clienteService.obterClienteSessao();
    }
  }

  sair() {

    this.clienteService.limparSessao();

    this.router.navigate(['/login']);
  }
}
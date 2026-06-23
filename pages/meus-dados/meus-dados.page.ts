import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonIcon,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';

import { ClienteModel } from 'src/app/model/cliente.model';
import { ContaModel } from 'src/app/model/conta.model';
import { NavController } from '@ionic/angular';
import { ClienteService } from 'src/app/services/cliente.service';
import { ContaService } from 'src/app/services/conta.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonIcon,
    CommonModule,
    FormsModule,
    IonButtons,
    IonButton,
  ]
})
export class MeusDadosPage implements OnInit {

  cliente: ClienteModel;

  contas: ContaModel[];

  saldoTotal: number;

  constructor(
    private clienteService: ClienteService,
    private contaService: ContaService,
    private navController: NavController
  ) {

    this.cliente = new ClienteModel();

    this.contas = [];

    this.saldoTotal = 0;
  }

  ngOnInit() {

    this.cliente = this.clienteService.obterClienteSessao();

    this.carregarContas();
  }

  carregarContas() {

    if (this.cliente?.id) {

      this.contaService.listarPorCliente(this.cliente.id).subscribe({

        next: (resultado: ContaModel[]) => {

          this.contas = resultado;

          this.calcularSaldoTotal();
        },

        error: () => {

          this.saldoTotal = 0;
        }
      });
    }
  }

  calcularSaldoTotal() {

    this.saldoTotal = this.contas.reduce(

      (total, conta) => total + (conta.saldo || 0),

      0
    );
  }

  voltarMenu() {

  this.navController.navigateBack('/menu');

  }
}
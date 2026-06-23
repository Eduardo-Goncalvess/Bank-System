import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  ToastController,
  AlertController,
  IonButtons
} from '@ionic/angular/standalone';

import { ContaModel } from 'src/app/model/conta.model';
import { ClienteModel } from 'src/app/model/cliente.model';

import { ContaService } from 'src/app/services/conta.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-minhas-contas',
  templateUrl: './minhas-contas.page.html',
  styleUrls: ['./minhas-contas.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    IonButtons,
  ]
})
export class MinhasContasPage implements OnInit {

  cliente: ClienteModel;

  contas: ContaModel[];

  constructor(
    private contaService: ContaService,
    private clienteService: ClienteService,
    private alertController: AlertController,
    private toastController: ToastController,
    private navController: NavController
  ) {

    this.cliente = new ClienteModel();

    this.contas = [];
  }

  ngOnInit() {

    this.cliente = this.clienteService.obterClienteSessao();

    this.carregarContas();
  }

  carregarContas() {

    if (this.cliente?.id) {

      this.contaService
        .listarPorCliente(this.cliente.id)
        .subscribe({

          next: (resultado: ContaModel[]) => {

            this.contas = resultado;
          },

          error: () => {

            this.exibirMensagem(
              'Erro ao carregar contas.'
            );
          }
        });
    }
  }

  cadastrarConta() {

    const iniciais = this.cliente.nome
      ?.substring(0, 2)
      .toUpperCase();

    const numeroAleatorio = Math.floor(
      100000 + Math.random() * 900000
    );

    const numeroConta =
      `${iniciais}-${numeroAleatorio}`;

    const novaConta: ContaModel = {

      numero: numeroConta,

      saldo: 0,

      clienteId: this.cliente.id
    };

    this.contaService.criar(novaConta).subscribe({

      next: () => {

        this.exibirMensagem(
          `Conta ${numeroConta} criada com sucesso!`
        );

        this.carregarContas();
      },

      error: () => {

        this.exibirMensagem(
          'Erro ao criar conta.'
        );
      }
    });
  }

  async excluir(conta: ContaModel) {

    if ((conta.saldo || 0) > 0) {

      this.exibirMensagem(
        'Não é possível excluir contas com saldo.'
      );

      return;
    }

    const alert = await this.alertController.create({

      header: 'Excluir Conta',

      message:
        `Deseja excluir a conta ${conta.numero}?`,

      buttons: [

        {
          text: 'Cancelar',
          role: 'cancel'
        },

        {
          text: 'Excluir',

          handler: () => {

            if (conta.id) {

              this.contaService
                .excluir(conta.id)
                .subscribe({

                  next: () => {

                    this.exibirMensagem(
                      'Conta excluída com sucesso.'
                    );

                    this.carregarContas();
                  },

                  error: () => {

                    this.exibirMensagem(
                      'Contas com histórico de movimentações não podem ser excluídas.'
                    );
                  }
                });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  voltarMenu() {

  this.navController.navigateBack('/menu');

  }

  async exibirMensagem(texto: string) {

    const toast = await this.toastController.create({

      message: texto,

      duration: 2000,

      position: 'bottom'
    });

    await toast.present();
  }
}
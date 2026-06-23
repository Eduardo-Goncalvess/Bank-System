import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  ToastController,
  IonButtons,
} from "@ionic/angular/standalone";

import { ContaModel } from "src/app/model/conta.model";
import { ClienteModel } from "src/app/model/cliente.model";

import { ContaService } from "src/app/services/conta.service";
import { LancamentoService } from "src/app/services/lancamento.service";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-transferencia",
  templateUrl: "./transferencia.page.html",
  styleUrls: ["./transferencia.page.scss"],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    FormsModule,
    IonButtons,
  ],
})
export class TransferenciaPage implements OnInit {
  cliente: ClienteModel;

  nomeTitularDestino: string;

  contas: ContaModel[];

  contaOrigemId: string;

  numeroDestino: string;

  contaDestino: ContaModel | null;

  valor: number;

  constructor(
    private contaService: ContaService,
    private lancamentoService: LancamentoService,
    private clienteService: ClienteService,
    private toastController: ToastController,
    private navController: NavController,
  ) {
    this.cliente = new ClienteModel();

    this.nomeTitularDestino = "";

    this.contas = [];

    this.contaOrigemId = "";

    this.numeroDestino = "";

    this.contaDestino = null;

    this.valor = 0;
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
        },

        error: () => {
          this.exibirMensagem("Erro ao carregar contas.");
        },
      });
    }
  }

  buscarContaDestino() {
    if (!this.numeroDestino) {
      this.contaDestino = null;

      this.nomeTitularDestino = "";

      return;
    }

    this.contaService.buscarPorNumero(this.numeroDestino).subscribe({
      next: (resultado: ContaModel) => {
        this.contaDestino = resultado;

        if (resultado.clienteId) {
          this.clienteService.buscarPorId(resultado.clienteId).subscribe({
            next: (cliente: ClienteModel) => {
              this.nomeTitularDestino = cliente.nome || "";
            },

            error: () => {
              this.nomeTitularDestino = "";
            },
          });
        }
      },

      error: () => {
        this.contaDestino = null;

        this.nomeTitularDestino = "";
      },
    });
  }

  transferir() {
    const contaOrigem = this.contas.find(
      (conta) => conta.id === this.contaOrigemId,
    );

    if (!this.contaOrigemId || !this.contaDestino || this.valor <= 0) {
      this.exibirMensagem("Preencha corretament todos os campos.");

      return;
    }

    if (this.valor > (contaOrigem?.saldo || 0)) {
      this.exibirMensagem("Saldo insuficiente.");

      return;
    }

    this.lancamentoService
      .registrar({
        contaId: this.contaOrigemId,
        valor: this.valor,
        tipo: "TRANSFERENCIA_SAIDA",
      })
      .subscribe({
        next: () => {
          if (this.contaDestino?.id) {
            this.lancamentoService
              .registrar({
                contaId: this.contaDestino.id,
                valor: this.valor,
                tipo: "TRANSFERENCIA_ENTRADA",
              })
              .subscribe({
                next: () => {
                  this.exibirMensagem("Transferência realizada com sucesso!");

                  this.valor = 0;

                  this.numeroDestino = "";

                  this.contaDestino = null;

                  this.carregarContas();
                },

                error: () => {
                  this.exibirMensagem("Erro ao concluir transferência.");
                },
              });
          }
        },

        error: () => {
          this.exibirMensagem("Erro ao realizar transferência.");
        },
      });
  }

  voltarMenu() {
    this.navController.navigateBack("/menu");
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      position: "bottom",
    });

    await toast.present();
  }
}

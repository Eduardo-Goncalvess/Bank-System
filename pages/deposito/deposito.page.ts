import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavController } from "@ionic/angular";

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
import { ContaService } from "src/app/services/conta.service";
import { LancamentoService } from "src/app/services/lancamento.service";
import { ClienteService } from "src/app/services/cliente.service";
import { ClienteModel } from "src/app/model/cliente.model";

@Component({
  selector: "app-deposito",
  templateUrl: "./deposito.page.html",
  styleUrls: ["./deposito.page.scss"],
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
export class DepositoPage implements OnInit {
  cliente: ClienteModel;

  contas: ContaModel[];

  contaSelecionadaId: string;

  valor: number;

  constructor(
    private contaService: ContaService,
    private lancamentoService: LancamentoService,
    private clienteService: ClienteService,
    private toastController: ToastController,
    private navController: NavController,
  ) {
    this.cliente = new ClienteModel();

    this.contas = [];

    this.contaSelecionadaId = "";

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

  realizarDeposito() {
    if (!this.contaSelecionadaId || this.valor <= 0) {
      this.exibirMensagem("Selecione uma conta e informe um valor válido.");

      return;
    }

    this.lancamentoService
      .registrar({
        contaId: this.contaSelecionadaId,
        valor: this.valor,
        tipo: "DEPOSITO",
      })
      .subscribe({
        next: () => {
          this.exibirMensagem("Depósito realizado com sucesso!");

          this.valor = 0;

          this.carregarContas();
        },

        error: () => {
          this.exibirMensagem("Erro ao realizar depósito.");
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

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

import { ContaService } from "src/app/services/conta.service";
import { LancamentoService } from "src/app/services/lancamento.service";
import { ClienteService } from "src/app/services/cliente.service";

import { ClienteModel } from "src/app/model/cliente.model";

@Component({
  selector: "app-saque",
  templateUrl: "./saque.page.html",
  styleUrls: ["./saque.page.scss"],
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
export class SaquePage implements OnInit {
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

  realizarSaque() {
    const conta = this.contas.find((c) => c.id === this.contaSelecionadaId);

    if (!this.contaSelecionadaId || this.valor <= 0) {
      this.exibirMensagem("Selecione uma conta e informe um valor válido.");

      return;
    }

    if (this.valor > (conta?.saldo || 0)) {
      this.exibirMensagem("Saldo insuficiente.");

      return;
    }

    this.lancamentoService
      .registrar({
        contaId: this.contaSelecionadaId,
        valor: this.valor,
        tipo: "SAQUE",
      })
      .subscribe({
        next: () => {
          this.exibirMensagem("Saque realizado com sucesso!");

          this.valor = 0;

          this.carregarContas();
        },

        error: () => {
          this.exibirMensagem("Erro ao realizar saque.");
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

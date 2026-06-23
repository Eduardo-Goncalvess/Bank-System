import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavController } from "@ionic/angular";

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
  IonSelect,
  IonSelectOption,
  IonText,
  IonButton,
  IonButtons,
} from "@ionic/angular/standalone";

import { ContaModel } from "src/app/model/conta.model";
import { LancamentoModel } from "src/app/model/lancamento.model";
import { ClienteModel } from "src/app/model/cliente.model";
import { ContaService } from "src/app/services/conta.service";
import { LancamentoService } from "src/app/services/lancamento.service";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-extrato",
  templateUrl: "./extrato.page.html",
  styleUrls: ["./extrato.page.scss"],
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
    IonSelect,
    IonSelectOption,
    IonText,
    CommonModule,
    FormsModule,
    IonButton,
    IonButtons,
  ],
})
export class ExtratoPage implements OnInit {
  cliente: ClienteModel;

  contas: ContaModel[];

  lancamentos: LancamentoModel[];

  contaSelecionadaId: string;

  constructor(
    private contaService: ContaService,
    private lancamentoService: LancamentoService,
    private clienteService: ClienteService,
    private navController: NavController,
  ) {
    this.cliente = new ClienteModel();

    this.contas = [];

    this.lancamentos = [];

    this.contaSelecionadaId = "";
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
          this.contas = [];
        },
      });
    }
  }

  carregarLancamentos() {
    if (!this.contaSelecionadaId) {
      this.lancamentos = [];

      return;
    }

    this.lancamentoService.listarPorConta(this.contaSelecionadaId).subscribe({
      next: (resultado: LancamentoModel[]) => {
        this.lancamentos = resultado;
      },

      error: () => {
        this.lancamentos = [];
      },
    });
  }

  voltarMenu() {
    this.navController.navigateBack("/menu");
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButton, IonItem, IonInput, IonLabel, IonTitle } from '@ionic/angular/standalone';
import { ClienteModel } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonTitle,
    IonItem,
    IonInput,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginPage implements OnInit {

  cliente: ClienteModel;
  formGroup: FormGroup;
  matricula: string;
  senha: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private navController: NavController,
    private clienteService: ClienteService
  ) {

    this.matricula = "";
    this.senha = "";
    this.cliente = new ClienteModel();

    this.formGroup = this.formBuilder.group({
      matricula: [
        this.matricula,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(14)
        ])
      ],
      senha: [
        this.senha,
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      ]
    });
  }

  ngOnInit() {
    this.clienteService.limparSessao();
  }

  autenticar() {

    const credenciais = {
      matricula: this.formGroup.value.matricula,
      senha: this.formGroup.value.senha
    };

    this.clienteService.autenticar(credenciais).subscribe({
      next: (resultado: ClienteModel) => {

        this.cliente = resultado;

        this.clienteService.salvarClienteSessao(resultado);

        this.navController.navigateRoot('/menu');
      },

      error: (erro) => {
        this.exibirMensagem('Matrícula ou senha incorretos.');
      }
    });
  }

  async exibirMensagem(texto: string) {

    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });

    toast.present();
  }
}
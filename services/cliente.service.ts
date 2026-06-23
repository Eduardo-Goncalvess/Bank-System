import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClienteModel } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly apiUrl = 'https://api-odinbank.odiloncorrea.com';
  private readonly KEY_CLIENTE = 'clienteautenticado';

  constructor(private http: HttpClient) { }

  autenticar(credenciais: { matricula: string, senha: string }): Observable<ClienteModel> {

    return this.http.post<ClienteModel>(
      `${this.apiUrl}/login`,
      credenciais
    );
  }

  buscarPorId(id: string): Observable<ClienteModel> {

  return this.http.get<ClienteModel>(
    `${this.apiUrl}/clientes/${id}`
  );
}

  salvarClienteSessao(cliente: ClienteModel): void {

    localStorage.setItem(
      this.KEY_CLIENTE,
      JSON.stringify(cliente)
    );
  }

  obterClienteSessao(): ClienteModel {

    const clienteJson = localStorage.getItem(this.KEY_CLIENTE);

    if (clienteJson) {
      return JSON.parse(clienteJson) as ClienteModel;
    }

    return new ClienteModel();
  }

  limparSessao(): void {

    localStorage.removeItem(this.KEY_CLIENTE);
  }

  verificarSessao(): boolean {

    return localStorage.getItem(this.KEY_CLIENTE) !== null;
  }
}
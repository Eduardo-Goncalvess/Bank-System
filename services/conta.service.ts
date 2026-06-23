import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContaModel } from '../model/conta.model';

@Injectable({ providedIn: 'root' })
export class ContaService {
  private readonly apiUrl = 'https://api-odinbank.odiloncorrea.com';

  constructor(private http: HttpClient) {}

  listarPorCliente(clienteId: string): Observable<ContaModel[]> {
    return this.http.get<ContaModel[]>(`${this.apiUrl}/contas?clienteId=${clienteId}`);
  }

  buscarPorId(id: string): Observable<ContaModel> {
    return this.http.get<ContaModel>(`${this.apiUrl}/contas/${id}`);
  }

  buscarPorNumero(numero: string): Observable<ContaModel> {
    return this.http.get<ContaModel>(`${this.apiUrl}/contas/numero/${numero}`);
  }

  criar(conta: ContaModel): Observable<ContaModel> {
    return this.http.post<ContaModel>(`${this.apiUrl}/contas`, conta);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/contas/${id}`);
  }

  validarNumero(numero: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/contas/check?numero=${numero}`);
  }
}
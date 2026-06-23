import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LancamentoModel } from '../model/lancamento.model';

@Injectable({ providedIn: 'root' })
export class LancamentoService {
  private readonly apiUrl = 'https://api-odinbank.odiloncorrea.com';

  constructor(private http: HttpClient) {}

  listarPorConta(contaId: string): Observable<LancamentoModel[]> {
    return this.http.get<LancamentoModel[]>(`${this.apiUrl}/lancamentos?contaId=${contaId}`);
  }

  registrar(lancamento: LancamentoModel): Observable<LancamentoModel> {
    return this.http.post<LancamentoModel>(`${this.apiUrl}/lancamentos`, lancamento);
  }
}
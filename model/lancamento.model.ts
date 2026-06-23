export class LancamentoModel {
    id?: string;
    valor?: number;
    tipo?: 'DEPOSITO' | 'SAQUE' | 'TRANSFERENCIA_ENTRADA' | 'TRANSFERENCIA_SAIDA';
    contaId?: string;
    data?: string;
    //Valores de tipo ficaram "estranhos" visualmente, mas parecem ser pré-definidos pela API. 
    // Trocaria, mas tô com medo de atrapalhar alguma funcionalidade
}
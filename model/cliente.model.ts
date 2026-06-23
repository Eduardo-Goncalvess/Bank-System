import { ContaModel } from "./conta.model";

export class ClienteModel {
    id?: string;
    nome?: string;
    matricula?: string;
    email?: string;
    contas: ContaModel[] = [];
}
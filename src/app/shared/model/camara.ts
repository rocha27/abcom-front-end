import {Representative} from "./representative";

export class Camara {
    id: number;
    nome: string;
    nomeClatura: string;
    dataHoraCriacao: any;
    tipoCamara: any;
    tipoSituacaoCamara: any;
    secretario: Representative = new Representative();
    supervisor: Representative = new Representative();
    consultorTecnico: Representative = new Representative();
    presidente: Representative = new Representative();
 }

export class Arquivos {
    descricao: string;
    link: string;
    anexo: any;
}

export class Anexo {
    nome: string;
    url: any;
}

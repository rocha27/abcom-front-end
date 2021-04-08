import {Constants} from "../util/constants";

export class Paginacao {

    pagina: number;
    registrosPorPagina:number = Constants.NUM_REGISTRO_POR_PAGINA;
    totalItens:number;
    ordenacaoDirecao:string;
    ordenacaoCampo:string;

    constructor() {}
 }

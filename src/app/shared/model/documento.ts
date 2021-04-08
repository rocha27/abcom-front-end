import {Reference} from "./referencial";
import {Produto} from './produto';
import {ModeloDocumento} from './modeloDocumento';
import {Idioma} from './idioma';
import {GrupoProduto} from './grupo-produto';

export class Documento {
    id?: number;
    tituloDocumento: string;
    referencialModeloDocumento: ModeloDocumento;
    idioma: Idioma;
    tituloTraduzido: string;
    edicao: string;
    produto: Produto;
    grupoProduto: GrupoProduto;


}

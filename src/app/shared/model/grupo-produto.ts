import {Produto} from './produto';

export class GrupoProduto {
    id?: number;
    nome: string;
    descricaoGrupoProduto: string;
    listaProdutoSelecionado: Produto[] = [];
}


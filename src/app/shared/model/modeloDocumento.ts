import {Reference} from "./referencial";

export class ModeloDocumento {
    id?: number;
    referencial: Reference;
    nomeModelo: string;
    listaTipoItens: Item[];
}


export class Item {
    id: number;
    /**
     * Nome do tipo do Item (ex: Sessão, comentário ..)
     */
    nome: string;

    /**
     * Identifica se o item poderá possuir imagem. Valores válidos: (1 - Sim e 0 - Não).
     */
    permiteImagem: boolean;

    nomenclatura: string;
}

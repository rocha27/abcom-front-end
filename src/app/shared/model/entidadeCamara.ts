import {Representative} from "./representative";

export class EntidadeCamara {
    id: number;
    idEntidade: number;
    idCamara: number;
    nomeEntidade: string;
    siglaEntidade: string;
    tipoVinculo: string;
    suplente: Representative;
    representante: Representative;
    coordenador: Representative;
    membroCamara: MembroCamara = new MembroCamara();
    dataCriacao: string;
 }

export class MembroCamara {
    id: number;
    idEntidadeCamara: number;
    idRepresentanteEntidade: number;
    responsabilidadeRepresentante: string;
    responsabilidadeSuplente: string;
    tipoMembro: string;
    idCargo: number;
    dtMandatoRepresentante: any | string;
    dtMandatoSuplente: any | string;
    dataCriacao: string;
}

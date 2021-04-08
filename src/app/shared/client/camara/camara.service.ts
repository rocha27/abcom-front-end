import {Util} from "../../util/util";
import {Injectable} from "@angular/core";
import {Camara} from "../../model/camara";
import {Constants} from "../../util/constants";
import {Paginacao} from "../../model/paginacao";
import {WSO2ClientAppBase} from "../wso2-client-app-base.service";
import {EntidadeCamara} from "../../model/entidadeCamara";

@Injectable()
export class CamaraService extends WSO2ClientAppBase {

    public buscarRepresentanteSearch(descricao: string): Promise<any> {
        return this.getClient()
            .get(`/api/v1/camara/pesquisa/representante/${descricao}`)
            .then((value: any) => value.conteudo);
    }

    public buscaEntidadesCamara(idCamara: number): Promise<any> {
        return this.getClient()
            .get(`/api/v1/camara/pesquisa-entidades/${idCamara}`)
            .then((value: any) => value.conteudo);
    }

    public buscarRepresentanteEntidade(descricao: string, idEntidade: number): Promise<any> {
        return this.getClient()
            .get(`/api/v1/camara/pesquisa/representante-entidade/${descricao}/${idEntidade}`)
            .then((value: any) => value.conteudo);
    }

    /**
     * Recupera os tipo de situação da câmaras
     */
    public buscarEntidade(descricao: any, paginacao: Paginacao): Promise<any>{
        const param = {
            ...descricao
        };

        if (!Util.isEmpty(paginacao)) {
            if (!Util.isEmpty(paginacao.pagina)) {
                param.page = paginacao.pagina;
            }
            if (paginacao.ordenacaoCampo != undefined && paginacao.ordenacaoDirecao != undefined) {
                param.orderBy = paginacao.ordenacaoCampo;
                param.order = paginacao.ordenacaoDirecao;
            }
            param.pageSize = (!Util.isEmpty(paginacao.registrosPorPagina)) ?
                paginacao.registrosPorPagina : Constants.NUM_REGISTRO_POR_PAGINA;
        }
        return this.getClient()
            .get(`/api/v1/entidade`, param)
            .then((value: any) => value.conteudo);
    }

    /**
     * Solicita a incluão ou alteração do registro
     * @param camara
     */
    public salvarDados(camara: Camara): Promise<any>{
        if(camara.id){
            return this.getClient()
                .put(`/api/v1/camara/${camara.id}`, camara)
                .then((value: any) => value);
        }
        return this.getClient()
            .post(`/api/v1/camara`, camara)
            .then((value: any) => value);
    }

    public salvarVinculoEntidade(entidadeCamara: EntidadeCamara): Promise<any> {
        if (entidadeCamara.id) {
            return this.getClient()
                .put(`/api/v1/camara/vinculo-entidade/${entidadeCamara.id}`, entidadeCamara)
                .then((value: any) => value);
        }
        return this.getClient()
            .post(`/api/v1/camara/vinculo-entidade`, entidadeCamara)
            .then((value: any) => value);
    }

    public deletarVinculoEntidade(id: number): Promise<any> {
        return this.getClient()
            .delete(`/api/v1/camara/excluir-vinculo-entidade/${id}`)
            .then((value: any) => value);
    }

    /**
     * Recupera um registro pelo id informado
     * @param identificador
     */
    public buscarDadosPorId(identificador: any): Promise<any>{
        return this.getClient()
            .get(`/api/v1/camara/${identificador}`)
            .then((value: any) => value.conteudo);
    }

    /**
     * Recupera os dados de acordo com o filtro informado
     */
    public consultarDadosPorFiltro(filtro: any, paginacao: Paginacao) : Promise<any>{

        const param = {
            ...filtro
        };

        if (!Util.isEmpty(paginacao)) {
            if (!Util.isEmpty(paginacao.pagina)) {
                param.page = paginacao.pagina;
            }
            if (paginacao.ordenacaoCampo != undefined && paginacao.ordenacaoDirecao != undefined) {
                param.orderBy = paginacao.ordenacaoCampo;
                param.order = paginacao.ordenacaoDirecao;
            }
            param.pageSize = (!Util.isEmpty(paginacao.registrosPorPagina)) ? paginacao.registrosPorPagina : Constants.NUM_REGISTRO_POR_PAGINA;
        }
        return this.getClient()
            .get(`/api/v1/camara`, param)
            .then((value: any) => value);
    }

}

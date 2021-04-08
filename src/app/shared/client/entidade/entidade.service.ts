import {Util} from "../../util/util";
import {Injectable} from "@angular/core";
import {Entidade} from "../../model/entidade";
import {Constants} from "../../util/constants";
import {Paginacao} from "../../model/paginacao";
import {WSO2ClientAppBase} from "../wso2-client-app-base.service";
import {error} from "@angular/compiler/src/util";

@Injectable()
export class EntidadeService extends WSO2ClientAppBase {

    /**
     * Solicita a incluão ou alteração do registro
     * @param entidade
     */
    public salvarDados(entidade: Entidade): Promise<any> {
        if(entidade.id) {
            return this.getClient()
                .put(`/api/v1/entidade/${entidade.id}`, entidade)
                .then((value: any) => value).catch(erro => {
                    return erro;
                });
        }
        return this.getClient()
            .post(`/api/v1/entidade`, entidade)
            .then((value: any) => value);
    }

    public vincularRepresentante(vinculo): Promise<any> {
        return this.getClient()
            .post(`/api/v1/entidade/vincular-representante`, vinculo)
            .then(result => {
                return result;
            });
    }

    public deletarVinculo(id): Promise<any> {
        return this.getClient()
            .delete(`/api/v1/entidade/excluir-vinculo/${id}`)
            .then((value: any) => value.conteudo);
    }

    /**
     * Recupera um registro pelo id informado
     * @param identificador
     */
    public buscarDadosPorId(identificador: any): Promise<any>{
        return this.getClient()
            .get(`/api/v1/entidade/${identificador}`)
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
            .get(`/api/v1/entidade`, param)
            .then((value: any) => value);
    }

}

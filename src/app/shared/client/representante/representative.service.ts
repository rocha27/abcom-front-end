import {Injectable} from '@angular/core';
import {WSO2ClientAppBase} from '../wso2-client-app-base.service';


@Injectable()
export class RepresentativeService extends WSO2ClientAppBase {

    /**
     * busca representantes salvos no corporativo do MAPA
     * @param descricao
     */
    public buscarRepresentanteCorporativo(descricao: string): Promise<any> {
        return this.getClient()
            .get(`/api/v1/camara/pesquisa/representante/${descricao}`)
            .then((value: any) => value.conteudo);
    }

    /**
     * busca representantes salvos no SGCAM
     * @param descricao
     */
    public buscarRepresentanteSgcam(descricao: string): Promise<any> {
        return this.getClient()
            .get(`/api/v1/entidade/pesquisa/representante/${descricao}`)
            .then((value: any) => value.conteudo);
    }

    /**
     * lista representantes salvos na entidade
     * @param descricao
     */
    public listaRepresentanteEntidade(idEntidade: number): Promise<any> {
        return this.getClient()
            .get(`/api/v1/entidade/lista/representante/${idEntidade}`)
            .then((value: any) => value.conteudo);
    }

    /**
     * @param idPessoa
     */
    public searchAddressRepresentative(idPessoa: number): Promise<any> {
        return this.getClient()
            .get(`/api/v1/representante/enderecos-representante/${idPessoa}`)
            .then((value: any) => value.conteudo);
    }

    /**
     * @param idPessoa
     */
    public buscarContatoRepresentante(idPessoa: number): Promise<any> {
        return this.getClient()
            .get(`/api/v1/representante/contato-representante/${idPessoa}`)
            .then((value: any) => value.conteudo);
    }

    /**
     * @param idPessoa
     */
    public buscarEmaisRepresentante(idPessoa: number): Promise<any> {
        return this.getClient()
            .get(`/api/v1/representante/email-representante/${idPessoa}`)
            .then((value: any) => value.conteudo);
    }

    /**
     * @param idRepresentante
     */
    saveRepresentative(idRepresentante): Promise<any> {
        return this.getClient().post(`/api/v1/representante`, idRepresentante)
            .then((retorno: any) => {
                return retorno.conteudo;
            });
    }

    /**
     * Recupera um registro pelo id informado
     * @param identificador
     */
    public buscarDadosPorId(identificador: any): Promise<any> {
        return this.getClient()
            .get(`/api/v1/representante/${identificador}`)
            .then((value: any) => value.conteudo);
    }

    public filtroRepresentante(descricao: string): Promise<any> {
        return this.getClient()
            .get(`/api/v1/representante/pesquisa/${descricao}`)
            .then((value: any) => value.conteudo);
    }

}

import {Injectable} from "@angular/core";
import {WSO2ClientAppBase} from "../wso2-client-app-base.service";

@Injectable()
export class DominioService extends WSO2ClientAppBase {

    /**
     * Recupera os tipo de situação da câmaras
     */
    public buscarTipoSituacaoCamaraEnum() : Promise<any>{
        return this.getClient()
            .get(`/api/v1/dominio/camara/situacao`)
            .then((value: any) => value.conteudo);
    }

    /**
     * Recupera os tipo da câmaras
     */
    public buscarTipCamaraEnum() : Promise<any>{
        return this.getClient()
            .get(`/api/v1/dominio/camara/tipo`)
            .then((value: any) => value.conteudo);
    }

}

import {Injectable} from '@angular/core';
import {WSO2ClientAppBase} from '../client/wso2-client-app-base.service';

@Injectable()
export class UtilService extends WSO2ClientAppBase {

    public buscarCep(cep: string): Promise<any> {
        return this.getClient()
            .get(`/api/v1/cep/pesquisa/${cep}`)
            .then(result => {
                return result;
            }).catch(error => {
                return error;
            });
    }

    public getListCountry(): Promise<any> {
        return this.getClient()
            .get(`/api/v1/pais`)
            .then((value: any) => value);
    }
}

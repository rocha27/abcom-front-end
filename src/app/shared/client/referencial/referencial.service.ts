import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {WSO2, WSO2Client} from "@mapa/core";

@Injectable()
export class ReferencialService {

    private wso2Client: WSO2Client;

    constructor(private wso2: WSO2, private http: HttpClient) {
        this.wso2Client = wso2.getClient('abcom', '1.0.0');
    }

    /**
     *
     * @param referencial
     */
    salvar(referencial): Promise<any> {
        return this.wso2Client.post(`/api/v1/referencial`, referencial)
            .then((retorno: any) => {
                return retorno.conteudo;
            });
    }

    /**
     *
     * @param referencial
     */
    editar(referencial): Promise<any> {
        return this.wso2Client.put(`/api/v1/referencial/` + referencial.id, referencial)
            .then((retorno: any) => {
                return retorno.conteudo;
            });
    }


    consultar(filtro): Promise<any> {
        const data = this.getParametrosFiltros(filtro);
        return this.wso2Client.get(`/api/v1/referencial/`, data)
            .then((retorno: any) => {
                return retorno.conteudo;
            });
    }

    /**
     *
     * @param id
     */
    consultarById(id: number): Promise<any> {
        return this.wso2Client.get(`/api/v1/referencial/` + id)
            .then((retorno: any) => {
                return retorno.conteudo;
            });
    }

    /**
     *
     * @param id
     */
    deletar(id: number): Promise<any> {
        return this.wso2Client.delete(`/api/v1/referencial/` + id)
            .then((retorno: any) => {
                return retorno.conteudo;
            });
    }

    private getParametrosFiltros(filtros) {
        const data = {};
        Object.entries(filtros).forEach(([key, value]) => {
            if (!!value) {
                if (typeof value == "object" && key !== 'periodoInicial' && key !== 'periodoFinal') {
                    // Segundo Nível de Filtro
                    Object.entries(value).forEach(([key2, value2]) => {
                        if (!!value2) {
                            data[`${key}.${key2}`] = value2;
                        }
                    });

                } else {
                    data[key] = value;
                }
            }
        });
        return data;
    }
}

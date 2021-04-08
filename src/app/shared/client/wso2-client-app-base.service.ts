import {WSO2, WSO2Client} from "@mapa/core";
import {Constants} from "../util/constants";
import {Injectable} from "@angular/core";

/**
 * Classe base para as configuração padrão de WSO2Client
 */
@Injectable()
export abstract class WSO2ClientAppBase {

    private client: WSO2Client;

    /**
     * @param wso2
     */
    constructor(private wso2: WSO2) {
    }

    /**
     * Recupera WSO2Client com as configurações pre definidas
     */
    getClient(): WSO2Client {
        if (!this.client) {
            this.client = this.wso2.getClient(Constants.API_DEFAULT, Constants.VERSION_DEFAULT, null);
            (this.client as any).init();
        }
        return this.client;
    }
}

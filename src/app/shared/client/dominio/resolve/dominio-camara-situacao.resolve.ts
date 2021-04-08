import {Observable} from "rxjs";
import {Util} from "../../../util/util";
import {Injectable} from "@angular/core";
import {DominioService} from "../dominio.service";
import {ActivatedRouteSnapshot} from "@angular/router";
import {AppMessageService} from "../../../core/message/app-message.service";

@Injectable()
export class DominioCamaraSituacaoResolve {

    constructor(private dominioService: DominioService,
                private appMessageService: AppMessageService) {}

    /**
     * Recupera os tipo de situação da câmaras
     *
     * @param route
     */
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return new Observable(observer => {
            this.dominioService.buscarTipoSituacaoCamaraEnum().then(data => {
                observer.next(data);
                observer.complete();
            }, error => {
                this.appMessageService.addMsgDanger(Util.getMessageResponse(error.error).join(", "));
            });
        })
    }
}

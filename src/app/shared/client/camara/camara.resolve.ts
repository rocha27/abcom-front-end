import {Observable} from "rxjs";
import {Util} from "../../util/util";
import {Injectable} from "@angular/core";
import {CamaraService} from "./camara.service";
import {ActivatedRouteSnapshot} from "@angular/router";
import {AppMessageService} from "../../core/message/app-message.service";

@Injectable()
export class CamaraResolve {

    constructor(private camaraService: CamaraService,
                private appMessageService: AppMessageService) {}

    /**
     * Retorna um registro pelo id informado
     *
     * @param route
     */
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const id = route.params['id'];
        return new Observable(observer => {
            this.camaraService.buscarDadosPorId(id).then(data => {
                observer.next(data);
                observer.complete();
            }, error => {
                this.appMessageService.addMsgDanger(Util.getMessageResponse(error.error).join(", "));
            });
        })
    }
}

import {Util} from "../../../shared/util/util";
import {ActivatedRoute} from "@angular/router";
import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Entidade} from "../../../shared/model/entidade";
import {AppFiltroComponent} from "../../app-filtro.component";
import {EntidadeService} from "../../../shared/client/entidade/entidade.service";
import {AppMessageService} from "../../../shared/core/message/app-message.service";

@Component({
    selector: 'app-ilustracao-listar',
    templateUrl: './ilustracao-listar.component.html'
})
export class IlustracaoListarComponent extends AppFiltroComponent implements OnInit {

    registros: Entidade[];
    filtro: any;
    loading: boolean = false;

    constructor(private entidadeService: EntidadeService,
                private activatedRoute: ActivatedRoute,
                private appMessageService: AppMessageService,
                private translateService: TranslateService) {
        super();
    }

    ngOnInit(): void {
        super.setList([]);
        this.filtro = {};
    }

    consultar() {
        this.loading = true;
        this.entidadeService.consultarDadosPorFiltro(this.filtro, this.paginacao).then(response => {
            super.setList(response.conteudo);
            this.paginacao.totalItens = response.totalItens;
            this.paginacao.pagina = null;
            if(super.getList().length == 0){
                this.appMessageService.addMsgDanger(this.translateService.instant('COMUM.MESSAGE.NOT_FOUND'));
            }
            this.hideLoading();
        }).catch(error => {
            this.appMessageService.addMsgDanger(Util.getMessageResponse(error.error).join(", "));
            this.registros = [];
            this.hideLoading();
        });
    }

    limpaFormulario(){
        this.filtro = {};
        this.registros = [];
    }

    /**
     * Desabilita o loading
     */
    hideLoading(){
        setTimeout(() => {
            this.loading = false;
        }, 0);
    }

}

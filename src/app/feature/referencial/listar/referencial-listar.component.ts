import {Component, OnInit} from "@angular/core";
import {Reference} from "../../../shared/model/referencial";
import {ReferencialService} from "../../../shared/client/referencial/referencial.service";
import {ConfirmationService} from "primeng/api";
import {LoaderService} from "../../../shared/core/loader/loader.service";
import {TranslateService} from "@ngx-translate/core";
import {AppMessageService} from "../../../shared/core/message/app-message.service";

@Component({
    selector: 'app-referencial-listar',
    templateUrl: './referencial-listar.component.html'
})
export class ReferencialListarComponent implements OnInit {

    reference: Reference[]
    name: any;
    action: any;
    filtro = {nome: ''};

    constructor(private referencialService: ReferencialService,
                private confirmationService: ConfirmationService,
                private loaderService: LoaderService,
                private translateService: TranslateService,
                private appMessageService: AppMessageService) {
    }

    ngOnInit(): void {
        this.name = [
            {field: 'Reference', header: 'Referencial'},
        ],
        this.action = [
            {field: 'Action', header: 'Ação'},
        ]

    }

    buscaReferencial() {
        this.loaderService.onStart.emit();
        setTimeout(() => {
            this.referencialService.consultar(this.filtro).then(result=> {
                this.reference = result;
                if (result.length == 0){
                    this.appMessageService.addMsgDanger(this.translateService.instant('COMUM.MESSAGE.NOT_FOUND'));
                }
                this.loaderService.onStop.emit();
            }).catch(erro => {
                this.loaderService.onStop.emit();
                this.appMessageService.addMsgDanger
                (this.translateService.instant('Ocorreu um erro ao consultar o referencial!'));
            })
        },200);

    }

    excluirReferencial(id) {
        this.confirmationService.confirm({
            message: 'Deseja Excluir ?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.loaderService.onStart.emit();
                setTimeout(() => {
                    this.referencialService.deletar(id).then(result => {
                        this.appMessageService.addMsgSuccess
                        (this.translateService.instant('COMUM.MESSAGE.RECORD_DELETE_SUCCESSFULLY'));
                        this.buscaReferencial();
                        this.loaderService.onStop.emit();
                    }).catch(erro => {
                        this.loaderService.onStop.emit();
                        this.appMessageService.addMsgDanger
                        (this.translateService.instant('O processo não poderá ser executado, pois o Referencial está cadastrado em um Modelo Documento'));
                    })

                }, 200);
            }
        });
    }
}

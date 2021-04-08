import {Component, OnInit} from "@angular/core";
import {ModeloDocumento} from "../../../shared/model/modeloDocumento";
import {ModeloDocumentoService} from "../../../shared/client/modelo-documento/modelo-documento.service";
import {ReferencialService} from "../../../shared/client/referencial/referencial.service";
import {ConfirmationService} from "primeng/api";
import {LoaderService} from "../../../shared/core/loader/loader.service";
import {AppMessageService} from "../../../shared/core/message/app-message.service";
import {TranslateService} from "@ngx-translate/core";
import {error} from "@angular/compiler/src/util";

@Component({
    selector: 'app-documento-listar',
    templateUrl: './documento-listar.component.html'
})
export class DocumentoListarComponent implements OnInit {

    listaDocumento = [];
    documento: ModeloDocumento[];
    name: any;
    action: any;
    brochura: any;
    filtro = {nome: ''};

    constructor(private documentoService: ModeloDocumentoService,
                private confirmationService: ConfirmationService,
                private loaderService: LoaderService,
                private translateService: TranslateService,
                private appMessageService: AppMessageService,
                private referencialService: ReferencialService) {}

    ngOnInit(): void {
        this.name = [
            {field: 'Documento', header: 'Documento'},
        ],
        this.action = [
            {field: 'Action', header: 'Ação'}
        ],
        this.brochura = [
            {field: 'Brochura', header: 'Brochura'}
        ]
    }


    buscaDocumento() {
        this.loaderService.onStart.emit();
        setTimeout(() => {
            this.documentoService.consultar(this.filtro).then(result=> {
                this.documento = result.conteudo;
                this.loaderService.onStop.emit();
            }).catch(erro => {
                this.loaderService.onStop.emit();
                this.appMessageService.addMsgDanger
                (this.translateService.instant('Ocorreu um erro ao consultar o documento!'));
            })
        },1000);
    }

    excluirDocumento(id) {
        this.confirmationService.confirm({
            message: 'Deseja Excluir ?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.loaderService.onStart.emit();
                setTimeout(() => {
                    this.documentoService.deletar(id).then(result => {
                        this.appMessageService.addMsgSuccess
                        (this.translateService.instant('COMUM.MESSAGE.RECORD_DELETE_SUCCESSFULLY'));
                        this.buscaDocumento();
                        this.loaderService.onStop.emit();
                    }).catch(erro=> {
                        this.loaderService.onStop.emit();
                        this.appMessageService.addMsgDanger
                        (this.translateService.instant('Ocorreu um erro ao excluir o documento!'));
                    })

                }, 1000);
            }
        });
    }
}

import {Component, OnInit} from "@angular/core";
import {ModeloDocumento} from "../../../shared/model/modeloDocumento";
import {ModeloDocumentoService} from "../../../shared/client/modelo-documento/modelo-documento.service";
import {ReferencialService} from "../../../shared/client/referencial/referencial.service";
import {ConfirmationService} from "primeng/api";
import {LoaderService} from "../../../shared/core/loader/loader.service";
import {AppMessageService} from "../../../shared/core/message/app-message.service";
import {TranslateService} from "@ngx-translate/core";
import {error} from "@angular/compiler/src/util";
import {Reference} from '../../../shared/model/referencial';
import {Documento} from '../../../shared/model/documento';

@Component({
    selector: 'app-documento-listar',
    templateUrl: './modelo-documento-listar.component.html'
})
export class ModeloDocumentoListarComponent implements OnInit {

    listaDocumento: any;
    listaReferecial: Reference[] = [];
    referencialDocumento: Reference;
    modeloDocumento: ModeloDocumento;
    listaModeloDocumento: ModeloDocumento[] = [];
    name: any;
    action: any;
    brochura: any;
    filtro = {idModeloDocumento: null, idReferencial: null};
    documento: Documento = new Documento();

    constructor(private documentoService: ModeloDocumentoService,
                private confirmationService: ConfirmationService,
                private modeloDocumentoService: ModeloDocumentoService,
                private loaderService: LoaderService,
                private translateService: TranslateService,
                private appMessageService: AppMessageService,
                private referencialService: ReferencialService) {}

    ngOnInit(): void {
        this.name = [
            {field: 'Modelo Documento', header: 'Modelo Documento'},
        ],
        this.action = [
            {field: 'Action', header: 'Ação'}
        ],
        this.brochura = [
            {field: 'Referencial', header: 'Referencial'}
        ]
        this.getReferenciaAll();

    }

    public consultarModeloDocumento() {
        this.modeloDocumentoService.consultar({idReferencial: this.referencialDocumento.id}).then(result=> {
            this.listaModeloDocumento = result.conteudo;
        })
    }
    private getReferenciaAll() {
        console.log(this.filtro);
        this.referencialService.consultar(this.filtro).then(result=> {
            this.listaReferecial = result;
        })
    }
    buscaDocumento() {
        this.loaderService.onStart.emit();
        this.filtro.idModeloDocumento = this.modeloDocumento ? this.modeloDocumento.id: null
        this.filtro.idReferencial = this.referencialDocumento ? this.referencialDocumento.id: null;
        console.log(this.modeloDocumento)
        console.log(this.referencialDocumento)
        console.log(this.filtro);
        setTimeout(() => {
            this.documentoService.consultar(this.filtro).then(result=> {
                this.listaDocumento = result.conteudo;
                if (result.conteudo.length == 0){
                    this.appMessageService.addMsgDanger(this.translateService.instant('COMUM.MESSAGE.NOT_FOUND'));
                }
                this.loaderService.onStop.emit();
            }).catch(erro => {
                this.loaderService.onStop.emit();
                this.appMessageService.addMsgDanger
                (this.translateService.instant('Ocorreu um erro ao consultar o documento!'));
            })
        },200);
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

                }, 200);
            }
        });
    }


}

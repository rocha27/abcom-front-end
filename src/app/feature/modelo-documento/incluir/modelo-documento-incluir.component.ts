
import {Component, OnInit} from '@angular/core';
import {ReferencialService} from "../../../shared/client/referencial/referencial.service";
import {Reference} from "../../../shared/model/referencial";
import {ModeloDocumento, Item} from "../../../shared/model/modeloDocumento";
import {ModeloDocumentoService} from "../../../shared/client/modelo-documento/modelo-documento.service";
import {AppMessageService} from "../../../shared/core/message/app-message.service";
import {TranslateService} from "@ngx-translate/core";
import {NgForm} from "@angular/forms";
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {LoaderService} from '../../../shared/core/loader/loader.service';

@Component({
    selector: 'app-documento-incluir',
    templateUrl: './modelo-documento-incluir.component.html'
})
export class ModeloDocumentoIncluirComponent implements OnInit {

    msgs = [];
    listaReferecial: Reference[] = [];
    filtro = {nome: ''};
    itens : Array<Item> = [];
    documento: ModeloDocumento = new ModeloDocumento();
    referencialDocumento: Reference;
    constructor(private referencialService: ReferencialService,
                private documentoService: ModeloDocumentoService,
                private appMessageService: AppMessageService,
                private translateService: TranslateService,
                private loaderService: LoaderService,
    ) {}

    ngOnInit() {
        this.getReferenciaAll();
        this.inicializarItens();
        this.documento.listaTipoItens = [];
    }

    public getReferenciaAll() {
        this.referencialService.consultar(this.filtro).then(result=> {
            this.listaReferecial = result;
        })
    }

    salvar(form: NgForm) {
        this.loaderService.onStart.emit();
        setTimeout(()=> {
            if (form.valid) {
                this.itens.forEach(item => {
                    if (item.nome) {
                        item.permiteImagem ? item.permiteImagem = true : item.permiteImagem = false;
                        this.documento.listaTipoItens.push(item);
                    }
                });
                this.validaCampoObrigatorioItem();
            } else {
                this.mostraCampoObrigatorio();
            }
            this.loaderService.onStop.emit();
        } ,200)
    }

    validaCampoObrigatorioItem() {
        if (this.documento.listaTipoItens.length <1) {
            this.msgs = [];
            window.scrollTo(0, 0);
            this.appMessageService.addMsgDanger(this.translateService.instant('Preencha primeiro o nome do item.'));
            return;
        } else {
            let campoObrigatorio = false;
            this.documento.listaTipoItens.filter(documento => {
                !documento.nomenclatura
                if (!documento.nomenclatura) {
                    campoObrigatorio = true;
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: 'Nomenclatura obrigatório'});
                    window.scrollTo(0, 0);
                }
            });
            if (!campoObrigatorio) {
                this.manterDocumento();
            }
        }
    }

    mostraCampoObrigatorio() {
        this.msgs = [];
        if (this.documento.nomeModelo == undefined || this.documento.nomeModelo == '') {
            this.msgs.push({severity: 'error', summary: 'Modelo Documento Obrigatório;'});
            window.scrollTo(0, 0);
        }
            if (this.documento.referencial == undefined) {
                this.msgs.push({severity: 'error', summary: 'Documento Referencial Obrigatório;'});
                window.scrollTo(0, 0);
            }

    }

    manterDocumento() {
        this.documento.referencial = this.referencialDocumento;
        this.documentoService.salvar(this.documento).then(result => {
            // this.documento = new Documento();
            window.history.back();
            this.appMessageService.addMsgSuccess(this.translateService.instant('Salvo com sucesso!'));
        }).catch(erro => {
            this.msgs = [];
            window.scrollTo(0, 0);
            this.appMessageService.addMsgDanger(this.translateService.instant(erro.error.message));
        });
    }

    adicionarItem() {
        const item =  new Item();
        if (this.itens.length < 20){
        this.itens.push(item);
        }
    }

    inicializarItens() {
        for (let i = 0; i < 5; i++){
            this.adicionarItem();
        }
    }

}


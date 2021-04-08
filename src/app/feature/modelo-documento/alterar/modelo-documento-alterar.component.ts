import {Component, OnInit} from "@angular/core";
import {ModeloDocumento, Item} from "../../../shared/model/modeloDocumento";
import {ModeloDocumentoService} from "../../../shared/client/modelo-documento/modelo-documento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppMessageService} from "../../../shared/core/message/app-message.service";
import {TranslateService} from "@ngx-translate/core";
import {Reference} from "../../../shared/model/referencial";
import {ReferencialService} from '../../../shared/client/referencial/referencial.service';
import {LoaderService} from '../../../shared/core/loader/loader.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-documento-alterar',
    templateUrl: './modelo-documento-alterar.component.html'
})
export class ModeloDocumentoAlterarComponent implements OnInit {

    msgs = [];
    documento: ModeloDocumento = new ModeloDocumento();
    listaReferecial: Reference[] = [];
    referencial: Reference;
    item: Item = new Item();
    referencialDocumento: Reference;
    id: number;
    itens : Array<Item> = [];
    filtro = {nome: ''};

    constructor(private modeloDocumentoService: ModeloDocumentoService,
                private router: Router,
                private referencialService: ReferencialService,
                private router2: ActivatedRoute,
                private loaderService: LoaderService,
                private appMessageService: AppMessageService,
                private translateService: TranslateService) {

    }

    ngOnInit(): void {
        this.id = this.router2.snapshot.params['documento.id'];
        this.getDocumentoByid(this.id);
        this.inicializarItens();
        this.getReferenciaAll();

    }

    public getReferenciaAll() {
        this.referencialService.consultar(this.filtro).then(result=> {
            this.listaReferecial = result;
        })
    }

    getDocumentoByid(id: number) {
        this.modeloDocumentoService.consultarById(id).then(result=> {
            this.documento = result;
            this.referencial = result.referencial;
            this.itens = result.listaTipoItens;
            if (this.itens.length < 5) {
                var teste = 5 - this.itens.length;
                for (let i = this.itens.length; teste > 0; i++){
                    teste -= 1 ;
                    this.adicionarItem();
                }
            }
        });
    }

    alterar(form: NgForm) {
        if (form.valid) {
            this.documento.listaTipoItens = [];
            this.itens.forEach(item => {
                if (item.nome) {
                    item.permiteImagem ? item.permiteImagem = true : item.permiteImagem = false;
                    this.documento.listaTipoItens.push(item);
                    this.appMessageService.addMsgSuccess(this.translateService.instant('Registro cadastrado com sucesso!'));

                }
            });
            this.validaCampoObrigatorioItem();

        } else {
            this.mostraCampoObrigatorio();
        }
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
                if (!documento.permiteImagem) {
                    campoObrigatorio = true;
                    this.msgs = [];
                    this.msgs.push({severity: 'error', summary: 'Permite imagem obrigatório'});
                    window.scrollTo(0, 0);
                } else {
                    if (!documento.nomenclatura) {
                        campoObrigatorio = true;
                        this.msgs = [];
                        this.msgs.push({severity: 'error', summary: 'Nomenclatura obrigatório'});
                        window.scrollTo(0, 0);
                    }
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
            this.msgs.push({severity: 'error', summary: 'Tipo do Documento Obrigatório;'});
            window.scrollTo(0, 0);
        }
        if (this.documento.referencial == undefined) {
            this.msgs.push({severity: 'error', summary: 'Documento Referencial Obrigatório;'});
            window.scrollTo(0, 0);
        }

    }
    manterDocumento() {
        this.documento.referencial = this.referencial;
        this.modeloDocumentoService.editar(this.documento).then(result=> {
            window.history.back();
        }).catch(erro=> {
            console.log(erro);
        });
    }


    adicionarItem() {
        let item =  new Item();
        if (this.itens.length < 20){
            this.itens.push(item)
        }
    }

    inicializarItens() {
        for (let i = 0; i < 5; i++){
            this.adicionarItem();
        }
    }

}

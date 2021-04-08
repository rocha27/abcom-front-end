
import {Component, OnInit} from '@angular/core';
import {ReferencialService} from "../../../shared/client/referencial/referencial.service";
import {Reference} from "../../../shared/model/referencial";
import {ModeloDocumento, Item} from "../../../shared/model/modeloDocumento";
import {ModeloDocumentoService} from "../../../shared/client/modelo-documento/modelo-documento.service";
import {AppMessageService} from "../../../shared/core/message/app-message.service";
import {TranslateService} from "@ngx-translate/core";
import {Produto} from '../../../shared/model/produto';
import {ProdutoService} from '../../../shared/client/produto/produto.service';
import {Documento} from '../../../shared/model/documento';
import {DocumentoService} from '../../../shared/client/documento/documento.service';
import {GrupoProduto} from '../../../shared/model/grupo-produto';
import {GrupoProdutoService} from '../../../shared/client/grupo-produto/grupo-produto.service';

@Component({
    selector: 'app-documento-incluir',
    templateUrl: './documento-incluir.component.html'
})
export class DocumentoIncluirComponent implements OnInit {

    uploadedFiles: any[] = [];
    idiomas = [];
    situacao = [
        {descricao: 'Inativo', codigo: 'Inativo'},
        {descricao: 'Ativo', codigo: 'Ativo'},
    ];
    msgs = [];
    listaReferecial: Reference[] = [];
    filtro = {nome: ''};
    listaModeloDocumento: ModeloDocumento[] = [];
    listaProduto: Produto[] = [];
    documento: Documento = new Documento();
    produto: Produto;
    listaGrupoProduto: GrupoProduto[] = [];
    checkTipoProduto: string = '';
    checkProduto: boolean = true;
    checkGrupoProduto: boolean = true;

    constructor(private referencialService: ReferencialService,
                private grupoProdutoService: GrupoProdutoService,
                private documentoService: DocumentoService,
                private appMessageService: AppMessageService,
                private translateService: TranslateService,
                private modeloDocumentoService: ModeloDocumentoService,
                private produtoService: ProdutoService) {
    }

    ngOnInit() {
        this.documento.referencialModeloDocumento = new ModeloDocumento();
        this.getReferenciaAll();
        this.getProdutoAll();
        this.buscarIdiomas();
        this.getGrupoProdutoAll()

    }

    verificaCheck() {
        if (this.checkTipoProduto == '1'){
            this.checkProduto = true;
            this.checkGrupoProduto = false;
        } else {
            this.checkGrupoProduto = true;
            this.checkProduto = false;
        }
    }

    public getReferenciaAll() {
        this.referencialService.consultar(this.filtro).then(result=> {
            this.listaReferecial = result;
        })
    }

    public getGrupoProdutoAll() {
        this.grupoProdutoService.consultar(this.filtro).then(result=> {
            this.listaGrupoProduto = result;
            })
    }

    public consultarModeloDocumento() {
        this.modeloDocumentoService.consultar({idReferencial: this.documento.referencialModeloDocumento.referencial.id}).then(result=> {
            this.listaModeloDocumento = result.conteudo;
        })
    }

    public getProdutoAll() {
        this.produtoService.consultar(this.filtro).then(result=> {
            this.listaProduto = result;
        })
    }

    salvar(): void {
        console.log("documento:", this.documento);
            this.documentoService.salvar(this.documento).then(result=> {
                this.appMessageService.addMsgSuccess(this.translateService.instant('Salvo com sucesso!'));
                this.documento = new Documento();
            }).catch(erro=> {
                console.log(erro);
            })
    }

    async buscarIdiomas() {
        this.documentoService.idioma().then(result => {
            this.idiomas = result.conteudo;
        }).catch(erro => {console.log(erro)} )
    }

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }


}


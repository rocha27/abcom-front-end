import {Component, OnInit} from "@angular/core";
import {ModeloDocumento, Item} from "../../../shared/model/modeloDocumento";
import {ModeloDocumentoService} from "../../../shared/client/modelo-documento/modelo-documento.service";
import {AppMessageService} from "../../../shared/core/message/app-message.service";
import {TranslateService} from "@ngx-translate/core";
import {Reference} from "../../../shared/model/referencial";
import {ReferencialService} from '../../../shared/client/referencial/referencial.service';
import {Produto} from '../../../shared/model/produto';
import {Documento} from '../../../shared/model/documento';
import {DocumentoService} from '../../../shared/client/documento/documento.service';
import {ProdutoService} from '../../../shared/client/produto/produto.service';

@Component({
    selector: 'app-documento-alterar',
    templateUrl: './documento-alterar.component.html'
})
export class DocumentoAlterarComponent implements OnInit {

    msgs = [];
    listaReferecial: Reference[] = [];
    filtro = {nome: ''};
    listaModeloDocumento: ModeloDocumento[] = [];
    listaProduto: Produto[] = [];
    referencialDocumento: Reference;
    documento: Documento;
    produto: Produto;
    constructor(private referencialService: ReferencialService,
                private documentoService: DocumentoService,
                private appMessageService: AppMessageService,
                private translateService: TranslateService,
                private modeloDocumentoService: ModeloDocumentoService,
                private produtoService: ProdutoService
    ) {
    }

    ngOnInit() {
        this.getReferenciaAll();
        this.getModeloDocumentoAll();
        this.getProdutoAll();
    }

    public getReferenciaAll() {
        this.referencialService.consultar(this.filtro).then(result=> {
            this.listaReferecial = result;
        })
    }

    public getModeloDocumentoAll() {
        this.modeloDocumentoService.consultar(this.filtro).then(result=> {
            this.listaModeloDocumento = result.conteudo;
        })
    }

    public getProdutoAll() {
        this.produtoService.consultar(this.filtro).then(result=> {
            this.listaProduto = result;
        })
    }

    salvar(): void {
        this.documentoService.salvar(this.documento).then(result=> {
            this.appMessageService.addMsgSuccess(this.translateService.instant('Salvo com sucesso!'));
            this.documento = new Documento();
        }).catch(erro=> {
            console.log(erro);
        })
    }
}

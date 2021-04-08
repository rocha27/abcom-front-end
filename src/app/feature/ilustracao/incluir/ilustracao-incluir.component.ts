
import {Component, OnInit} from '@angular/core';
import {Produto} from '../../../shared/model/produto';
import {ProdutoService} from '../../../shared/client/produto/produto.service';
import {AppMessageService} from '../../../shared/core/message/app-message.service';
import {TranslateService} from '@ngx-translate/core';
import {LoaderService} from '../../../shared/core/loader/loader.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-ilustracao-incluir',
    templateUrl: './ilustracao-incluir.component.html'
})
export class IlustracaoIncluirComponent implements OnInit {

    uploadedFiles: any[] = [];
    filtro = {nome: ''};
    listaProduto: Produto[] = [];
    teste = [];
    constructor(private produtoService: ProdutoService,
                private appMessageService: AppMessageService,
                private translateService: TranslateService,
                private loaderService: LoaderService,
                private router: Router) {
        this.teste = [
            {label: 'OCDE', value: "null"},
            {label: 'Mercosul', value: "null"},
        ];
    }

    ngOnInit() {
        this.getProdutoAll();
    }

    public getProdutoAll() {
        this.produtoService.consultar(this.filtro).then(result=> {
            this.listaProduto = result;
        })
    }

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }



}

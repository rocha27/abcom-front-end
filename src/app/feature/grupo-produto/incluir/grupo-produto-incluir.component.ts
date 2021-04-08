import {Component, OnInit} from '@angular/core';
import {Produto} from "../../../shared/model/produto";
import {AppMessageService} from "../../../shared/core/message/app-message.service";
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProdutoService} from "../../../shared/client/produto/produto.service";
import {TitleCasePipe} from '@angular/common';
import {toTitleCase} from 'codelyzer/util/utils';
import {LoaderService} from '../../../shared/core/loader/loader.service';
import {NgForm} from '@angular/forms';
import {GrupoProduto} from '../../../shared/model/grupo-produto';
import {GrupoProdutoService} from '../../../shared/client/grupo-produto/grupo-produto.service';
@Component({
    selector: 'app-produto-incluir',
    templateUrl: './grupo-produto-incluir.component.html'
})
export class GrupoProdutoIncluirComponent implements OnInit {

    filtro = {nome: ''};
    listaProduto: Produto[] = [];
    msgs = [];
    grupoProduto: GrupoProduto = new GrupoProduto();
    constructor(private produtoService: ProdutoService,
                private grupoProdutoService: GrupoProdutoService,
                private appMessageService: AppMessageService,
                private translateService: TranslateService,
                private loaderService: LoaderService,
                private router: Router) {}
    ngOnInit(): void {
        this.getProdutoAll();
    }
    /**
     * Identifica a situacao do produto. Valores válidos: (1 - Ativo, 0 - Inativo)
     */
    public getProdutoAll() {
        this.produtoService.consultar(this.filtro).then(result=> {
            this.listaProduto = result;
            console.log(this.listaProduto);
        })
    }

    salvar(form: NgForm): void {
        if (this.grupoProduto.nome != null && this.grupoProduto.nome != '') {
            this.grupoProdutoService.salvar(this.grupoProduto).then(result=> {
                this.appMessageService.addMsgSuccess(this.translateService.instant('Registro cadastrado com sucesso!'));
                this.grupoProduto = new GrupoProduto();
                if (result) {
                    this.getProdutoAll();
                }
                form.onReset()
            }).catch(erro=> {
                console.log(erro);
                this.appMessageService.addMsgDanger(this.translateService.instant(erro.error.message));
            })
        } else {
            this.appMessageService.addMsgDanger(this.translateService.instant('Campo Nome Grupo de Produtos é de preenchimento obrigatório'));

        }

    }
}

import {Component, OnInit} from '@angular/core';
import {Produto} from "../../../shared/model/produto";
import {ProdutoService} from "../../../shared/client/produto/produto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppMessageService} from "../../../shared/core/message/app-message.service";
import {TranslateService} from "@ngx-translate/core";


@Component({
    selector: 'app-produto-alterar',
    templateUrl: './produto-alterar.component.html'
})
export class ProdutoAlterarComponent implements OnInit {

    product: Produto = new Produto();
    id: number;
    constructor(private produtoService: ProdutoService,
                private router: Router,
                private router2: ActivatedRoute,
                private route: ActivatedRoute,
                private appMessageService: AppMessageService,
                private translateService: TranslateService) {

    }

    ngOnInit() {
        this.id = this.router2.snapshot.params['product.id'];
        this.getProdutoByid(this.id);
    }

    getProdutoByid(id: number) {
        this.produtoService.consultarById(id).then(result => {
            this.product = result;
        })
    }

    alterar(produto: Produto) {
        this.produtoService.editar(produto).then(result=> {
            this.appMessageService.addMsgSuccess(this.translateService.instant('Registro alterado com sucesso!'));
            window.history.back();
        }).catch(erro=> {
            console.log(erro);
        })
    }
}

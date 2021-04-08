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
@Component({
    selector: 'app-produto-incluir',
    templateUrl: './item-incluir.component.html'
})
export class ItemIncluirComponent implements OnInit {

    msgs = [];
    product: Produto = new Produto();
    text: any;
    users: any;
    constructor(private produtoService: ProdutoService,
                private appMessageService: AppMessageService,
                private translateService: TranslateService,
                private loaderService: LoaderService,
                private router: Router) {}
    ngOnInit(): void {

        this.users = [
            { id: '1', name: 'kiran',email:'kiran@gmail.com' },
            { id: '2', name: 'tom',email:'tom@gmail.com' },
            { id: '3', name: 'john',email:'john@gmail.com' },
            { id: '4', name: 'Frank',email:'frank@gmail.com' },
        ];
    }
    /**
     * Identifica a situacao do produto. Valores válidos: (1 - Ativo, 0 - Inativo)
     */
    salvar(form: NgForm): void {
        this.loaderService.onStart.emit();

        setTimeout(()=> {
            if (this.product.nome != null && this.product.nome != ''){
                this.product.situacaoProduto = '1';
                this.produtoService.salvar(this.product).then(result=> {
                    this.appMessageService.addMsgSuccess(this.translateService.instant('Salvo com sucesso!'));
                    this.product = new Produto();
                    form.onReset();
                }).catch(erro=> {
                    console.log(erro);
                    this.appMessageService.addMsgDanger(this.translateService.instant(erro.error.message));
                })
            } else {
                this.appMessageService.addMsgDanger(this.translateService.instant('Preencha os campos corretamente!'));
            }
            this.loaderService.onStop.emit();
        },200)
    }
}


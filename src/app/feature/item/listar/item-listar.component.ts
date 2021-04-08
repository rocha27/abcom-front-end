import {Component, OnInit} from '@angular/core';
import {Produto} from "../../../shared/model/produto";
import {ProdutoService} from "../../../shared/client/produto/produto.service";
import {ConfirmationService} from "primeng/api";
import {LoaderService} from "../../../shared/core/loader/loader.service";
import {TranslateService} from "@ngx-translate/core";
import {AppMessageService} from "../../../shared/core/message/app-message.service";
import {error} from '@angular/compiler/src/util';

@Component({
    selector: 'app-produto-listar',
    templateUrl: './item-listar.component.html'
})
export class ItemListarComponent implements OnInit {

    product: Produto[];
    nome;
    name: any;
    action: any;
    filtro = {nome: ''};

    constructor(private produtoService: ProdutoService,
                private confirmationService: ConfirmationService,
                private loaderService: LoaderService,
                private translateService: TranslateService,
                private appMessageService: AppMessageService,) {
    }

    ngOnInit(): void {
        this.name = [
            {field: 'Product', header: 'Produto'},
        ],
            this.action = [
                {field: 'Action', header: 'Ação'},
            ]

    }

    buscaProduto() {
            this.loaderService.onStart.emit();
            setTimeout(()=> {
                this.produtoService.consultar(this.filtro).then(result=> {
                    this.product = result;
                    if (result.length == 0){
                        this.appMessageService.addMsgDanger(this.translateService.instant('COMUM.MESSAGE.NOT_FOUND'));
                    }
                    this.loaderService.onStop.emit();
                }).catch(erro => {
                    this.loaderService.onStop.emit();
                    this.appMessageService.addMsgDanger
                    (this.translateService.instant('Ocorreu um erro ao consultar o produto!'));
                })
            },200)
    }
    excluirProduto(id) {
        this.confirmationService.confirm({
            message: 'Deseja Excluir ?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.loaderService.onStart.emit();
                setTimeout(() => {
                    this.produtoService.deletar(id).then(result => {
                        this.appMessageService.addMsgSuccess
                        (this.translateService.instant('COMUM.MESSAGE.RECORD_DELETE_SUCCESSFULLY'));
                        this.buscaProduto();
                        this.loaderService.onStop.emit();
                    }).catch(erro => {
                        this.loaderService.onStop.emit();
                        this.appMessageService.addMsgDanger
                        (this.translateService.instant('Ocorreu um erro ao excluir o produto!'));
                    })

                }, 200);
            }
        });
    }
}

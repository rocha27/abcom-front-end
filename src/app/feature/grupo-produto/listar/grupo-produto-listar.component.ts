import {Component, OnInit} from '@angular/core';
import {Produto} from "../../../shared/model/produto";
import {ProdutoService} from "../../../shared/client/produto/produto.service";
import {ConfirmationService} from "primeng/api";
import {LoaderService} from "../../../shared/core/loader/loader.service";
import {TranslateService} from "@ngx-translate/core";
import {AppMessageService} from "../../../shared/core/message/app-message.service";
import {error} from '@angular/compiler/src/util';
import {GrupoProduto} from '../../../shared/model/grupo-produto';
import {GrupoProdutoService} from '../../../shared/client/grupo-produto/grupo-produto.service';

@Component({
    selector: 'app-produto-listar',
    templateUrl: './grupo-produto-listar.component.html'
})
export class GrupoProdutoListarComponent implements OnInit {

    grupoProduto: GrupoProduto[];
    nome;
    name: any;
    action: any;
    filtro = {nome: ''};

    constructor(private grupoProdutoService: GrupoProdutoService,
                private confirmationService: ConfirmationService,
                private loaderService: LoaderService,
                private translateService: TranslateService,
                private appMessageService: AppMessageService,) {
    }

    ngOnInit(): void {
        this.name = [
            {field: 'Grupo', header: 'Grupo de Produto'},
        ],
            this.action = [
                {field: 'Action', header: 'Ação'},
            ]

    }

    buscaGrupoProduto() {
        this.loaderService.onStart.emit();
        setTimeout(()=> {
            this.grupoProdutoService.consultar(this.filtro).then(result => {
                this.grupoProduto = result;
                if (result.length == 0) {
                    this.appMessageService.addMsgDanger(this.translateService.instant('COMUM.MESSAGE.NOT_FOUND'));
                }
                this.loaderService.onStop.emit();

            }).catch(erro => {
                this.loaderService.onStop.emit();
                this.appMessageService.addMsgDanger
                (this.translateService.instant('Ocorreu um erro ao consultar o grupo de produto!'));
            })
        },200)

    }
    excluirGrupoProduto(id) {
        this.confirmationService.confirm({
            message: 'Deseja Excluir ?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.loaderService.onStart.emit();
                setTimeout(() => {
                    this.grupoProdutoService.deletar(id).then(result => {
                        this.appMessageService.addMsgSuccess
                        (this.translateService.instant('COMUM.MESSAGE.RECORD_DELETE_SUCCESSFULLY'));
                        this.buscaGrupoProduto();
                        this.loaderService.onStop.emit();
                    }).catch(erro => {
                        this.loaderService.onStop.emit();
                        this.appMessageService.addMsgDanger
                        (this.translateService.instant('Ocorreu um erro ao excluir o grupo de produto!'));
                    })

                }, 200);
            }
        });
    }
}

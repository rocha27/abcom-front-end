import {Component, OnInit} from '@angular/core';
import {Produto} from "../../../shared/model/produto";
import {ProdutoService} from "../../../shared/client/produto/produto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppMessageService} from "../../../shared/core/message/app-message.service";
import {TranslateService} from "@ngx-translate/core";
import {GrupoProduto} from '../../../shared/model/grupo-produto';
import {GrupoProdutoService} from '../../../shared/client/grupo-produto/grupo-produto.service';
import {LoaderService} from '../../../shared/core/loader/loader.service';
import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-produto-alterar',
    templateUrl: './grupo-produto-alterar.component.html'
})
export class GrupoProdutoAlterarComponent implements OnInit {

    filtro = {nome: ''};
    listaProduto: Produto[] = [];
    armazenaGrupoProduto: any[];
    msgs = [];
    grupoProduto: GrupoProduto = new GrupoProduto();
    teste;
    constructor(private produtoService: ProdutoService,
                private grupoProdutoService: GrupoProdutoService,
                private appMessageService: AppMessageService,
                private translateService: TranslateService,
                private router2: ActivatedRoute,
                private loaderService: LoaderService,
                private router: Router) {}
    ngOnInit(): void {
        let id = this.router2.snapshot.params['grupoProduto.id'];
        this.getGrupo(id);
        this.armazenaGrupoProduto = []
    }
    /**
     * Identifica a situacao do produto. Valores válidos: (1 - Ativo, 0 - Inativo)
     */
    public getProdutoAll() {
        this.produtoService.consultar(this.filtro).then(result=> {
            this.listaProduto = result;
           let arrayTeste =  this.grupoProduto.listaProdutoSelecionado.map(selecionado => {
                return selecionado.nome;
            })
           this.listaProduto = this.listaProduto.filter(item => {
                return !arrayTeste.includes(item.nome);
            })
        });
    }

    public getGrupo(id) {
        this.grupoProdutoService.consultarById(id).then(result=> {
            this.grupoProduto = result;
            this.getProdutoAll();
        });
    }

    salvar(form: NgForm): void {
        if (this.grupoProduto.nome != null && this.grupoProduto.nome != '') {
            this.grupoProdutoService.salvar(this.grupoProduto).then(result=> {
                this.appMessageService.addMsgSuccess(this.translateService.instant('Registro alterado com com sucesso!'));
                window.history.back();
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

import {Component, OnInit} from '@angular/core';
import {Produto} from "../../../shared/model/produto";
import {ProdutoService} from "../../../shared/client/produto/produto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GrupoProduto} from '../../../shared/model/grupo-produto';
import {GrupoProdutoService} from '../../../shared/client/grupo-produto/grupo-produto.service';

@Component({
    selector: 'app-produto-visualizar',
    templateUrl: './grupo-produto-visualizar.component.html'
})
export class GrupoProdutoVisualizarComponent implements OnInit {

    filtro = {nome: ''};
    grupoProduto: GrupoProduto = new GrupoProduto();
    id: number;
    listaProduto: Produto[] = [];
    armazenaGrupoProduto: any[];

    constructor(private grupoProdutoService: GrupoProdutoService,
                private produtoService: ProdutoService,
                private router2: ActivatedRoute,
                private router: ActivatedRoute) {}

    ngOnInit(): void {
        let id = this.router2.snapshot.params['grupoProduto.id'];
        this.getGrupo(id);
        this.getProdutoAll();
        this.armazenaGrupoProduto = []
    }

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
}

import {Component, OnInit} from '@angular/core';
import {Produto} from "../../../shared/model/produto";
import {ProdutoService} from "../../../shared/client/produto/produto.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-produto-visualizar',
    templateUrl: './item-visualizar.component.html'
})
export class ItemVisualizarComponent implements OnInit {

    product: Produto = new Produto();
    id: number;
    constructor(private produtoService: ProdutoService,
                private router: ActivatedRoute,
                private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.id = this.router.snapshot.params['product.id'];
        this.getProdutoByid(this.id);
    }

    /**
     *
     * @param id
     */
    getProdutoByid(id: number) {
        this.produtoService.consultarById(id).then(result=> {
            this.product = result;
        })
    }

}

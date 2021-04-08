import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Reference} from "../../../shared/model/referencial";
import {ReferencialService} from "../../../shared/client/referencial/referencial.service";
import {Produto} from "../../../shared/model/produto";
import {ProdutoService} from "../../../shared/client/produto/produto.service";


@Component({
    selector: 'app-referencial-visualizar',
    templateUrl: './referencial-visualizar.component.html'
})
export class ReferencialVisualizarComponent implements OnInit {

    reference: Reference = new Reference();
    id: number;
    constructor(private referencialService: ReferencialService,
                private router: ActivatedRoute,
                private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.id = this.router.snapshot.params['reference.id'];
        this.getReferencialByid(this.id);
    }

    /**
     *
     * @param id
     */
    getReferencialByid(id: number) {
        this.referencialService.consultarById(id).then(result=> {
            this.reference = result;
        })
    }

}

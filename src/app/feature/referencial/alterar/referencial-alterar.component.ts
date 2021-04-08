import {Component, OnInit} from '@angular/core';
import {Reference} from "../../../shared/model/referencial";
import {ReferencialService} from "../../../shared/client/referencial/referencial.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppMessageService} from "../../../shared/core/message/app-message.service";
import {TranslateService} from "@ngx-translate/core";
import {Produto} from "../../../shared/model/produto";
import {ProdutoService} from "../../../shared/client/produto/produto.service";

@Component({
    selector: 'app-referencial-alterar',
    templateUrl: './referencial-alterar.component.html'
})
export class ReferencialAlterarComponent implements OnInit {

    reference: Reference = new Reference();
    id: number;
    constructor(private referencialService: ReferencialService,
                private router: Router,
                private router2: ActivatedRoute,
                private route: ActivatedRoute,
                private appMessageService: AppMessageService,
                private translateService: TranslateService) {

    }

    ngOnInit() {
        this.id = this.router2.snapshot.params['reference.id'];
        this.getReferencialByid(this.id);
    }

    getReferencialByid(id: number) {
        this.referencialService.consultarById(id).then(result=> {
            this.reference = result;
        })
    }

    alterar(referencial: Reference) {
        if(this.reference.nome != null && this.reference.nome != '') {
            this.referencialService.editar(referencial).then(result=> {
                this.appMessageService.addMsgSuccess(this.translateService.instant('Registro cadastrado com sucesso!'));
                window.history.back();
            }).catch(erro=> {
            console.log(erro);
            })
        } else {
            this.appMessageService.addMsgDanger(this.translateService.instant('Preencha os campos corretamente!'));
        }
    }
}

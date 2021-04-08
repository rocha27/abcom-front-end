import {Component, OnInit} from '@angular/core';
import {AppMessageService} from '../../../shared/core/message/app-message.service';
import {Reference} from "../../../shared/model/referencial";
import {ReferencialService} from "../../../shared/client/referencial/referencial.service";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LoaderService} from '../../../shared/core/loader/loader.service';
import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-referencial-incluir',
    templateUrl: './referencial-incluir.component.html'
})
export class ReferencialIncluirComponent implements OnInit {

    reference: Reference = new Reference();
    constructor(private referencialService: ReferencialService,
                private appMessageService: AppMessageService,
                private translateService: TranslateService,
                private loaderService: LoaderService,
                private router: Router) {}

    ngOnInit(): void {}
    /**
     * Identifica a situacao do referencial. Valores válidos: (1 - Ativo, 0 - Inativo)
     */
    salvar(form: NgForm): void {
        this.loaderService.onStart.emit();
        setTimeout(()=> {
            if (this.reference.nome != null && this.reference.nome != '') {
                this.reference.ativo = true;
                this.referencialService.salvar(this.reference).then(result => {
                    this.appMessageService.addMsgSuccess(this.translateService.instant('Registro cadastrado com sucesso!'));
                    this.reference = new Reference();
                    form.onReset();
                }).catch(erro => {
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

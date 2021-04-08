import {Component, OnInit} from "@angular/core";
import {Entidade} from "../../../shared/model/entidade";
import {EntidadeService} from "../../../shared/client/entidade/entidade.service";
import {AppMessageService} from "../../../shared/core/message/app-message.service";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {Representative} from "../../../shared/model/representative";
import {Address} from "../../../shared/model/address";
import {Contact} from "../../../shared/model/contact";
import {Country} from "../../../shared/model/contactRepresentative";
import {RepresentativeService} from "../../../shared/client/representante/representative.service";


@Component({
    selector: 'app-ilustracao-visualizar',
    templateUrl: './ilustracao-visualizar.component.html'
})
export class IlustracaoVisualizarComponent implements OnInit {

    representative: Representative = new Representative();
    registro: Entidade = new Entidade();
    address: Address = new  Address();
    contact: Contact = new Contact();
    listAddress: Address[] = [];
    listContact: Contact[] = [];
    listRepresentative: Representative[] = [];
    indexAddress: number;
    indexContact: number;
    next: boolean = false;
    showEditAddress: boolean = false;
    showEditContact:boolean = false;
    showAddress = false;
    ListCountry: Country;

    constructor(private entidadeService: EntidadeService,
                private appMessageService: AppMessageService,
                private representanteService: RepresentativeService,
                private translateService: TranslateService,
                private activatedRoute: ActivatedRoute) {

        this.registro = activatedRoute.snapshot.data['entidadeResponse']
    }

    async ngOnInit() {
        const lista = await this.representanteService.listaRepresentanteEntidade(this.registro.id);
        this.listRepresentative = lista;
    }

    /**
     * Volta para página anterior
     */
    voltar(){
        window.history.back();
    }

    closedViewAddress() {
        this.showAddress = false;
        this.address = new Address();
    }

    /**
     * @param address
     * @param view
     */
    viewAddress(address, view) {
        view ? this.showAddress = true : this.showAddress = false;
        this.address = address;
    }

}

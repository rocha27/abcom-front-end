import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';
import {Reference} from '../../../shared/model/referencial';
import {ModeloDocumento, Item} from '../../../shared/model/modeloDocumento';
import {ReferencialService} from '../../../shared/client/referencial/referencial.service';
import {ModeloDocumentoService} from '../../../shared/client/modelo-documento/modelo-documento.service';

@Component({
    selector: 'app-documento-visualizar',
    templateUrl: './documento-visualizar.component.html'
})
export class DocumentoVisualizarComponent implements OnInit {
    documento: ModeloDocumento = new ModeloDocumento();
    listaReferecial: Reference[] = [];
    referencial: Reference;
    item: Item = new Item();
    id: number;
    itens : Array<Item> = [];
    filtro = {nome: ''};
    constructor(private documentoService: ModeloDocumentoService,
                private router: Router,
                private referencialService: ReferencialService,
                private router2: ActivatedRoute) {
    }
    ngOnInit() {
        this.id = this.router2.snapshot.params['documento.id'];
        this.getDocumentoByid(this.id);
        this.getReferenciaAll();
    }
    public getReferenciaAll() {
        this.referencialService.consultar(this.filtro).then(result=> {
            this.listaReferecial = result;
        })
    }
    getDocumentoByid(id: number) {
        this.documentoService.consultarById(id).then(result=> {
            this.documento = result;
            this.referencial = result.referencial;
            this.itens = result.listaTipoItens;
        });
    }
}

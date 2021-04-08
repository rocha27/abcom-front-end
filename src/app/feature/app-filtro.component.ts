import {Util} from "../shared/util/util";
import {LazyLoadEvent} from 'primeng/api';
import {Constants} from "../shared/util/constants";
import {Paginacao} from "../shared/model/paginacao";
import {AppDateCalendar} from "../app.date.calendar";

/**
 * Component responsavel pro prover funcionalidades para os components da aplicação que utilizam os filtro
 *
 * Ex:
 * export class SeuComponent extends AppFiltroComponent {
 *      constructor(){
 *          super();
 *      }
 * }
 */
export abstract class AppFiltroComponent {

    registros: any[];
    paginacao: Paginacao;

    pt_BR = AppDateCalendar.calendarTranslate();

    setList(l: any[]) {
        this.registros = l;
    }

    getList(): any[] {
        return this.registros;
    }

    constructor() {
        this.registros = [];
        this.paginacao = new Paginacao();
    }

    definirTotalRegistroPorPagina() {
        if (Util.isEmpty(this.paginacao.registrosPorPagina) || this.paginacao.registrosPorPagina == 0) {
            this.paginacao.registrosPorPagina = Constants.NUM_REGISTRO_POR_PAGINA;
        }
    }

    loadLazy(event: LazyLoadEvent) {
        //this.loading = true;

        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        //imitate db connection over a network

        if (event.first + event.rows >= this.registros.length) {
            this.paginacao.pagina = (event.first / event.rows);
            if (event.sortField != undefined) {
                this.paginacao.ordenacaoCampo = event.sortField;
                this.paginacao.ordenacaoDirecao = (event.sortOrder == 1) ? 'ASC' : 'DESC';
            }
            // this.consultar();
        }
    }

    // abstract consultar();

}

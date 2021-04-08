import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {CamaraResolve} from "./camara/camara.resolve";
import {CamaraService} from "./camara/camara.service";
import {DominioService} from "./dominio/dominio.service";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {EntidadeService} from "./entidade/entidade.service";
import {EntidadeResolve} from "./entidade/entidade.resolve";
import {DominioCamaraTipoResolve} from "./dominio/resolve/dominio-camara-tipo.resolve";
import {DominioCamaraSituacaoResolve} from "./dominio/resolve/dominio-camara-situacao.resolve";
import {RepresentativeService} from "./representante/representative.service";

/**
 * Módulo responsável pro prover os service e resolves para toda a aplicação.
 */
@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [],
})
export class ClientModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ClientModule,
            providers: [
                DominioService,
                CamaraService,
                EntidadeService,
                RepresentativeService,
                CamaraResolve,
                EntidadeResolve,
                DominioCamaraTipoResolve,
                DominioCamaraSituacaoResolve
            ]
        }
    }
}

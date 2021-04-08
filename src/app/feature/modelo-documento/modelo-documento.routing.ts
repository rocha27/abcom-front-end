import {Routes} from '@angular/router';
import {AdminLayoutComponent} from "@mapa/core";
import {ModeloDocumentoListarComponent} from "./listar/modelo-documento-listar.component";
import {ModeloDocumentoIncluirComponent} from "./incluir/modelo-documento-incluir.component";
import {EntidadeResolve} from "../../shared/client/entidade/entidade.resolve";
import {ModeloDocumentoAlterarComponent} from "./alterar/modelo-documento-alterar.component";
import {ModeloDocumentoVisualizarComponent} from "./visualizar/modelo-documento-visualizar.component";


export const ModeloDocumentoRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: ModeloDocumentoListarComponent
            },
            {
                path: 'incluir',
                component: ModeloDocumentoIncluirComponent
            },
            {
                path: 'alterar/:documento.id',
                component: ModeloDocumentoAlterarComponent,
            },
            {
                path: 'visualizar/:documento.id',
                component: ModeloDocumentoVisualizarComponent,
            }
        ]
    }
];

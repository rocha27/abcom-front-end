import {Routes} from '@angular/router';
import {AdminLayoutComponent} from "@mapa/core";
import {DocumentoListarComponent} from "./listar/documento-listar.component";
import {DocumentoIncluirComponent} from "./incluir/documento-incluir.component";
import {EntidadeResolve} from "../../shared/client/entidade/entidade.resolve";
import {DocumentoAlterarComponent} from "./alterar/documento-alterar.component";
import {DocumentoVisualizarComponent} from "./visualizar/documento-visualizar.component";


export const DocumentoRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: DocumentoListarComponent
            },
            {
                path: 'incluir',
                component: DocumentoIncluirComponent
            },
            {
                path: 'alterar',
                component: DocumentoAlterarComponent,
            },
            {
                path: 'visualizar/:documento.id',
                component: DocumentoVisualizarComponent,
            }
        ]
    }
];

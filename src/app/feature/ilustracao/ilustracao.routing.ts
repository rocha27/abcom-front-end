import {Routes} from '@angular/router';
import {AdminLayoutComponent} from "@mapa/core";
import {EntidadeResolve} from "../../shared/client/entidade/entidade.resolve";
import {IlustracaoVisualizarComponent} from "./visualizar/ilustracao-visualizar.component";
import {IlustracaoListarComponent} from "./listar/ilustracao-listar.component";
import {IlustracaoIncluirComponent} from "./incluir/ilustracao-incluir.component";
import {IlustracaoAlterarComponent} from "./alterar/ilustracao-alterar.component";


export const IlustracaoRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: IlustracaoListarComponent
            },
            {
                path: 'incluir',
                component: IlustracaoIncluirComponent
            },
            {
                path: 'alterar/:id',
                component: IlustracaoAlterarComponent,
                // resolve: {
                //     entidadeResponse: EntidadeResolve,
                // }
            },
            {
                path: 'visualizar/:id',
                component: IlustracaoVisualizarComponent,
                // resolve: {
                //     entidadeResponse: EntidadeResolve,
                // }
            }
        ]
    }
];

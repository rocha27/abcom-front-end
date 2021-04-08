import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppExemploPipe} from "./app-exemplo.pipe";

/**
 * Módulo responsável prover o recurso de pipes
 */
@NgModule({

    imports: [
        CommonModule
    ],
    declarations: [
        AppExemploPipe
    ],
    exports: [
        AppExemploPipe
    ],
})
export class AppPipesModule {

}

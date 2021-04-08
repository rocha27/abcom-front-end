import {NgModule} from '@angular/core';
import {ProgressSpinnerModule} from 'primeng/primeng';
import {LoadingComponent} from "./loading.component";

@NgModule({
    imports: [
        ProgressSpinnerModule,
    ],
    declarations: [
        LoadingComponent
    ],

    exports: [
        LoadingComponent
    ]
})
export class LoadingModule {
}

import {NgModule} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {CommonModule} from '@angular/common';
import {LoaderService} from "./loader.service";
import {LoaderComponent} from './loader.component';
import {LoadingModule} from "../../../feature/loading/loading.module";

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
        LoadingModule
    ],
    declarations: [
        LoaderComponent
    ],
    providers: [
        LoaderService,
    ],
    exports: [
        LoaderComponent
    ]
})
export class LoaderModule { }

import {Pipe, PipeTransform} from "@angular/core";
import {DatePipe} from "@angular/common";

@Pipe({
    name: 'appExemploPipe'
})
export class AppExemploPipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, args[0]);
    }
}

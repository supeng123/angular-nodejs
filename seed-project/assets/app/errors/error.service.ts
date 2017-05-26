/**
 * Created by supeng on 2017/5/25.
 */
import {EventEmitter} from '@angular/core';
import { Error} from './error.model';

export class ErrorService {
    errorOccurred = new EventEmitter<Error>();

    handleError(error: any){
        const errorData = new Error(error.title, error.error.message);
        this.errorOccurred.emit(errorData);
    }

}
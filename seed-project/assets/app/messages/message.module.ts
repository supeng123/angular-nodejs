/**
 * Created by supeng on 2017/6/3.
 */
import {NgModule} from '@angular/core';
import {MessageService} from './message.service';
import {FormsModule} from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';

import {MessagesComponent} from './messages.component'
import {MessageListComponent} from "./message-list.component";
import {MessageComponent} from "./message.component";
import {MessageInputComponent} from "./message-input.component";
import {CommonModule} from "@angular/common";
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
    declarations: [
        MessagesComponent,
        MessageListComponent,
        MessageComponent,
        MessageInputComponent,
        FileSelectDirective
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        FormsModule
    ],
    providers: [MessageService]
})
export class MessageModule {

}
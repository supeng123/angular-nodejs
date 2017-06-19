/**
 * Created by supeng on 2017/5/11.
 */
import { Component, OnInit} from '@angular/core';
import {Message} from './message.model'
import {MessageService} from "./message.service";

@Component ({
    selector: 'app-message-list',
    template: `
        <app-message [message]="message"
            *ngFor="let message of messages | paginate:{itemsPerPage:2, currentPage:p}">
        </app-message>
        <pagination-controls (pageChange)="p = $event"></pagination-controls>
        `
})
export class MessageListComponent implements OnInit {
    messages: Message[];
    p: number =1;
    constructor(private MessageService: MessageService) {}
    ngOnInit() {
        this.MessageService.getMessage().subscribe(
            (messages: Message[]) => {
                console.log(messages);
                this.messages = messages;
            }
        );
    }
}
// (editClicked)="message.content = $event"
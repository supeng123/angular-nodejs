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
                     
                    *ngFor="let message of messages"></app-message>
        `
})
export class MessageListComponent implements OnInit {
    messages: Message[];
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
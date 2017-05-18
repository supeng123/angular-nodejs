/**
 * Created by supeng on 2017/5/11.
 */
import {Component, Input} from '@angular/core';
import {Message} from './message.model'
import { MessageService} from './message.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})

export class MessageComponent {
    @Input() message: Message;
    // @Output() editClicked = new EventEmitter<string>();

    constructor(private MessageService: MessageService){}

    onEdit() {
        // this.editClicked.emit('A new value');
        this.MessageService.editMessage(this.message);
    }
    onDelete() {
        this.MessageService.deleteMessage(this.message).subscribe(
            result => console.log(result)
        )
    }
}
/**
 * Created by supeng on 2017/5/13.
 */
import { Message} from './message.model';
import {Http, Response, Headers} from "@angular/http";
import {Injectable, EventEmitter} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter();

    constructor(private http: Http) {}

    addMessage(message: Message) {
        // this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/message', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(result.obj.content, 'Jim', result.obj._id, null);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getMessage() {
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformMessages: Message[] = [];
                for (let message of messages) {
                    transformMessages.push(new Message(message.content, 'dummy', message._id, null))
                }
                this.messages = transformMessages;
                return transformMessages;
            })

            .catch((error: Response) => Observable.throw(error.json()));
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        return this.http.delete('http://localhost:3000/message/'+ message.messageId)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:3000/message/'+ message.messageId, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
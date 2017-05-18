/**
 * Created by supeng on 2017/5/11.
 */
export class Message {
    content: string;
    username: string;
    messageId?: string;
    userId?: string;

    constructor(content: string, username: string, messageId?: string, userId?: string) {
        this.content = content;
        this.username = username;
        this.messageId = messageId;
        this.userId = userId;
    }
}
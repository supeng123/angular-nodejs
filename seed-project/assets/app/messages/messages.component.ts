/**
 * Created by supeng on 2017/5/11.
 */
import {Component, OnInit} from '@angular/core';
// import {Message} from './message.model'
import { FileUploader } from 'ng2-file-upload';
const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
const URL = 'http://localhost:3000/message/upload'+ token;

@Component({
    selector: 'app-messages',
    template: `<div class="row"><app-message-list></app-message-list></div>
        <hr>
        <div class="row"><app-message-input></app-message-input></div>
        <input type="file" name="photo" ng2FileSelect [uploader]="uploader" />
        <button type="button" class="btn btn-success btn-s" 
            (click)="uploader.uploadAll()" 
            [disabled]="!uploader.getNotUploadedItems().length">
            Upload with ng-2 file uploader
        </button>
        `
})

export class MessagesComponent implements  OnInit{
    public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
    //This is the default title property created by the angular cli. Its responsible for the app works
    title = 'app works!';

    ngOnInit() {
        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
        //overide the onCompleteItem property of the uploader so we are
        //able to deal with the server response.
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
        };
    }
}
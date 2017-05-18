/**
 * Created by supeng on 2017/5/11.
 */
import { Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent{
    myForm: FormGroup;

    onSubmit() {
        console.log(this.myForm);
        this.myForm.reset()
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl('', Validators.required)
        })
    }
}
/**
 * Created by supeng on 2017/5/11.
 */
import { Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {User} from './user.model';
import {Router} from "@angular/router";
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent{
    myForm: FormGroup;
    constructor(private authService: AuthService, private router: Router){}

    onSubmit() {
        // console.log(this.myForm);
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/messages');
                },
                error => console.error(error)
            );
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
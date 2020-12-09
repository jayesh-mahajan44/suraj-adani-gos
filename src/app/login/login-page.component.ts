import { Component, OnInit } from '@angular/core';
//  import { NgForm } from '@angular/forms';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
//import { TokenStorage } from 'src/app/token.storage';
import { UserMasterService } from 'src/app/pages/user-management-page/user-master.service';
import { User } from 'src/app/dto/user';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    // @ViewChild('f') loginForm: NgForm;

    loginForm: FormGroup;
    public loginData: User;

    constructor(private formBuilder: FormBuilder, private router: Router,
        private route: ActivatedRoute, private userService: UserMasterService)//, private tokenStorage: TokenStorage) 
    { }

    ngOnInit() {
        this.loginData = new User();
        let usernameregex = /^[a-zA-Z0-9\-_]{0,20}$/;
        let passwordregex = /^(?=[a-zA-Z0-9#@$?]{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*/;
        this.loginForm = this.formBuilder.group({
            // username: ['', [Validators.required, Validators.pattern(usernameregex)]],
            // password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(passwordregex)]]
             username: ['', Validators.required,],
             password: ['', Validators.required]
            // emailId: ['', [Validators.required, Validators.pattern(emailregex)]]
        });
    }

    get f() { return this.loginForm.controls; }
    // On submit button click    
    onSubmitButtonClick() {

        this.router.navigate(["home"])
        // TODO added login Backend url 
        // try {
        //     let that = this;
        //     this.userService.attemptAuth(this.loginData.username, this.loginData.password).subscribe(
        //         data => {
        //             console.log("token received as: " + data.result.token);
        //             //this.tokenStorage.saveToken(data.result.token);
        //             //this.usernameStorage.saveUser(data.result.username);
        //             //  that.errorMsgFontColor = "blue";
        //             //  that.errorMsg = "User Authenticated";
        //             //that.userService.loginUsername = that.loginData.userName;
        //             that.router.navigateByUrl('/home/user-management')
        //             console.log("Error msg updated");
        //         }, (err) => {
        //             // that.errorMsgFontColor = "red";
        //             // that.errorMsg = "User authentication failed";
        //             console.log("Error msg updated for failed");
        //         }
        //     );
        // }
        // catch (error) {
        //     //that.errorMsgFontColor = "red";
        //     //that.errorMsg = "User authentication failed";
        //     console.log("Error msg updated for failed");
        // }
        //   this.loginForm.reset();
    }
}
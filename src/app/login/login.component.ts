import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import UsersJson from 'src/assets/user.json';
import { NgToastService } from 'ng-angular-popup'

interface USERS {
  name: String;
  password: String;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private route: Router, private toast: NgToastService) { }
  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  Users: USERS[] = UsersJson;

  name: string | undefined;
  password: string | undefined;

  onSubmit() {
    this.Users.map(res => {
      if (res.name === this.myForm.get('name')?.value && res.password === this.myForm.get('password')?.value) {
        this.route.navigate(['/home']);
        this.toast.success({ detail: "login success", summary: "LogedIn Successfully", duration: 2000 })
        
      }
    })
  }
  reset() {
    this.myForm.reset()
    console.log(this.myForm.value);
  }
}

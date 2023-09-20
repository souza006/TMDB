import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoginUser } from 'src/app/resources/models/loginModel';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public attToken: any;
  public userLogin: LoginUser = {};

  constructor(
    private loginService: LoginService,
  ) {

  }

  ngOnInit() {
    this.loginService.getAutenticationToken().subscribe((res) => {
      this.attToken = res;
      environment.request_token = this.attToken.request_token;
    });

  }
  async loginApp() {

    this.userLogin.request_token = environment.request_token
    this.loginService.loginApp(this.userLogin);
  }


}

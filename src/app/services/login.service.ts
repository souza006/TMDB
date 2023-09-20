import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../resources/models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userHasAutentication: boolean = false;

  

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router,
  ) { 
    
  }

  ngOnInit() {

  }
  getAutenticationToken() {

    let params = new HttpParams().set('api_key', environment.api_key);
    return this.http.get(environment.endpoint.autenticationURL, {
      params: params
    });
  }

  async loginApp(loginUser: LoginUser) {
    
    const loading = await this.loadingController.create({
      message: 'Logando...',
      spinner: 'crescent',
    });
    await loading.present();

    let params = new HttpParams().set('api_key', environment.api_key);
    return this.http.post(environment.endpoint.loginURL , loginUser, {params}).subscribe((res) => {
      this.userHasAutentication = true;
      loading.dismiss();
      this.router.navigate(['/movies']);
     }, error => {
       this.userHasAutentication = false;
       loading.dismiss();
       this.showToast(error.error.status_message);
     });

  }
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000
    });
    toast.present();
  }
  

  userAuth(){
    return this.userHasAutentication;
    
  }
}

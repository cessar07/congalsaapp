import { Component, OnInit } from '@angular/core';
import { ModalController, NavController , MenuController , Events } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  	constructor(
  		private modalController: ModalController,
    	private authService: AuthService,
    	private navCtrl: NavController,
    	private alertService: AlertService,
        private menu: MenuController,
        public events: Events
  	){
        this.menu.enable(false);
    }

    ionViewWillEnter() {
        let vv = this.authService.getToken();
        let veriQuestions = localStorage.getItem('questionsVery');
        if (vv == true && veriQuestions) {
            this.navCtrl.navigateRoot('/dashboard');
        }else{
            if (veriQuestions == '1') {
                this.navCtrl.navigateRoot('/dashboard');
            }
        }
    }

  	ngOnInit() {
  	}
  	
  	dismissLogin() {
    	this.modalController.dismiss();
  	}

  	login(form: NgForm) {
    	this.authService.login(form.value.user, form.value.password).subscribe(
      		data => {
               let veri = Object.values(data);
               let veriQuestions = localStorage.getItem('questionsVery');
                if (veri[0] == true && veriQuestions) {
        		    this.navCtrl.navigateRoot('/dashboard');
                    this.events.publish('checkUser');
                }else{
                    if (veri[0] == true && !veriQuestions) {
                        this.navCtrl.navigateRoot('/questions');
                        this.events.publish('checkUser');
                    }
                }
      		},
      		error => {
        		console.log(error);
      		},
      		() => {
        		// this.dismissLogin();
      		}
    	);
  	}
}

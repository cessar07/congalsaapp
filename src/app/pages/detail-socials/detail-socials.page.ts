import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
import { EnvService } from '../../services/env.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-detail-socials',
  templateUrl: './detail-socials.page.html',
  styleUrls: ['./detail-socials.page.scss'],
})
export class DetailSocialsPage implements OnInit {
	s: any;
  	constructor(
  		private authService: AuthService,
        private env: EnvService,
        private navCtrl: NavController,
  	) { }

  	ngOnInit() {
  		this.s = JSON.parse(localStorage.getItem('socialActive'));
  	}

  	ranking(){
        this.navCtrl.navigateForward('/ranking');
    }

    perfil(){
        this.navCtrl.navigateForward('/perfil');
    }

    bonus(){
        this.navCtrl.navigateForward('/bonus');
    }
}

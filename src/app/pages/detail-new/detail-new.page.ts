import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
import { EnvService } from '../../services/env.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-detail-new',
  templateUrl: './detail-new.page.html',
  styleUrls: ['./detail-new.page.scss'],
})
export class DetailNewPage implements OnInit {
	n:any;
  	constructor(
        private authService: AuthService,
        private env: EnvService,
        private navCtrl: NavController,
  	) {}

  	ngOnInit() {
        this.n = JSON.parse(localStorage.getItem('newActive'));
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

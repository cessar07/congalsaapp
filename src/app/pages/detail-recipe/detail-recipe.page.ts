import { Component, OnInit } from '@angular/core';
import { EnvService } from '../../services/env.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail-recipe.page.html',
  styleUrls: ['./detail-recipe.page.scss'],
})
export class DetailRecipePage implements OnInit {
	r: any;
  	constructor(
  		private env: EnvService,
        private navCtrl: NavController
  	) { }

  	ngOnInit() {
  		this.r = JSON.parse(localStorage.getItem('activeRecipe'));
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

    goSend(){
        this.navCtrl.navigateForward('/send-recipe');
    }
}

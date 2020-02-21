import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.page.html',
  styleUrls: ['./bonus.page.scss'],
})
export class BonusPage implements OnInit {

  	constructor(
  		public navCtrl : NavController
  	) { }

  	ngOnInit() {
  	}

  	ranking(){
        this.navCtrl.navigateForward('/ranking');
    }

	perfil(){
	    this.navCtrl.navigateForward('/perfil');
	}

    semRanking(){
        let div = document.getElementById('semRa');
        if (div) {
            div.style.boxShadow = '3px 2px 7px black';
            div.style.padding = '10px';
            setTimeout(()=>{
                div.style.boxShadow = 'none';
                this.navCtrl.navigateForward('/sem-ranking');
                div.style.padding = '0px';
            } , 150);
        }else{
            this.navCtrl.navigateForward('/sem-ranking');
        }
    }

    monthRanking(){
        let div = document.getElementById('monthRanking');
        if (div) {
            div.style.boxShadow = '3px 2px 7px black';
            div.style.padding = '10px';
            setTimeout(()=>{
                div.style.boxShadow = 'none';
                this.navCtrl.navigateForward('/month-ranking');
                div.style.padding = '0px';
            } , 150);
        }else{
            this.navCtrl.navigateForward('/month-ranking');
        }
    }
}

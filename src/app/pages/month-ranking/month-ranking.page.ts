import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-month-ranking',
  templateUrl: './month-ranking.page.html',
  styleUrls: ['./month-ranking.page.scss'],
})
export class MonthRankingPage implements OnInit {
	rankingData:any;
    products:any;
    token:any;
  	constructor(
  		public navCtrl: NavController,
        private authService: AuthService,
  	) { }

  	ngOnInit() {
  	}

  	ionViewWillEnter(){
        this.authService.rankingDataMonth().subscribe(
            data => {
                this.rankingData = data['users'];
                this.products   = JSON.parse(data['products']);
                setTimeout(function(){
                    data['users'].forEach((e)=>{
                        let div = document.getElementById('user_photo4_'+e.id);
                        if (e.avatar) {
                            div.style.backgroundImage = 'url("'+e.avatar+'")';
                        }else{
                            div.style.backgroundImage = 'url("/assets/pez_login.gif")';
                        }
                        div.style.backgroundSize      = 'cover';
                        div.style.backgroundPosition  = 'center';
                        // console.log(div);
                    });
                } , 2000);
            }
        );

        this.token = localStorage.getItem('token');
    }

    viewProduct(p){
        localStorage.setItem('productActive' , JSON.stringify(p));
        this.navCtrl.navigateForward('/detail-product');
    }
}

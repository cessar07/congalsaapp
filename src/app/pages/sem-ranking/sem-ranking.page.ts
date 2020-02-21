import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sem-ranking',
  templateUrl: './sem-ranking.page.html',
  styleUrls: ['./sem-ranking.page.scss'],
})
export class SemRankingPage implements OnInit {
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
        this.authService.rankingDataSem().subscribe(
            data => {
                this.rankingData = data['users'];
                this.products   = JSON.parse(data['products']);
                setTimeout(function(){
                    data['users'].forEach((e)=>{
                        let div = document.getElementById('user_photo3_'+e.id);
                        if (e.avatar) {
                            div.style.backgroundImage = 'url("'+e.avatar+'")';
                        }else{
                            div.style.backgroundImage = 'url("/assets/pez_login.gif")';
                        }
                        div.style.backgroundSize      = 'cover';
                        div.style.backgroundPosition  = 'center';
                        // console.log(div);
                    });
                } , 1000);
            }
        );

        this.token = localStorage.getItem('token');
    }

    viewProduct(p){
        localStorage.setItem('productActive' , JSON.stringify(p));
        this.navCtrl.navigateForward('/detail-product');
    }
}

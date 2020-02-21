import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
    rankingData:any;
    token:any;
  	constructor( 
  		public navCtrl: NavController,
        private authService: AuthService,
  	) { }

  	ngOnInit() {
  	}

  	perfil(){
        this.navCtrl.navigateForward('/perfil');
    }

    ionViewWillEnter(){
        this.authService.rankingData().subscribe(
            data => {
                this.rankingData = data['users'];
                setTimeout(function(){
                    data['users'].forEach((e)=>{
                        let div = document.getElementById('user_photo2_'+e.id);
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
}

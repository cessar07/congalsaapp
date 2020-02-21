import { Component, OnInit } from '@angular/core';
import { MenuController , NavController , ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
	user: User;
  	message = '';
    messagess = [];
    currentUser = '';
    userDetail: any;
  	constructor(
  		private menu: MenuController, 
  		private authService: AuthService,
        private navCtrl: NavController,
        private toastCtrl: ToastController
  	) {
  		this.menu.enable(true);
  	}

  	ngOnInit() {
        this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
        this.currentUser = this.userDetail.user;
  	}

  	ionViewWillEnter() {
    	this.authService.user().subscribe(
      		user => {
        		this.user = user;
      		}
    	);

        this.authService.pointsUser().subscribe(
            data => {
                localStorage.setItem('userPoints' , data['points']);
            }
        );
  	}

    news(){
        let div = document.getElementById('div_news'); 
        if (div) {
            div.style.boxShadow = '3px 2px 7px black';
            div.style.padding = '10px';
            setTimeout(()=>{
                div.style.boxShadow = 'none';
                this.navCtrl.navigateForward('/news');
                div.style.padding = '0px';
            } , 150);
        }else{
            this.navCtrl.navigateForward('/news');
        }
    }

    ranking(){
        let div = document.querySelectorAll('.img_ranking');
        if (div) {
            div.forEach((e)=>{
                (e as HTMLElement).style.transform = 'scale(1.3)';
                (e as HTMLElement).style.filter = 'drop-shadow(2px 4px 6px black)';
            });
            setTimeout(()=>{
                div.forEach((e)=>{
                    (e as HTMLElement).style.transform = 'scale(1)';
                    (e as HTMLElement).style.filter = 'none';
                });
                this.navCtrl.navigateForward('/ranking');
            } , 180);
        }else{
            this.navCtrl.navigateForward('/ranking');
        }
    }

    messages(){
        let div = document.getElementById('div_msj');
        if (div) {
            div.style.boxShadow = '3px 2px 7px black';
            div.style.padding = '10px';
            setTimeout(()=>{
                div.style.boxShadow = 'none';
                this.navCtrl.navigateForward('/messages');
                div.style.padding = '0px';
            } , 150);
        }else{
            this.navCtrl.navigateForward('/messages');
        }
    }

    perfil(){
        let div = document.querySelectorAll('.img_perfil');
        if (div) {
            div.forEach((e)=>{
                (e as HTMLElement).style.filter = 'invert(1)';
            });
            setTimeout(()=>{
                div.forEach((e)=>{
                    (e as HTMLElement).style.filter = 'none';
                });
                this.navCtrl.navigateForward('/perfil');
            } , 180);
        }else{
            this.navCtrl.navigateForward('/perfil');
        }
    }

    bonus(){
        let div = document.querySelectorAll('.img_bonus');
        if (div) {
            div.forEach((e)=>{
                (e as HTMLElement).style.transform = 'scale(1.3)';
                (e as HTMLElement).style.filter = 'drop-shadow(2px 4px 6px black)';
            });
            setTimeout(()=>{
                div.forEach((e)=>{
                    (e as HTMLElement).style.transform = 'scale(1)';
                    (e as HTMLElement).style.filter = 'none';
                });
                this.navCtrl.navigateForward('/bonus');
            } , 180);
        }else{
            this.navCtrl.navigateForward('/bonus');
        }
    }

    bonus2(){
        let div = document.getElementById('div_cofre');
        if (div) {
            div.style.boxShadow = '3px 2px 7px black';
            div.style.padding = '10px';
            setTimeout(()=>{
                div.style.boxShadow = 'none';
                this.navCtrl.navigateForward('/bonus');
                div.style.padding = '0px';
            } , 150);
        }else{
            this.navCtrl.navigateForward('/bonus');
        }
    }

    recipes(){
        let div = document.getElementById('div_recipe');
        if (div) {
            div.style.boxShadow = '3px 2px 7px black';
            div.style.padding = '10px';
            setTimeout(()=>{
                div.style.boxShadow = 'none';
                this.navCtrl.navigateForward('/recipes');
                div.style.padding = '0px';
            } , 150);
        }else{
            this.navCtrl.navigateForward('/recipes');
        }
    }

    events(){
        let div = document.getElementById('div_events');
        if (div) {
            div.style.boxShadow = '3px 2px 7px black';
            div.style.padding = '10px';
            setTimeout(()=>{
                div.style.boxShadow = 'none';
                this.navCtrl.navigateForward('/events');
                div.style.padding = '0px';
            } , 150);
        }else{
            this.navCtrl.navigateForward('/events');
        }
    }

    socials(){
        let div = document.getElementById('div_socials');
        if (div) {
            div.style.boxShadow = '3px 2px 7px black';
            div.style.padding = '10px';
            setTimeout(()=>{
                div.style.boxShadow = 'none';
                this.navCtrl.navigateForward('/socials');
                div.style.padding = '0px';
            } , 150);
        }else{
            this.navCtrl.navigateForward('/socials');
        }
    }

    // sendMessage() {
    //     this.socket.emit('send-message', { text: this.message });
    //     this.message = '';
    // }
     
    // ionViewWillLeave() {
    //     this.socket.disconnect();
    // }
     
    async showToast(msg) {
        let toast = await this.toastCtrl.create({
          message: msg,
          position: 'top',
          duration: 2000
        });
        toast.present();
    }
}

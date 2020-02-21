import { Component } from '@angular/core';

import { Platform , NavController , Events , MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
    userCheck : any;
    userDetail : any;
    public appPages = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: 'home'
        },
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'List',
            url: '/list',
            icon: 'list'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthService,
        private navCtrl: NavController,
        private alertService: AlertService,
        public events: Events,
        private menu: MenuController
    ) {
        this.initializeApp();
        this.events.subscribe('checkUser',()=>{
            this.userCheck  = this.authService.getToken();
            this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
            let preview = document.getElementById('uploadedPhoto2');
            if (this.userDetail.avatar) {
                preview.style.backgroundImage = 'url("'+this.userDetail.avatar+'")';
                preview.style.backgroundSize  = 'cover';
                preview.style.backgroundPosition  = 'center';
            }else{
                preview.style.backgroundImage = 'url("/assets/pez_login.gif")';
                preview.style.backgroundSize  = 'cover';
                preview.style.backgroundPosition  = 'center';
            }
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.statusBar.styleBlackTranslucent();
            this.statusBar.show();
            // this.splashScreen.hide();
            this.authService.getToken();
        });
    }

    logout() {
        this.authService.logout();
        this.userCheck = false;
        this.navCtrl.navigateRoot('/login');
    }

    closeMenu(){
        this.menu.close();
    }

    perfil(){
        this.navCtrl.navigateForward('/perfil');
        this.menu.close();
    }

    socials(){
        this.navCtrl.navigateForward('/socials');
        this.menu.close();
    }
}

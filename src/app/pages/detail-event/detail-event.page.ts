import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
import { EnvService } from '../../services/env.service';
import { ModalController , LoadingController , 
    ToastController , Events , AlertController,
    NavController , ActionSheetController 
} from '@ionic/angular';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.page.html',
  styleUrls: ['./detail-event.page.scss'],
})
export class DetailEventPage implements OnInit {
	e:any;
  	constructor(
  		private authService: AuthService, 
        private env: EnvService,
        private navCtrl: NavController,
        public alertController: AlertController,
  	) { }

  	ngOnInit() {
  		this.e = JSON.parse(localStorage.getItem('eventActive'));
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

    async presentAlert() {
        const alert = await this.alertController.create({
                header: 'Exito!',
                message: 'Acabas de ser agregado al grupo de chat de este evento',
              // buttons: ['OK']
                buttons: [{
                text: 'Ok'
            }]
        });

        await alert.present();
    }

    asist(){
        this.presentAlert();
    }

    goSend(){
        this.navCtrl.navigateForward('send-event');
    }
}

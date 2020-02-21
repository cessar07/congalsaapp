import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
import { EnvService } from '../../services/env.service';
import { ModalController , LoadingController , 
    ToastController , Events , AlertController,
    NavController , ActionSheetController 
} from '@ionic/angular';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {
	p:any;
  	constructor(
  		private authService: AuthService,
        private env: EnvService,
        private navCtrl: NavController,
        private toastController: ToastController,
        private loadingController: LoadingController,
        public alertController: AlertController,
  	) { }

  	ngOnInit() {
  		this.p = JSON.parse(localStorage.getItem('productActive'));
  	}

  	canj(){
  		// alert('Hola');
        let pr = JSON.parse(localStorage.getItem('productActive'));
        let us = JSON.parse(localStorage.getItem('userDetail'));
        this.presentLoad('Procesando');
        this.authService.sendProduct(pr.id , us.id).subscribe(
            data => {
                console.log(data);
                this.loadingController.dismiss();
                if (data['success'] != true) {
                    this.presentToast('Error al canjear el producto, intente mas tarde');
                }else{
                    this.presentAlert();
                    let points = localStorage.getItem('userPoints');
                    if (points) {
                        let nt: any = parseInt(points) - parseInt(data['points']);
                        localStorage.setItem('userPoints' , nt);
                    }
                }
            },
            error => {
                console.log(error);
                this.loadingController.dismiss();
                this.presentToast('Error al canjear el producto, intente mas tarde');
            },
            () => {
                // this.dismissLogin();
            }
        );
  	}

    async presentToast(message: any) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            position: 'top',
            color: 'dark'
        });
        toast.present();
    }

    async presentLoad(message : any) {
        const load = await this.loadingController.create({
            message: message,
        });
        load.present();
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Exito!!',
            message: 'Producto canjeado exitosamente!',
              // buttons: ['OK']
            buttons: [{
                text: 'Ok',
                handler: () => {
                    this.goHome();
                }
            }]
        });

        await alert.present();
    }

    goHome(){
        this.navCtrl.navigateRoot('/dashboard');
    }
}

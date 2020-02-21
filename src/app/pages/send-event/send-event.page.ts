import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController , LoadingController , 
	ToastController , Events , AlertController,
	NavController , ActionSheetController
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EnvService } from '../../services/env.service';
@Component({
  selector: 'app-send-event',
  templateUrl: './send-event.page.html',
  styleUrls: ['./send-event.page.scss'],
})
export class SendEventPage implements OnInit {
	detailEvent:any = null;
	fileUrl:any      = null;
	fileUrl2:any     = 1;
	imageURI:any     = null;
	userDetail:any;
	eventDetail:any;
  	constructor(
  		private transfer: FileTransfer,
        private camera: Camera,
        public events: Events,
        private toastController: ToastController,
        private loadingController: LoadingController,
        public modalController: ModalController,
        private env: EnvService,
        private authService: AuthService,
        public alertController: AlertController,
        private navCtrl: NavController,
        public actionSheetController: ActionSheetController
  	) { }

  	ngOnInit() {
  	}

  	async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Cargar imagen',
            buttons: [{
                text: 'Tomar una foto',
                handler: () => {
                    this.cropUpload2();
                }
            }, {
                text: 'Elegir una imagen de la galería',
                handler: () => {
                    this.cropUpload();
                }
            }]
        });
        await actionSheet.present();
    }

    sendEvent(form: NgForm){
  		if (!this.fileUrl) {
  			this.presentToast('Error! Selecciona una foto para tu receta');
  		}else{
            let det = JSON.parse(localStorage.getItem('activeDetailEvent'));
	    	this.authService.sendEvent(form.value.detail , det.id).subscribe(
	      		data => {
	               	console.log(data);
	               	this.loadingController.dismiss();
	               	if (data['success'] != true) {
	               		this.presentToast('Error al confirmar la asistencia, intente mas tarde');
	               	}else{
	               		this.presentAlert(data['points']);
	               		localStorage.setItem('eventIns' , 'correcto');
                        let points = localStorage.getItem('userPoints');
                        if (points) {
                            let nt: any = parseInt(points) + parseInt(data['points']);
                            localStorage.setItem('userPoints' , nt);
                        }else{
                            localStorage.setItem('userPoints' , data['points']);
                        }

                        let dv = document.getElementById('pyro3');
                        dv.classList.add('pyro');
	               	}
	      		},
	      		error => {
	        		console.log(error);
	        		this.loadingController.dismiss();
	               	this.presentToast('Error al confirmar la asistencia, intente mas tarde');
	      		},
	      		() => {
	        		// this.dismissLogin();
	      		}
	    	);
  		}

          this.authService.sendEvent(form.value.detail , 1).subscribe(
                  data => {
                       console.log(data);
                       this.loadingController.dismiss();
                       if (data['success'] != true) {
                           this.presentToast('Error al confirmar la asistencia, intente mas tarde');
                       }else{
                           this.presentAlert(data['points']);
                           localStorage.setItem('eventIns' , 'correcto');
                        let points = localStorage.getItem('userPoints');
                        if (points) {
                            let nt: any = parseInt(points) + parseInt(data['points']);
                            localStorage.setItem('userPoints' , nt);
                        }else{
                            localStorage.setItem('userPoints' , data['points']);
                        }

                        let dv = document.getElementById('pyro3');
                        dv.classList.add('pyro');
                       }
                  },
                  error => {
                    console.log(error);
                    this.loadingController.dismiss();
                       this.presentToast('Error al confirmar la asistencia, intente mas tarde');
                  },
                  () => {
                    // this.dismissLogin();
                  }
            );
  	}

  	cropUpload() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
        }

        this.camera.getPicture(options).then((imageData) => {
            // let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.imageURI = imageData;
            this.uploadFile();
        }, (err) => {
            console.log(err);
        });
    }

    cropUpload2() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
        }

        this.camera.getPicture(options).then((imageData) => {
            // let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.imageURI = imageData;
            this.uploadFile();
        }, (err) => {
            console.log(err);
        });
    }

    uploadFile(){
        this.presentLoad('Cargando Foto');
        const fileTransfer: FileTransferObject = this.transfer.create();
        let options: FileUploadOptions = {
            fileKey: 'ionfile',
            fileName: 'ionicfile.jpg',
            chunkedMode: false,    
            headers: {
                Connection: 'close'
            }
        }
        this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
        this.eventDetail = JSON.parse(localStorage.getItem('eventActive'));

        fileTransfer.upload(this.imageURI, this.env.API_URL+'/api/uploadPhoto/event/'+this.eventDetail.id+'/'+this.userDetail.id, options)
        .then((data) => {
            var dd = JSON.parse(data['response']);
            localStorage.setItem('activeDetailEvent' , dd.file);
            console.log(dd);
            this.fileUrl  = dd.file;
            this.fileUrl2 = dd.file.id;
            this.updatePhoto(dd.file);
            this.dismissLoad();
            // this.presentToast('Foto actualizada exitosamente');
        }, (err) => {
            this.dismissLoad();
            console.log(err)
            this.presentToast('Error al subir la imagen, intente mas tarde!');
        });
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

    async presentAlert(points) {
	    const alert = await this.alertController.create({
	      	header: 'Felicidades!!',
	     	message: 'Acabas de ganar '+points+' puntos',
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

	updatePhoto(file){
        let preview = document.getElementById('divAddPhoto2');
        let det = JSON.parse(localStorage.getItem('activeDetailEvent'));
        if (preview) {
        	preview.style.backgroundImage    = 'url("'+det.file+'")';
        	preview.style.backgroundSize     = 'cover';
        	preview.style.backgroundPosition = 'center';
        }
    }

    async dismissLoad() {
        return await this.loadingController.dismiss();
    }

    goHome(){
    	this.navCtrl.navigateRoot('/dashboard');
    }
}

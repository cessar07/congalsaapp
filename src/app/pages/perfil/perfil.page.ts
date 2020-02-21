import { Component, OnInit } from '@angular/core';
import { NavController , Events , ToastController , LoadingController , ModalController } from '@ionic/angular';
import { EnvService } from '../../services/env.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EditPage } from '../edit/edit.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
	userDetail: any;
    fileUrl: any = null;
    imageURI: any;
    recipeIns : any;
    eventIns : any;
    userPoints : any;
    products:any;
  	constructor(
  		public navCtrl: NavController,
        private env: EnvService,
        private transfer: FileTransfer,
        private camera: Camera,
        public events: Events,
        private toastController: ToastController,
        private loadingController: LoadingController,
        public modalController: ModalController,
        private authService: AuthService,
  	){
        this.events.subscribe('checkUser',()=>{
            this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
            let preview = document.getElementById('uploadedPhoto');
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

    ionViewWillEnter(){
          this.authService.getUserProducts().subscribe(
            data => {
                this.products = data['products'];
                console.log(data);
            }
        );
    }

 	ngOnInit() {
        let preview = document.getElementById('uploadedPhoto');
  		this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
        if (this.userDetail.avatar) {
            this.fileUrl = this.userDetail.avatar;
            preview.style.backgroundImage = 'url("'+this.userDetail.avatar+'")';
            preview.style.backgroundSize  = 'cover';
            preview.style.backgroundPosition  = 'center';
        }else{
            preview.style.backgroundImage = 'url("/assets/pez_login.gif")';
            preview.style.backgroundSize  = 'cover';
            preview.style.backgroundPosition  = 'center';
        }

        this.recipeIns = localStorage.getItem('recipeIns');
        this.eventIns = localStorage.getItem('eventIns');
        this.userPoints = localStorage.getItem('userPoints');


  	}

    updatePhoto(){
        let preview = document.getElementById('uploadedPhoto');
        this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
        if (this.userDetail.avatar) {
            this.fileUrl = this.userDetail.avatar;
            preview.style.backgroundImage = 'url("'+this.userDetail.avatar+'")';
            preview.style.backgroundSize  = 'cover';
            preview.style.backgroundPosition  = 'center';
        }else{
            preview.style.backgroundImage = 'url("/assets/pez_login.gif")';
            preview.style.backgroundSize  = 'cover';
            preview.style.backgroundPosition  = 'center';
        }
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

    async dismissLoad() {
        return await this.loadingController.dismiss();
    }

  	ranking(){
        this.navCtrl.navigateForward('/ranking');
    }

    bonus(){
        this.navCtrl.navigateForward('/bonus');
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

        fileTransfer.upload(this.imageURI, this.env.API_URL+'/api/uploadPhoto/'+this.userDetail.id, options)
        .then((data) => {
            var dd = JSON.parse(data['response']);
            console.log(dd);
            localStorage.setItem('userDetail' , dd.user);
            this.events.publish('checkUser');
            this.fileUrl = dd.fileUrl;
            this.updatePhoto();
            this.dismissLoad();
            this.presentToast('Foto actualizada exitosamente');
        }, (err) => {
            this.dismissLoad();
            console.log(err)
            this.presentToast('Error al subir la imagen, intente mas tarde!');
        });
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: EditPage,
            cssClass:'modalClass'
        });
        return await modal.present();
    }

    updateUser(form: NgForm){
        alert('Hola');
    }
}

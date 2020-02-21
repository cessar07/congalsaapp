import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController , LoadingController , ToastController , Events } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'; 

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
	userDetail: any;
	username:any;
  	constructor(
  		public modalController: ModalController,
  		private authService: AuthService,
  		private loadingController: LoadingController,
  		private toastController: ToastController,
  		public events: Events
  	) { }

  	ngOnInit() {
  		this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
  		if (this.userDetail) {
  			this.username = this.userDetail.user;
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
  	
  	updateUser(form: NgForm){
  		this.authService.updateData(form.value.user).subscribe(
      		data => {
               	console.log(data);
               	let response = Object.values(data);
               	if(response[0] != true){
               		this.loadingController.dismiss();
               		this.presentToast('Error al actualizar los datos, intente mas tarde');
               	}else{
               		localStorage.setItem('userDetail' , response[2]);
               		this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
               		this.username = this.userDetail.user;
               		this.events.publish('checkUser');
               		this.loadingController.dismiss();
               		this.presentToast('Usuario actualizado exitosamente');
               		this.modalController.dismiss();
               	}
      		},
      		error => {
        		console.log(error);
        		this.loadingController.dismiss();
               	this.presentToast('Error al actualizar los datos, intente mas tarde');
      		},
      		() => {
        		// this.dismissLogin();
      		}
    	);
  	}

  	closeModal(){
  		this.modalController.dismiss();
  	}
}	

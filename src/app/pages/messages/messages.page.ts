import { Component, OnInit , ViewChild } from '@angular/core';
import { NavController , ToastController , 
    IonInfiniteScroll , IonSlides 
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'; 
import { EnvService } from '../../services/env.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
    message = '';
    messages = [];
    currentUser = '';
    userDetails: any;
    usersApp: any;
    groups: any;
    @ViewChild(IonInfiniteScroll , {static:false}) infiniteScroll: IonInfiniteScroll;
    @ViewChild('sliderMessages' , {static: true})  slides: IonSlides;
    slideOpts = {
        slidesPerView: 4,
    }
  	constructor(
  		private navCtrl: NavController, 
        private toastCtrl: ToastController,
        private authService: AuthService,
        private env: EnvService,
        private socket: Socket,
  	) { }

  	ngOnInit() {
        this.userDetails = JSON.parse(localStorage.getItem('userDetail'));
        let name = this.userDetails.user;
        this.currentUser = name;
        this.slides.options = this.slideOpts;
        this.socket.connect();
        this.socket.emit('set-name', this.userDetails.id);
        this.socket.fromEvent('users-changed').subscribe(data => {
            let user = data['user'];
            if (data['event'] === 'left' && user != this.currentUser) {
                // this.showToast('User left: ' + user);
                let e = document.getElementById('userCon_'+user);
                if (e) {
                    e.style.background = 'red';
                }
            } else {
                if (user != this.currentUser) {
                    // this.showToast('User joined: ' + user);
                }
                let e = document.getElementById('userCon_'+user);
                if (e) {
                    e.style.background = 'green';
                }
                console.log(user);
            }
        });
  	}

    ionViewWillEnter(){
        // if (!localStorage.getItem('usersApp')) {      
            
        // }else{
        //     this.usersApp = JSON.parse(localStorage.getItem('usersApp'));
        //     this.groups = JSON.parse(localStorage.getItem('groups'));
        //     let dd = JSON.parse(localStorage.getItem('usersApp'));
        //     let dd2 = JSON.parse(localStorage.getItem('groups'));
        //     setTimeout(function(){
        //         dd.forEach((e)=>{
        //             let div = document.getElementById('user_photo_'+e.id);
        //             if (e.avatar) {
        //                 div.style.backgroundImage = 'url("'+e.avatar+'")';
        //             }else{
        //                 div.style.backgroundImage = 'url("/assets/pez_login.gif")';
        //             }
        //             div.style.backgroundSize      = 'cover';
        //             div.style.backgroundPosition  = 'center';
        //             // console.log(div);
        //         });

        //         dd2.forEach((e)=>{
        //             let div = document.getElementById('userPho_'+e.id);
        //             if (e.avatar) {
        //                 div.style.backgroundImage = 'url("'+e.avatar+'")';
        //             }else{
        //                 div.style.backgroundImage = 'url("/assets/pez_login.gif")';
        //             }
        //             div.style.backgroundSize      = 'cover';
        //             div.style.backgroundPosition  = 'center';
        //             // console.log(div);
        //         });
        //     } , 500);
        // }

        this.authService.messagesData().subscribe(
            data => {
                this.usersApp = data['users'];
                this.groups = data['groups'];
                localStorage.setItem('usersApp' , JSON.stringify(data['users']));
                localStorage.setItem('groups' , JSON.stringify(data['groups']));
                setTimeout(function(){
                    data['users'].forEach((e)=>{
                        let div = document.getElementById('user_photo_'+e.id);
                        if (e.avatar) {
                            div.style.backgroundImage = 'url("'+e.avatar+'")';
                        }else{
                            div.style.backgroundImage = 'url("/assets/pez_login.gif")';
                        }
                        div.style.backgroundSize      = 'cover';
                        div.style.backgroundPosition  = 'center';
                        // console.log(div);
                    });

                    data['groups'].forEach((g)=>{
                        let div = document.getElementById('userPho_'+g.id);
                        if (div) {
                            if (g.userInfo2.avatar) {
                                div.style.backgroundImage = 'url("'+g.userInfo2.avatar+'")';
                            }else{
                                div.style.backgroundImage = 'url("/assets/pez_login.gif")';
                            }
                            div.style.backgroundSize      = 'cover';
                            div.style.backgroundPosition  = 'center';
                        }
                        // console.log(div);
                    });
                } , 200);
            }
        );
    }

    ionViewDidEnter(){
    }

  	ranking(){
        this.navCtrl.navigateForward('/ranking');
    }

    goMessage(user){
        localStorage.setItem('otherActive' , user);
        this.navCtrl.navigateForward('/detail-messages');   
    }

    perfil(){
        this.navCtrl.navigateForward('/perfil');   
    }

    bonus(){
        this.navCtrl.navigateForward('/bonus');   
    }

    ionViewWillLeave() {
        this.socket.disconnect();
    }
}

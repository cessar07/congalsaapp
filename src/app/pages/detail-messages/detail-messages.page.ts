import { Component, OnInit , ViewChild } from '@angular/core';
import { NavController , ToastController , 
    IonInfiniteScroll , IonSlides , IonContent
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'; 
import { EnvService } from '../../services/env.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-detail-messages',
  templateUrl: './detail-messages.page.html',
  styleUrls: ['./detail-messages.page.scss'],
})
export class DetailMessagesPage implements OnInit {
	userDetails:any;
	other:any;
	messages:any;
	text:any;
	@ViewChild(IonContent , {static: false}) content: IonContent;
  	constructor(
  		private navCtrl: NavController, 
        private toastCtrl: ToastController,
        private authService: AuthService,
        private env: EnvService,
        private socket: Socket,
  	) { }

  	ngOnInit() {
        this.socket.connect();
        this.socket.fromEvent('message').subscribe(message => {
            this.messages.push(message['message'].message);
        });
  	}

  	ionViewWillEnter(){
  		this.userDetails = JSON.parse(localStorage.getItem('userDetail'));
  		this.other = localStorage.getItem('otherActive');

  		this.authService.messagesDataOther(this.userDetails.id , this.other).subscribe(
            data => {
            	localStorage.setItem('groupActive' , JSON.stringify(data['group']));
            	this.messages = data['group'].messages;
            	console.log(this.messages);
            	this.content.ionScrollEnd;
            }
        );
  	}

  	sendM(){
  		console.log(this.text);
  		let user  = JSON.parse(localStorage.getItem('userDetail'));
  		let group = JSON.parse(localStorage.getItem('groupActive'));
  		if (this.text != '') {
  			this.authService.sendMessage(user.id , group.id , this.text).subscribe(
	            data2 => {
	            	// console.log(data);
		            // this.messages.push(data['message']);
		            this.text = '';
		            let doo = document.getElementById('scrollingContainer');
		            let st  = doo.scrollHeight + parseInt('200'); 
		            this.content.scrollToPoint(0 , 300);
                    this.socket.emit('send-message', {message:data2['message']});
	            }
	        );
  		}
  	}
}

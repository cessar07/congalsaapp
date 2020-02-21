import { Component, OnInit , ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
import { EnvService } from '../../services/env.service';
import { NavController , IonInfiniteScroll } from '@ionic/angular'; 
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
	events: any;
    skip_events:any = 0;
    @ViewChild(IonInfiniteScroll , {static:false}) infiniteScroll: IonInfiniteScroll;
  	constructor(
  		private authService: AuthService,
  		private env: EnvService,
        private navCtrl: NavController,
  	) { }

  	ngOnInit() {
  		this.authService.events().subscribe(
      		data => {
        		this.events = data;
        		console.log(data);
      		}
    	);
  	}

    loadData(event){
        this.skip_events = parseInt(this.skip_events) + parseInt('5');
        this.authService.eventsMore(this.skip_events).subscribe(
            data => {
                let cc = data[0];
                if (!cc) {
                    event.target.complete();
                }else{
                    for (var i=0; i<5; ++i) {
                        this.events.push(data[i]);
                    }
                    this.loadData(event);
                }
                console.log(this.events);
            }
        );
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

    viewEvent(e){
        localStorage.setItem('eventActive' , JSON.stringify(e));
        this.navCtrl.navigateForward('/detail-event');
    }
}

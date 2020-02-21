import { Component, OnInit , Injectable , ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
import { EnvService } from '../../services/env.service';
import { NavController , IonInfiniteScroll } from '@ionic/angular';
@Component({
  	selector: 'app-news',
  	templateUrl: './news.page.html',
  	styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
	news : any;
    skip_news:any = 0;
    @ViewChild(IonInfiniteScroll , {static:false}) infiniteScroll: IonInfiniteScroll;
  	constructor(
  		private authService: AuthService,
  		private env: EnvService,
        private navCtrl: NavController,
  	) { }

  	ngOnInit() {
  	}

  	ionViewWillEnter(){
  		this.authService.news().subscribe(
      		data => {
        		this.news = data;
        		// console.log(data);
      		}
    	);
  	}

    loadData(event){
        this.skip_news = parseInt(this.skip_news) + parseInt('5');
        this.authService.newssMore(this.skip_news).subscribe(
            data => {
                let cc = data[0];
                if (!cc) {
                    event.target.complete();
                }else{
                    for (var i=0; i<5; ++i) {
                        this.news.push(data[i]);
                    }
                    this.loadData(event);
                }
                console.log(this.news);
            }
        );
    }

    viewNew(n){
        localStorage.setItem('newActive' , JSON.stringify(n));
        this.navCtrl.navigateForward('/detail-new');
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
}

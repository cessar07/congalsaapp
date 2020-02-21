import { Component, OnInit , ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
import { EnvService } from '../../services/env.service';
import { NavController , IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-socials', 
  templateUrl: './socials.page.html',
  styleUrls: ['./socials.page.scss'],
})
export class SocialsPage implements OnInit {
	socials : any;
    skip_socials:any = 0;
    items:any;
    @ViewChild(IonInfiniteScroll , {static:false}) infiniteScroll: IonInfiniteScroll;
  	constructor(
  		private authService: AuthService,
  		private env: EnvService,
        private navCtrl: NavController,
  	){ 
        this.initializeItems();
    }

  	ngOnInit() {
  		this.authService.socials().subscribe(
      		data => {
        		this.socials = data;
                this.items = data;
        		console.log(data);
      		}
    	);
  	}

    loadData(event){
        this.skip_socials = parseInt(this.skip_socials) + parseInt('5');
        this.authService.socialsMore(this.skip_socials).subscribe(
            data => {
                let cc = data[0];
                if (!cc) {
                    event.target.complete();
                }else{
                    for (var i=0; i<5; ++i) {
                        this.socials.push(data[i]);
                    }
                    this.loadData(event);
                }
                console.log(this.socials);
            }
        );
    }

  	viewSocial(s){
        localStorage.setItem('socialActive' , JSON.stringify(s));
        this.navCtrl.navigateForward('/detail-socials');
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
    initializeItems(){
        this.socials = this.items;
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        const val   = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.socials = this.items.filter((item) => {
                return (item.company.toLowerCase().indexOf(val.toLowerCase()) > -1); 
            })
        }
    }
}

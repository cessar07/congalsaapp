import { Component, OnInit , ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from '../../services/env.service';
import { NavController , IonSlides} from '@ionic/angular';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
	recipes : any;
    lastsRecipes : any;
    @ViewChild('sliderRecipes' , {static: true})  slides: IonSlides;
    slideOpts = {
        slidesPerView: 2,
    }
  	constructor(
  		private authService: AuthService,
        private env: EnvService,
        public navCtrl: NavController
  	) { }

  	ngOnInit() {
  		this.authService.recipes().subscribe(
      		data => {
        		this.lastsRecipes = data['lr']
                this.recipes = data['r'];
        		console.log(data);
      		}
    	);
        this.slides.options = this.slideOpts;
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

    viewRecipe(r){
        localStorage.setItem('activeRecipe' , JSON.stringify(r));
        this.navCtrl.navigateForward('/detail-recipe');
    }
}

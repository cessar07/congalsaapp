import { Component, OnInit , ViewChild } from '@angular/core';
import { IonSlides , IonContent , NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'; 
import { EnvService } from '../../services/env.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'], 
})
export class QuestionsPage implements OnInit {
	questions : any;
    answers: any = [];
    answersR : any = [];
    userPoints : any = 150;
    userDetail : any;
    @ViewChild('mySlider' , {static: true})  slides: IonSlides;
    @ViewChild(IonContent , {static: true}) content: IonContent;
    slideOpts = {
        autoHeight: true,
    }
  	constructor(
        private navCtrl: NavController,
        private authService: AuthService,
        private env: EnvService,
    ) {}

  	ngOnInit() {
        this.slides.lockSwipes(true);
        this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
        this.slides.options = this.slideOpts;

        let preview = document.getElementById('usserPhooto');
        if (this.userDetail.avatar) {
            preview.style.backgroundImage = 'url("'+this.userDetail.avatar+'")';
            preview.style.backgroundSize  = 'cover';
            preview.style.backgroundPosition  = 'center';
        }else{
            preview.style.backgroundImage = 'url("/assets/pez_login.gif")';
            preview.style.backgroundSize  = 'cover';
            preview.style.backgroundPosition  = 'center';
        }
  	}

  	ionViewWillEnter(){
  		this.questions = JSON.parse(localStorage.getItem('questions'));
  	}

    ionViewDidEnter(){
        // let vide = document.getElementsByTagName('video');
        // for (var i = 0; i < vide.length; ++i) {
        //     vide[i].muted = true;
        // }
    }

    addAnswer(a , q, o){
        this.slides.getActiveIndex().then(index => {
            if (a) {
                this.answers[index] = ['Correcto', q.points];
            }else{
                this.answers[index] = ['Inorrecto', 0];
            }
            // console.log(this.answers);
        });
    }

  	nextSlide(){
        this.slides.getActiveIndex().then(index => {
            if (this.answers[index]) {
                // let vid = document.getElementsByTagName('video');
                // vid[index].pause();
                // if (vid[index+1]) {
                //     vid[index+1].play();
                // }
                if (this.answers[index][1] == 0) {
                    this.userPoints = parseInt(this.userPoints) - 50;
                }
                if (index == 2) {
                    let dv = document.getElementById('pyro');
                    dv.classList.add('pyro');
                }
                this.answers[index][1];
                this.slides.lockSwipes(false);
                this.content.scrollToTop();
          		this.slides.slideNext();
                this.slides.lockSwipes(true);
            }else{
                alert('Selecciona una opción');
            }
        });
  	}

    getPoints(){
        localStorage.setItem('userPoints' , this.userPoints);
        localStorage.setItem('questionsVery' , '1');
        this.navCtrl.navigateRoot('/dashboard');
    }
} 

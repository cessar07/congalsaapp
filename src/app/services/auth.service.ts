import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { ToastController , LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	isLoggedIn = false;
  	token:any;

  	constructor(
  		private http: HttpClient,
    	private storage: NativeStorage,
    	private env: EnvService,
        private toastController: ToastController,
        private loadingController: LoadingController,
  	) { }

    async presentToast(message: any) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            position: 'top',
            color: 'dark'
        });
        toast.present();
    }

    async presentLoad(action : any) {
        const load = await this.loadingController.create({
            message: 'Procesando',
        });
        load.present();
    }

    async dismissLoad() {
        return await this.loadingController.dismiss();
    }

  	login(user: String, password: String) {
        this.presentLoad(1);
    	return this.http.post(this.env.API_URL + '/api/login',
      		{user: user, password: password}
    	).pipe(
      		tap(token => {
                let uu = Object.values(token);
                if (uu[0] != true) {
                    this.presentToast(uu[1]);
                    this.dismissLoad();
                }else{
                    this.dismissLoad();
                    let tok = localStorage.setItem('token', uu[1]);
                    let tok2 = localStorage.setItem('userDetail', uu[2]);
                    let tok3 = localStorage.setItem('questions', uu[3]);
                    this.token = tok;
                    this.isLoggedIn = true;
                }
                return uu[1];
      		}),
    	);
  	}

    updateData(user: String) {
        this.presentLoad(1);
        let tt = localStorage.getItem('token');
        return this.http.post(this.env.API_URL + '/api/updateUser/'+tt,
            {user: user}
        ).pipe(
            tap(data => {
                return data;    
            }),
        );
    }

    sendRecipe(detail: String , idDetail) {
        this.presentLoad(1);
        return this.http.post(this.env.API_URL + '/api/updateDetailRecipe/'+idDetail,
            {detail: detail}
        ).pipe(
            tap(data => {
                return data;    
            }),
        );
    }

    sendEvent(detail: String , idDetail) {
        this.presentLoad(1);
        return this.http.post(this.env.API_URL + '/api/updateDetailEvent/'+idDetail,
            {detail: detail}
        ).pipe(
            tap(data => {
                return data;    
            }),
        );
    }

    sendMessage(user, group , message) {
        return this.http.post(this.env.API_URL + '/api/sendMessage',
            {
                user: user,
                group:group,
                message:message,
            }
        ).pipe(
            tap(data => {
                return data;    
            }),
        );
    }

  	register(name: String, email: String, password: String) {
    	return this.http.post(this.env.API_URL + 'auth/register',
      		{name: name, email: email, password: password}
    	)
  	}

  	logout() {
        localStorage.removeItem('token');
        // localStorage.removeItem('userPoints');
        localStorage.removeItem('questionsVery');
        // localStorage.removeItem('recipeIns');
        // localStorage.removeItem('eventIns');
        localStorage.removeItem('usersApp');
        this.isLoggedIn = false;
        delete this.token;
  	}

  	user() {
    	const headers = new HttpHeaders({
      		'Authorization': '*'
    	});
    	return this.http.get<User>(this.env.API_URL+'/api/get-user/'+localStorage.getItem('token'), { headers: headers })
    	.pipe(
      		tap(user => {
        		return user;
      		})
    	)
  	}

    news() {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        return this.http.get(this.env.API_URL+'/api/get-news', { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    recipes() {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        return this.http.get(this.env.API_URL+'/api/get-recipes', { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    events() {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        return this.http.get(this.env.API_URL+'/api/get-events', { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    socials() {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        return this.http.get(this.env.API_URL+'/api/get-socials', { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    socialsMore(skip) {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        return this.http.get(this.env.API_URL+'/api/get-socials/more/'+skip, { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    newssMore(skip) {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        return this.http.get(this.env.API_URL+'/api/get-news/more/'+skip, { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    eventsMore(skip) {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        return this.http.get(this.env.API_URL+'/api/get-events/more/'+skip, { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    messagesData() {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        let tt = localStorage.getItem('token');
        return this.http.get(this.env.API_URL+'/api/get-messages/'+tt, { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    messagesDataOther(user, other) {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        return this.http.get(this.env.API_URL+'/api/get-messages-other/'+user+'/'+other, { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    rankingData() {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        let tt = localStorage.getItem('token');
        return this.http.get(this.env.API_URL+'/api/get-ranking/'+tt, { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    rankingDataSem() {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        let tt = localStorage.getItem('token');
        return this.http.get(this.env.API_URL+'/api/get-ranking-sem/'+tt, { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    rankingDataMonth() {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        let tt = localStorage.getItem('token');
        return this.http.get(this.env.API_URL+'/api/get-ranking-month/'+tt, { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    pointsUser() {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        let tt = localStorage.getItem('token');
        let points = localStorage.getItem('userPoints');
        return this.http.get(this.env.API_URL+'/api/updatePoints/'+tt+'/'+points, { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    sendProduct(pro , user) {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        return this.http.get(this.env.API_URL+'/api/exchange/product/'+pro+'/'+user, { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

    getUserProducts() {
        const headers = new HttpHeaders({
            'Authorization': '*'
        });
        let tt = localStorage.getItem('token');
        return this.http.get(this.env.API_URL+'/api/get-products/'+tt, { headers: headers })
        .pipe(
            tap(data => {
                return data;
            })
        )
    }

  	getToken() {
       let tt = localStorage.getItem('token');
       if (tt) {
           this.isLoggedIn=true;
       }else{
           this.isLoggedIn=false;
       }
       return this.isLoggedIn;
  	}
}

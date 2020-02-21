import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy , NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { HTTP } from '@ionic-native/http/ngx';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'https://betatestpro.com:3001', options: {transports: ['websocket']} };
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { EditPage } from '../app/pages/edit/edit.page';
import { FormsModule }   from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        EditPage
    ],
    entryComponents: [
        EditPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        SocketIoModule.forRoot(config),
        FormsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        NativeStorage,
        HTTP,
        FileTransfer,
        Camera
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

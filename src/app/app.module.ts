import {NgModule} from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AudioManagement} from '@ionic-native/audio-management/ngx';
import {VolumeControlService} from './services/volume-control.service';

export class MyHammerConfig extends HammerGestureConfig {

    overrides = {
        tap: {pointers: 1, taps: 1},
        swipe: {direction: Hammer.DIRECTION_ALL},
        pan: {direction: Hammer.DIRECTION_ALL, event: 'pantest'}
    };

    buildHammer(element: HTMLElement) {
        const mc = new (window as any).Hammer(element);

        for (const eventName in this.overrides) {
            if (eventName) {
                mc.get(eventName).set(this.overrides[eventName]);
            }
        }

        return mc;
    }
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HammerModule],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        AudioManagement,
        VolumeControlService, {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

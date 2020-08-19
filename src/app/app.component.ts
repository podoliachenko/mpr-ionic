import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {VolumeControlService} from './volume-control.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private volumeControlService: VolumeControlService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            document.addEventListener('volumedownbutton', () => this.onVolumeDownKeyDown(), false);
            document.addEventListener('volumeupbutton', () => this.onVolumeUpKeyDown(), false);
        });
    }

    onVolumeDownKeyDown() {
        this.volumeControlService.decrease(2);
    }

    onVolumeUpKeyDown() {
        this.volumeControlService.increase(2);
    }
}

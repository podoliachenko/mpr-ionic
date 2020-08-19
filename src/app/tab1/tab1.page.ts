import {Component, ViewChild} from '@angular/core';
import {AlertController, Platform, PopoverController} from '@ionic/angular';
import {VolumeControlService} from '../volume-control.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    @ViewChild('pcName') pcName: any;

    constructor(private platform: Platform, public volumeControlService: VolumeControlService,
                public alertController: AlertController, public popoverController: PopoverController) {
        this.platform.ready().then(() => {
        });
    }

    async openAlertSetVolume() {
        const alert = await this.alertController.create({
            header: 'Задать громкость',
            inputs: [
                {
                    name: 'volume',
                    type: 'number',
                    placeholder: 'Громкость',
                    value: this.volumeControlService.volume,
                    min: 0,
                    max: 100
                }
            ],
            buttons: [
                {
                    text: 'Отменить',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ок',
                    handler: ({volume}) => {
                        this.volumeControlService.setVolume(volume);
                    }
                }
            ]
        });

        await alert.present();
    }

    async showPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: Tab1PopoverComponent,
            cssClass: 'my-custom-class',
            event: ev,
            translucent: true
        });
        return await popover.present();
    }
}

@Component({
    selector: 'app-tab1-popover',
    template: `
        <ion-list>
            <ion-item button>Выключить</ion-item>
            <ion-item button>Выключеть по таймеру</ion-item>
            <ion-item button>Отменить выключение</ion-item>
        </ion-list>
    `
})
export class Tab1PopoverComponent {
}

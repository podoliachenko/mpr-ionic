import {Component, ViewChild} from '@angular/core';
import {AlertController, Platform, PopoverController} from '@ionic/angular';
import {VolumeControlService} from '../services/volume-control.service';

@Component({
    selector: 'app-tab',
    templateUrl: 'tab.page.html',
    styleUrls: ['tab.page.scss']
})
export class TabPage {

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
                    label: 'Громкость',
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
            component: TabPopoverComponent,
            event: ev,
            showBackdrop: false,
        }).then(value => {
            console.log(value);
            return value;
        });
        return await popover.present();

    }
}

@Component({
    selector: 'app-tab-popover',
    template: `
        <ion-list>
            <ion-item button (click)="popoverController.dismiss(); shutdownAlert()">
                <ion-icon name="power-outline"></ion-icon>&nbsp;Выключить
            </ion-item>
            <ion-item button (click)="popoverController.dismiss(); shutdownTimerAlert();">
                <ion-icon name="time-outline"></ion-icon>&nbsp;Выключеть по таймеру
            </ion-item>
            <ion-item button lines="none" (click)="popoverController.dismiss(); cancelShutdownTimer()">
                <ion-icon name="close-circle-outline"></ion-icon>&nbsp;Отменить выключение
            </ion-item>
        </ion-list>
    `
})
export class TabPopoverComponent {
    constructor(public popoverController: PopoverController, public alertController: AlertController) {
    }

    public async shutdownAlert() {
        const alert = await this.alertController.create({
            header: 'Выключение',
            message: 'Вы действительно хотите выключить компьютер?',
            buttons: [
                {
                    text: 'Отменить',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Ок',
                }
            ]
        });

        await alert.present();
    }

    public async shutdownTimerAlert() {
        const alert = await this.alertController.create({
            header: 'Выключить через (в минутах): ',
            inputs: [
                {
                    name: 'minutes',
                    type: 'number',
                    placeholder: 'Минут',
                    label: 'Минут',
                }
            ],
            buttons: [
                {
                    text: 'Отменить',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Ок',
                    handler: ({minutes}) => {
                    }
                }
            ]
        });

        await alert.present();
    }

    cancelShutdownTimer() {

    }
}

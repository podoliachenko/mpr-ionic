import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export class VolumeControlService {

    public volume$: BehaviorSubject<number>;

    public volume = 0;
    public isMuted = false;

    constructor(private zone: NgZone) {
        this.volume$ = new BehaviorSubject<number>(0);
    }

    setVolume(volume) {
        this.zone.run(() => {
            if (volume >= 100) {
                this.volume = 100;
            } else if (volume <= 0) {
                this.volume = 0;
            } else {
                this.volume = volume;
            }
            this.volume$.next(this.volume);
        });
    }

    increase(volume) {
        this.setVolume(this.volume + volume);
    }

    decrease(volume) {
        this.setVolume(this.volume - volume);
    }
}

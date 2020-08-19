import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CursorService} from '../../services/cursor.service';

@Component({
    selector: 'app-touch-pad',
    templateUrl: './touch-pad.component.html',
    styleUrls: ['./touch-pad.component.scss']
})
export class TouchPadComponent implements OnInit {

    @ViewChild('element', {static: true}) element;

    constructor(private elementRef: ElementRef, private cursor: CursorService) {
    }

    ngOnInit() {
        const mc = new Hammer.Manager(this.elementRef.nativeElement,
            {
                recognizers: [
                    [Hammer.Tap, {pointers: 2, event: 'tap2'}],
                    [Hammer.Tap, {pointers: 1}],
                    [Hammer.Press, {time: 300}],
                    [Hammer.Pan, {direction: Hammer.DIRECTION_VERTICAL, pointers: 2, event: 'pan-scroll'}],
                    [Hammer.Pan, {direction: Hammer.DIRECTION_ALL, pointers: 1}],
                ],
            });
        mc.on('pan', (ev) => this.pan(ev));
        mc.on('tap', (ev) => this.tap(ev));
        mc.on('tap2', (ev) => this.tap2(ev));
        mc.on('pan-scroll', (ev) => this.panScroll(ev));
        mc.on('press', (ev) => this.press(ev));
    }

    private pan(ev: HammerInput) {
        console.log('pan', ev);
        this.cursor.moveCursor({x: 0, y: 0});
    }

    private tap(ev: HammerInput) {
        console.log('tap', ev);
        this.cursor.clickLeftButton();
    }

    private tap2(ev: HammerInput) {
        console.log('tap2', ev);
        this.cursor.clickRightButton();
    }

    private panScroll(ev: HammerInput) {
        console.log('panScroll', ev);
        this.cursor.scroll({y: 0});
    }

    private press(ev: HammerInput) {
        console.log('press', ev);
        this.cursor.press();
    }
}

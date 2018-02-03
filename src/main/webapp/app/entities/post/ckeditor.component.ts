import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component ({
    selector: 'jhi-ckeditor',
    template: `
       <ckeditor
        [(ngModel)]="ckeditorContent"
        (change)="onChange($event)"
        [config]="{uiColor: '#FFFFFF'}">
      </ckeditor>
    `
})
export class CkeditorComponent {
    @Input() ckeditorContent: String;
    @Output('ckeditorContentChange') ckeditorContentChange: EventEmitter<any> = new EventEmitter<any>();

    onChange(event) {
        this.ckeditorContentChange.emit(event);
    }

    constructor() {
        this.ckeditorContent = '';
    }
}

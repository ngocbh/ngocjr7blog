import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'jhi-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
    styleUrls: [
        'sidebar-nav.css'
    ]
})
export class SidebarNavComponent implements OnInit, DoCheck {
    @Input('choice') static choice: String = '';
    @Output('choiceChange') choiceChange: EventEmitter<String> = new EventEmitter<String>();
    constructor() {
    }

    ngOnInit() {
    }

    ngDoCheck() {
        this.choiceChange.emit(SidebarNavComponent.choice);
    }

    onClick() {
        SidebarNavComponent.choice = 'resume';
        this.choiceChange.emit(SidebarNavComponent.choice);
    }

}

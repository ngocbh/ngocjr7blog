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
    isVisible: Boolean = false;
    constructor() {
    }

    ngOnInit() {
    }

    ngDoCheck() {
        this.choiceChange.emit(SidebarNavComponent.choice);
    }

    send() {
    }

    onClickMessage() {
        this.isVisible = !this.isVisible;
        console.log(document);
        const messageItem = document.getElementById('messageItem');
        console.log(messageItem);
        messageItem.style.height =  'auto';
        // const mySidebar = document.getElementById('my-sidebar');
        // console.log(mySidebar);
        // mySidebar.style.width = '250px';
    }

    cancel() {
        this.isVisible = false;
        // console.log(document);
        // const messageItem = document.getElementById('messageItem');
        // console.log(messageItem);
        // messageItem.style.height =  '61px';
        // const mySidebar = document.getElementById('my-sidebar');
        // console.log(mySidebar);
        // // mySidebar.style.width = '60px';
    }

    onClick() {
        SidebarNavComponent.choice = 'resume';
        this.isVisible = false;
        this.choiceChange.emit(SidebarNavComponent.choice);
    }

}

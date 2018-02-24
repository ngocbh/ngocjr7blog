import {Component, OnDestroy, OnInit, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ComponentFactory} from '@angular/core';
import { SidebarNavComponent } from '../layouts/sidebar-nav/sidebar-nav.component';
import { Router, RouterState, ActivatedRoute } from '@angular/router';
// require('./vendor/bootstrap/js/bootstrap.bundle.min.js');
// // require('./vendor/jquery/jquery.min.js');
// // require('./vendor/jquery-easing/jquery.easing.min.js');
// require('./js/resume.js');

@Component({
    selector: 'jhi-resume',
    templateUrl: './resume.component.html',
    styleUrls: [
        './css/resume.min.css',
        './scss/resume.scss'
    ]
})
export class ResumeComponent implements OnDestroy, OnInit {
    resume: any;

    constructor(
    ) {

    }

    ngOnInit() {
        SidebarNavComponent.choice = 'resume';
        // console.log(this.state);
        // console.log(this.root);
    }

    ngOnDestroy() {
        SidebarNavComponent.choice = 'nochoice';
        console.log(SidebarNavComponent.choice);
        console.log('OnDestroy');
    }

}

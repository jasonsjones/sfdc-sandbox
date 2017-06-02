
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PeopleService } from './people.service';

@Component({
    templateUrl: 'src/app/user/user-profile.component.html',
    styles: ['.profile-image { width: 180px; border-radius: 50%; ']
})
export class UserProfile implements OnInit { 

    public user: any;
    constructor(private peopleService: PeopleService,
                private route: ActivatedRoute) { }

    ngOnInit() : void {
        let id = this.route.snapshot.params['id'];
        this.peopleService.getUser(id)
            .subscribe(data => {
                this.user = data.payload;
                console.log(this.user);
            })
    }
}
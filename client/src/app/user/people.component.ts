import { Component, OnInit } from '@angular/core';

import { PeopleService } from './people.service';

@Component({
    templateUrl: 'src/app/user/people.component.html'
})
export class PeopleComponent implements OnInit { 
    public people: any[];
    constructor(private peopleService: PeopleService) { }

    ngOnInit() : void {
        this.peopleService.getPeople()
            .subscribe(data => {
                if (data.success) {
                    this.people = data.payload;
                    console.log(this.people);
                }
            });
    }
}
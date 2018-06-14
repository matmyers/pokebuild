import { Component, OnInit } from '@angular/core';
import { PkmncubbyComponent } from '../pkmncubby/pkmncubby.component';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamMembers = [];
  tier = "Select tier";


  constructor() { }

  ngOnInit() {
  }

  isTeamEmpty() {
  	if (this.teamMembers.length == 0) {
  		return true;
  	} else {
  		return false;
  	}
  }

  isTeamFull() {
  	if (this.teamMembers.length == 6) {
  		return true;
  	} else {
  		return false;
  	}
  }

  addTeamMember() {
  	var newpoke = new PkmncubbyComponent();
  	this.teamMembers.push(newpoke);
  }

}

import { Component, OnInit } from '@angular/core';
import { PkmncubbyComponent } from '../pkmncubby/pkmncubby.component';
import * as pkmnData from "../../assets/pokemon.json"


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamMembers = [];
  tier = "Select tier";
  pkmn = pkmnData;
  tierpkmn = [];
  displayPokemon = false;


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
  	if (this.teamMembers.length >= 6) {
  		return true;
  	} else {
  		return false;
  	}
  }

  setTier(tierInput: string) {
  	this.tier = tierInput;
  	this.tierpkmn = this.pkmn[this.tier];
  	this.displayPokemon = false;
  }

  addTeamMember(poke: string) {
  	this.teamMembers.push(poke);
  }

  removeTeamMember(index: number) {
  	this.teamMembers.splice(index, 1);
  }

  printPokemon() {
  	this.displayPokemon = true;
  }

}

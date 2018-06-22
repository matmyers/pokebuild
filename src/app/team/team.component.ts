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
  tierSelected = false;
  searchInput = "";


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
    this.tierSelected = true;
  	this.displayPokemon = true;
  }

  addTeamMember(poke: string) {
  	this.teamMembers.push(poke);
    this.displayPokemon = false;
  }

  removeTeamMember(index: number) {
  	this.teamMembers.splice(index, 1);
  }

  printPokemon() {
    this.tierpkmn = this.pkmn[this.tier];
  	this.displayPokemon = true;
  }

  onUpdateSearchField(event: Event) {
    this.searchInput = event.target.value;
    this.tierpkmn = [];
    // search by name
    for (var i = 0; i < this.pkmn[this.tier].length; ++i) {
      if (this.pkmn[this.tier][i].toLowerCase().includes(this.searchInput.toLowerCase())) {
        this.tierpkmn.push(this.pkmn[this.tier][i]);
      }
    }
  }

}

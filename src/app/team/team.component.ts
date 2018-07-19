import { Component, OnInit, QueryList, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { PkmncubbyComponent } from '../pkmncubby/pkmncubby.component';
import * as pkmnData from "../../assets/tierList.json"


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @ViewChild('searchPoke') searchBar: ElementRef;

  @ViewChildren(PkmncubbyComponent) pkmnCubbies: QueryList<PkmncubbyComponent>;
  teamCubbies = [];

  teamMembers = [];
  tier = "Select tier";
  pkmn = pkmnData;
  tierpkmn = [];
  displayPokemon = false;
  tierSelected = false;
  searchInput = "";
  exportText = "";
  exportClicked = false;
  exportRows = 0;


  constructor() { }

  ngOnInit() {
  }

  scrollToSearch() {
    setTimeout(()=>{
      var searchDisplayArea = document.getElementById('searchDisplayArea');
      searchDisplayArea.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 10);
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
    setTimeout(()=>{
      this.searchBar.nativeElement.focus();
    },10);
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
    setTimeout(()=>{
      this.searchBar.nativeElement.focus();
    },10);
  }

  exportShowdown() {
    this.exportText = "";
    this.teamCubbies = this.pkmnCubbies.toArray();
    for (var i = 0; i < this.teamCubbies.length; ++i) {
      this.exportText += this.teamCubbies[i].name;
      if (this.teamCubbies[i].item) {
        this.exportText += " @ " + this.teamCubbies[i].item + "\n";
      } else {
        this.exportText += "\n";
      }
      this.exportText += "Ability: " + this.teamCubbies[i].ability + "\n";
      this.exportText += "EVs: " + this.teamCubbies[i].ev[0] + " HP / " + this.teamCubbies[i].ev[1] + " Atk / " + this.teamCubbies[i].ev[2] + " Def / " + this.teamCubbies[i].ev[3] + " SpA / " + this.teamCubbies[i].ev[4] + " SpD / " + this.teamCubbies[i].ev[5] + " Spe\n";
      if (this.teamCubbies[i].nature !== "Select nature") {
        this.exportText += this.teamCubbies[i].nature + " Nature\n";
      }
      for (var j = 0; j < this.teamCubbies[i].moves.length; ++j) {
        if (this.teamCubbies[i].moves[j]) {
          this.exportText += "- " + this.teamCubbies[i].moves[j] + "\n";
        }
      }
      this.exportText += "\n";
    }

    this.exportRows = 9 * this.teamMembers.length + 1;
    this.exportClicked = true;
  }

  onUpdateSearchPokemon(event: Event) {
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

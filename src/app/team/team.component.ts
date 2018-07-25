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
  sprites = [];
  listedpkmnIndex = 0;
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

  setTier(tierInput: string) {
  	this.tier = tierInput;
  	this.tierpkmn = this.pkmn[this.tier];
    for (var i = 0; i < this.tierpkmn.length; ++i) {
      this.sprites[i] = "../../assets/sprites/" + this.tierpkmn[i].toLowerCase() + ".png";
    }
    this.tierSelected = true;
  	this.displayPokemon = true;
    setTimeout(()=>{
      this.searchBar.nativeElement.focus();
    },10);
  }

  navigatePokemon(event: Event) {
    if (event.keyCode == 13) {
      this.addTeamMember(this.tierpkmn[this.listedpkmnIndex]);
    } else if (event.keyCode == 38) {
      if (this.listedpkmnIndex > 0) {
        var prevHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        prevHoverPkmn.classList.remove('myHover');
        this.listedpkmnIndex--;
        var nextHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        nextHoverPkmn.classList.add('myHover');
      }
    } else if (event.keyCode == 40) {
      if (this.listedpkmnIndex < (this.tierpkmn.length-1)) {
        var prevHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        prevHoverPkmn.classList.remove('myHover');
        this.listedpkmnIndex++;
        var nextHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        nextHoverPkmn.classList.add('myHover');
      }
    }
  }

  highlightPokemon() {
    setTimeout(()=>{
      var hoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
      hoverPkmn.classList.add('myHover');
    }, 10);

    this.scrollToSearch();
  }

  setHover(newHoverIndex: number) {
    var prevHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
    prevHoverPkmn.classList.remove('myHover');
    this.listedpkmnIndex = newHoverIndex;
    var nextHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
    nextHoverPkmn.classList.add('myHover');
  }

  addTeamMember(poke: string) {
  	this.teamMembers.push(poke);
    this.displayPokemon = false;
  }

  removeTeamMember(index: number) {
  	this.teamMembers.splice(index, 1);
  }

  printPokemon() {
    this.listedpkmnIndex = 0;
    this.tierpkmn = this.pkmn[this.tier];
    for (var i = 0; i < this.tierpkmn.length; ++i) {
      this.sprites[i] = "../../assets/sprites/" + this.tierpkmn[i].toLowerCase() + ".png";
    }
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

    if (this.tierpkmn.length > 0) {
      // remove hover class only if there was something to hover over before
      var prevHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
      prevHoverPkmn.classList.remove('myHover');
    }

    this.tierpkmn = [];
    // search by name
    for (var i = 0; i < this.pkmn[this.tier].length; ++i) {
      if (this.pkmn[this.tier][i].toLowerCase().includes(this.searchInput.toLowerCase())) {
        this.tierpkmn.push(this.pkmn[this.tier][i]);
      }
    }

    for (var i = 0; i < this.tierpkmn.length; ++i) {
      this.sprites[i] = "../../assets/sprites/" + this.tierpkmn[i].toLowerCase() + ".png";
    }

    if (this.tierpkmn.length > 0) {
      // highlight only if there is something to highlight
      this.listedpkmnIndex = 0;
      this.highlightPokemon();
    }
  }

}

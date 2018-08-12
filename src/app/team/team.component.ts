import { Component, OnInit, QueryList, ViewChild, ViewChildren, ElementRef, ChangeDetectorRef } from '@angular/core';
import { PkmncubbyComponent } from '../pkmncubby/pkmncubby.component';
import * as pkmnData from "../../assets/tierList.json"
import * as allPkmnData from "../../assets/dataTest3.json"
import * as abilityData from "../../assets/abilities.json"
import * as moveData from "../../assets/moves.json"


enum Tier {
  Ubers = 0,
  OU,
  UUBL,
  UU,
  RUBL,
  RU,
  NUBL,
  NU,
  PUBL,
  PU,
  LC,
}

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
  teamSprites = [];
  viewPortItems = [];
  tier = "Select tier";
  tierpkmn = [];
  legalpkmn = [];
  tierKeys = Object.keys(pkmnData);
  tierEnum = Tier;
  allData = allPkmnData;
  sprites = [];
  listedpkmnIndex = 0;
  displayPokemon = false;
  tierSelected = false;
  searchInput = "";
  exportText = "";
  exportClicked = false;
  exportRows = 0;
  singlePokemonView = [false];
  typeKeys = ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fire", "Fighting", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"];
  abilityKeys = Object.keys(abilityData);
  moveKeys = Object.keys(moveData);


  constructor(private cd : ChangeDetectorRef) { }

  ngOnInit() {
    this.tierKeys.splice(-1,1);
  }

  scrollToSearch() {
    setTimeout(()=>{
      var searchDisplayArea = document.getElementById('searchDisplayArea');
      searchDisplayArea.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 10);
  }

  scrollToTop() {
    setTimeout(()=>{
      var top = document.getElementById('top');
      top.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 10);
  }

  setTier(tierInput: string) {
    this.tierpkmn = [];
    this.legalpkmn = [];
  	this.tier = tierInput;
    for (var k = 0; k < this.tierKeys.length; ++k) {
      if (this.tierKeys[k] !== 'VGC') {
        if (this.tierEnum[this.tierKeys[k]] >= this.tierEnum[this.tier]) {
          this.tierpkmn.push.apply(this.tierpkmn, pkmnData[this.tierKeys[k]]);
          this.legalpkmn.push.apply(this.legalpkmn, pkmnData[this.tierKeys[k]]);
        }
      }
    }

  	//this.tierpkmn = pkmnData[this.tier];
    for (var i = 0; i < this.tierpkmn.length; ++i) {
      this.sprites[i] = "../../assets/sprites/" + this.tierpkmn[i].toLowerCase().replace(/['%:.]/g,'') + ".png";
    }
    this.tierSelected = true;
  	this.displayPokemon = true;
    setTimeout(()=>{
      this.searchBar.nativeElement.focus();
    },10);
  }

  updateViewPort(event: Event) {
    this.viewPortItems = event;

    for (var i = 0; i < this.viewPortItems.length; ++i) {
      this.sprites[i] = "../../assets/sprites/" + this.viewPortItems[i].toLowerCase().replace(/['%:.]/g,'') + ".png";
    }
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
        while (nextHoverPkmn === null) {
          this.listedpkmnIndex--;
          nextHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        }
        nextHoverPkmn.classList.add('myHover');
      }
    } else if (event.keyCode == 40) {
      if (this.listedpkmnIndex < (this.tierpkmn.length-1)) {
        var prevHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        prevHoverPkmn.classList.remove('myHover');
        this.listedpkmnIndex++;
        var nextHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        while (nextHoverPkmn === null) {
          this.listedpkmnIndex++;
          nextHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        }
        nextHoverPkmn.classList.add('myHover');
      }
    }
  }

  highlightPokemon() {
    setTimeout(()=>{
      var hoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
      while (hoverPkmn === null) {
        this.listedpkmnIndex++;
        hoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
      }
      // if (hoverPkmn !== null) {
      //   hoverPkmn.classList.add('myHover');
      // }
      hoverPkmn.classList.add('myHover');
    }, 10);

    this.scrollToSearch();
  }

  setHover(newHoverIndex: number) {
    var prevHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
    if (prevHoverPkmn !== null) {
      prevHoverPkmn.classList.remove('myHover');
    }
    this.listedpkmnIndex = newHoverIndex;
    var nextHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
    if (nextHoverPkmn !== null) {
      nextHoverPkmn.classList.add('myHover');
    }
  }

  addTeamMember(poke: string) {
  	this.teamMembers.push(poke);
    this.teamSprites.push("../../assets/sprites/" + poke.toLowerCase().replace(/['%:.]/g,'') + ".png");
    this.displayPokemon = false;
    setTimeout(()=>{
      this.teamCubbies = this.pkmnCubbies.toArray();
      this.teamCubbies[this.teamCubbies.length-1].enterSinglePokemonView();
    },10);
    this.singlePokemonView[0] = true;
  }

  // removeTeamMember(index: number) {
  // 	this.teamMembers.splice(index, 1);
  //   this.teamSprites.splice(index, 1);
  //   this.singlePokemonView[0] = false;
  // }

  editPoke(index: number) {
    // this.enterTeamView();
    this.displayPokemon = false;
    this.teamCubbies = this.pkmnCubbies.toArray();
    this.teamCubbies[index].enterSinglePokemonView();
  }

  enterTeamView() {
    for (var i = 0; i < this.teamMembers.length; ++i) {
      document.getElementById("cubby" + i).style.display = "block";
    }
    this.singlePokemonView[0] = false;

    this.cd.detectChanges();
    this.displayPokemon = false;

    setTimeout(()=>{
      document.activeElement.blur();
      this.scrollToTop();
    },10);
  }

  printPokemon() {
    this.listedpkmnIndex = 0;
    //this.tierpkmn = pkmnData[this.tier];
    this.tierpkmn = this.legalpkmn;
    for (var i = 0; i < this.tierpkmn.length; ++i) {
      this.sprites[i] = "../../assets/sprites/" + this.tierpkmn[i].toLowerCase().replace(/['%:.]/g,'') + ".png";
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

      let parenIndex = this.teamCubbies[i].nature.indexOf('(');
      if (parenIndex == -1) {
        let natureSelected = this.teamCubbies[i].nature;
      } else {
        let natureSelected = this.teamCubbies[i].nature.substring(0, parenIndex-1);
      }
      this.exportText += natureSelected + " Nature\n";

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
    this.tierpkmn = [];
    if (event.target.value.length === 0) {
      this.tierpkmn = this.legalpkmn;

      for (var i = 0; i < this.tierpkmn.length; ++i) {
        this.sprites[i] = "../../assets/sprites/" + this.tierpkmn[i].toLowerCase().replace(/['%:.]/g,'') + ".png";
      }

      this.highlightPokemon();
      return;
    }

    this.searchInput = event.target.value;

    if (this.tierpkmn.length > 0) {
      // remove hover class only if there was something to hover over before
      var prevHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
      if (prevHoverPkmn !== null) {
        prevHoverPkmn.classList.remove('myHover');
      }
    }

    this.tierpkmn = [];
    // search by name
    for (var i = 0; i < this.legalpkmn.length; ++i) {
      if (this.tierKeys.indexOf(this.legalpkmn[i]) == -1) {
        if (this.legalpkmn[i].toLowerCase().includes(this.searchInput.toLowerCase())) {
          this.tierpkmn.push(this.legalpkmn[i]);
        }
      }
    }

    for (var i = 0; i < this.tierpkmn.length; ++i) {
      this.sprites[i] = "../../assets/sprites/" + this.tierpkmn[i].toLowerCase().replace(/['%:.]/g,'') + ".png";
    }

    if (this.tierpkmn.length > 0) {
      // highlight only if there is something to highlight
      this.listedpkmnIndex = 0;
      this.highlightPokemon();
    }
  }

  checkBoxInsideDiv(index: number, prop: string) {
    if(prop === 'propBad') {
      event.stopPropagation();
    }

    document.getElementById('tierFilterInput' + index).checked = !document.getElementById('tierFilterInput' + index).checked;
    this.applyFilter();
  }

  setHoverFilter(index: number, filterSelected: string) {
    if (filterSelected === 'tier') {
      var clickableDiv = document.getElementById('tierFilterDiv' + index);
      clickableDiv.classList.add('filterHover');
    } else if (filterSelected === 'tierNo') {
      var clickableDiv = document.getElementById('tierFilterDiv' + index);
      clickableDiv.classList.remove('filterHover');
    }
  }

  //pseudocode for now

  applyFilter() {
    var pkmnSearchArray = []
    for (var h = 0; h < this.tierKeys.length; ++h) {
      var checkbox = document.getElementById('tierFilterInput' + h);
      if (checkbox.checked) {
        pkmnSearchArray.push.apply(pkmnSearchArray, pkmnData[this.tierKeys[h]]);
      }
    }

    if (pkmnSearchArray.length == 0) {
      pkmnSearchArray = this.legalpkmn;
    }

    var tempArray = [];
    var typeSelected = document.getElementById('typeFilterInput').value;
    if (typeSelected !== 'Type') {

      for (var i = 0; i < pkmnSearchArray.length; ++i) {
        if (this.tierKeys.indexOf(pkmnSearchArray[i]) != -1 || allPkmnData[pkmnSearchArray[i]]['types'].includes(typeSelected.toLowerCase())) {
          tempArray.push(pkmnSearchArray[i]);
        }
        if (this.tierKeys.indexOf(tempArray[tempArray.length-1]) != -1 && this.tierKeys.indexOf(tempArray[tempArray.length-2]) != -1) {
          tempArray.splice(tempArray.length-2, 1);
        }
        if (i == pkmnSearchArray.length-1 && this.tierKeys.indexOf(tempArray[tempArray.length-1]) != -1) {
          tempArray.splice(tempArray.length-1, 1);
        }
      }

      pkmnSearchArray = tempArray;
    }

    var abilitySelected = document.getElementById('abilityFilterInput').value;
    if (abilitySelected !== 'Ability') {
      tempArray = [];

      for (var m = 0; m < pkmnSearchArray.length; ++m) {
        if (this.tierKeys.indexOf(pkmnSearchArray[m]) != -1 || allPkmnData[pkmnSearchArray[m]]['abilities'].includes(abilitySelected)) {
          tempArray.push(pkmnSearchArray[m]);
        }
        if (this.tierKeys.indexOf(tempArray[tempArray.length-1]) != -1 && this.tierKeys.indexOf(tempArray[tempArray.length-2]) != -1) {
          tempArray.splice(tempArray.length-2, 1);
        }
        if (m == pkmnSearchArray.length-1 && this.tierKeys.indexOf(tempArray[tempArray.length-1]) != -1) {
          tempArray.splice(tempArray.length-1, 1);
        }
      }

      pkmnSearchArray = tempArray;
    }

    var moveSelected = document.getElementById('moveFilterInput').value;
    if (moveSelected !== 'Move') {
      tempArray = [];

      for (var n = 0; n < pkmnSearchArray.length; ++n) {
        if (this.tierKeys.indexOf(pkmnSearchArray[n]) != -1 || allPkmnData[pkmnSearchArray[n]]['moves'].includes(moveSelected)) {
          tempArray.push(pkmnSearchArray[n]);
        }
        if (this.tierKeys.indexOf(tempArray[tempArray.length-1]) != -1 && this.tierKeys.indexOf(tempArray[tempArray.length-2]) != -1) {
          tempArray.splice(tempArray.length-2, 1);
        }
        if (n == pkmnSearchArray.length-1 && this.tierKeys.indexOf(tempArray[tempArray.length-1]) != -1) {
          tempArray.splice(tempArray.length-1, 1);
        }
      }

      pkmnSearchArray = tempArray;
    }



    this.tierpkmn = pkmnSearchArray;
  }

}

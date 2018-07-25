import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as pkmnData from "../../assets/tierList.json"
import * as allPkmnData from "../../assets/allPokemon.json"


@Component({
  selector: 'app-pkmncubby',
  templateUrl: './pkmncubby.component.html',
  styleUrls: ['./pkmncubby.component.css']
})
export class PkmncubbyComponent implements OnInit {
  @ViewChild('searchItem') searchIte: ElementRef;
  @ViewChild('searchAbility') searchAbi: ElementRef;
  //@ViewChild('searchMove') searchMov: ElementRef;

	@Input() team : string[];
  @Input() name : string;
  @Input() index : number;
  sprite = "";
	type = ["../../assets/types/dark.png", "../../assets/types/steel.png"];
	item = "";
  itemSprite = "../../assets/life-orb.png";
  itemlist = pkmnData["item"];
  itemIndex = 0;
	ability = "";
  abilitylist = pkmnData["ability"];
  abilityIndex = 0;
	moves = ["", "", "", ""];
  movelist = pkmnData["moves"];
  moveIndex = 0;
  moveNavIndex = 0;
  stats = [0, 0, 0, 0, 0, 0];
  statsLabel = "";
  ptsRemaining = 508;
	ev = [0, 0, 0, 0, 0, 0];
	iv = [31, 31, 31, 31, 31, 31];
	nature = "Select nature";
  displayItems = false;
  displayAbilities = false;
  displayMoves = false;
  displayStats = false;

  constructor() {
  }

  ngOnInit() {
  	// initialize everything using this.name
  	//this.type = pkmnData["OU"][this.name]["type"];
    this.sprite = "../../assets/sprites/" + this.name.toLowerCase() + ".png";
    this.searchIte.nativeElement.focus();

    this.stats[0] = 2 * allPkmnData[this.name]["hp"] + this.iv[0] + Math.floor(this.ev[0]/4) + 110;
    this.stats[1] = 2 * allPkmnData[this.name]["atk"] + this.iv[1] + Math.floor(this.ev[1]/4) + 5;
    this.stats[2] = 2 * allPkmnData[this.name]["def"] + this.iv[2] + Math.floor(this.ev[2]/4) + 5;
    this.stats[3] = 2 * allPkmnData[this.name]["spatk"] + this.iv[3] + Math.floor(this.ev[3]/4) + 5;
    this.stats[4] = 2 * allPkmnData[this.name]["spdef"] + this.iv[4] + Math.floor(this.ev[4]/4) + 5;
    this.stats[5] = 2 * allPkmnData[this.name]["speed"] + this.iv[5] + Math.floor(this.ev[5]/4) + 5;
  }

  removeMe() {
    this.team.splice(this.index, 1);
  }

  scrollToDisplay() {
    setTimeout(()=>{
      var displayArea = document.getElementById('displayArea' + this.index);
      displayArea.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 10);
  }

  onUpdateSearchItem(event: Event) {
    //searchInput = event.target.value;

    var prevHoverItem = document.getElementById('item' + this.itemIndex);
    prevHoverItem.classList.remove('myHover');
    this.itemIndex = 0;
    this.highlightItems();

    this.itemlist = [];
    // search by name
    for (var i = 0; i < pkmnData["item"].length; ++i) {
      if (pkmnData["item"][i].toLowerCase().includes(event.target.value.toLowerCase())) {
        this.itemlist.push(pkmnData["item"][i]);
      }
    }
  }

  addItem(itemSelected: string) {
    this.item = itemSelected;
    this.displayItems = false;
    setTimeout(()=>{
      this.searchAbi.nativeElement.focus();
    }, 10);
  }

  navigateItem(event: Event) {
    if (event.keyCode == 13) {
      this.addItem(this.itemlist[this.itemIndex]);
    } else if (event.keyCode == 38) {
      if (this.itemIndex > 0) {
        var prevHoverItem = document.getElementById('item' + this.itemIndex);
        prevHoverItem.classList.remove('myHover');
        this.itemIndex--;
        var nextHoverItem = document.getElementById('item' + this.itemIndex);
        nextHoverItem.classList.add('myHover');
      }
    } else if (event.keyCode == 40) {
      if (this.itemIndex < (this.itemlist.length-1)) {
        var prevHoverItem = document.getElementById('item' + this.itemIndex);
        prevHoverItem.classList.remove('myHover');
        this.itemIndex++;
        var nextHoverItem = document.getElementById('item' + this.itemIndex);
        nextHoverItem.classList.add('myHover');
      }
    }
  }

  navigateAbility(event: Event) {
    if (event.keyCode == 13) {
      this.addAbility(this.abilitylist[this.abilityIndex]);
    } else if (event.keyCode == 38) {
      if (this.abilityIndex > 0) {
        var prevHoverAbility = document.getElementById('ability' + this.abilityIndex);
        prevHoverAbility.classList.remove('myHover');
        this.abilityIndex--;
        var nextHoverAbility = document.getElementById('ability' + this.abilityIndex);
        nextHoverAbility.classList.add('myHover');
      }
    } else if (event.keyCode == 40) {
      if (this.abilityIndex < (this.abilitylist.length-1)) {
        var prevHoverAbility = document.getElementById('ability' + this.abilityIndex);
        prevHoverAbility.classList.remove('myHover');
        this.abilityIndex++;
        var nextHoverAbility = document.getElementById('ability' + this.abilityIndex);
        nextHoverAbility.classList.add('myHover');
      }
    }
  }

  navigateMove(event: Event) {
    if (event.keyCode == 13) {
      this.addMove(this.movelist[this.moveNavIndex]);
    } else if (event.keyCode == 38) {
      if (this.moveNavIndex > 0) {
        var prevHoverMove = document.getElementById('moveNav' + this.moveNavIndex);
        prevHoverMove.classList.remove('myHover');
        this.moveNavIndex--;
        var nextHoverMove = document.getElementById('moveNav' + this.moveNavIndex);
        nextHoverMove.classList.add('myHover');
      }
    } else if (event.keyCode == 40) {
      if (this.moveNavIndex < (this.movelist.length-1)) {
        var prevHoverMove = document.getElementById('moveNav' + this.moveNavIndex);
        prevHoverMove.classList.remove('myHover');
        this.moveNavIndex++;
        var nextHoverMove = document.getElementById('moveNav' + this.moveNavIndex);
        nextHoverMove.classList.add('myHover');
      }
    }
  }

  highlightItems() {
    this.itemIndex = 0;

    setTimeout(()=>{
      var hoverItem = document.getElementById('item' + this.itemIndex);
      hoverItem.classList.add('myHover');
    }, 10);

    this.scrollToDisplay();
  }

  highlightAbilities() {
    this.abilityIndex = 0;

    setTimeout(()=>{
      var hoverAbility = document.getElementById('ability' + this.abilityIndex);
      hoverAbility.classList.add('myHover');
    }, 10);

    this.scrollToDisplay();
  }

  highlightMoves() {
    this.moveNavIndex = 0;
    setTimeout(()=>{
      var hoverMove = document.getElementById('moveNav' + this.moveNavIndex);
      hoverMove.classList.add('myHover');
    }, 10);

    this.scrollToDisplay();
  }

  setHoverItem(newHoverIndex: number) {
    var prevHoverItem = document.getElementById('item' + this.itemIndex);
    prevHoverItem.classList.remove('myHover');
    this.itemIndex = newHoverIndex;
    var nextHoverItem = document.getElementById('item' + this.itemIndex);
    nextHoverItem.classList.add('myHover');
  }

  setHoverAbility(newHoverIndex: number) {
    var prevHoverAbility = document.getElementById('ability' + this.abilityIndex);
    prevHoverAbility.classList.remove('myHover');
    this.abilityIndex = newHoverIndex;
    var nextHoverAbility = document.getElementById('ability' + this.abilityIndex);
    nextHoverAbility.classList.add('myHover');
  }

  setHoverMove(newHoverIndex: number) {
    var prevHoverMove = document.getElementById('moveNav' + this.moveNavIndex);
    prevHoverMove.classList.remove('myHover');
    this.moveNavIndex = newHoverIndex;
    var nextHoverMove = document.getElementById('moveNav' + this.moveNavIndex);
    nextHoverMove.classList.add('myHover');
  }

  addAbility(abilitySelected: string) {
    this.ability = abilitySelected;
    this.displayAbilities = false;
    setTimeout(()=>{
      document.getElementById('searchMov' + this.index + '-0').focus();
    }, 10);
  }

  onUpdateSearchMove(event: Event) {
    //searchInput = event.target.value;

    var prevHoverMove = document.getElementById('moveNav' + this.moveNavIndex);
    prevHoverMove.classList.remove('myHover');
    this.moveNavIndex = 0;
    this.highlightMoves();


    this.movelist = [];
    // search by name
    for (var i = 0; i < pkmnData["moves"].length; ++i) {
      if (pkmnData["moves"][i].toLowerCase().includes(event.target.value.toLowerCase())) {
        this.movelist.push(pkmnData["moves"][i]);
      }
    }
  }

  addMove(moveSelected: string) {
    this.moves[this.moveIndex] = moveSelected;
    // shift move focus
    if (this.moveIndex == 3) {
      this.displayMoves = false;
      // move focus to stats
      this.displayStats = true;
      //this.scrollToDisplay();
    } else {
      setTimeout(()=>{
        this.moveIndex++;
        document.getElementById('searchMov' + this.index + '-' + (this.moveIndex)).focus();
      }, 10);
    }
  }

  setStats(event: Event, statChanged: string) {
    if (event.target.value.length === 0) {
      event.target.value = 0;
    }
    if (event.target.value > 252) {
      event.target.value = 252;
    }
    switch(statChanged) {
      case "hp":
        this.ev[0] = parseInt(event.target.value);
        this.stats[0] = 2 * allPkmnData[this.name]["hp"] + this.iv[0] + Math.floor(this.ev[0]/4) + 110;
        break;
      case "atk":
        this.ev[1] = parseInt(event.target.value);
        this.stats[1] = 2 * allPkmnData[this.name]["atk"] + this.iv[1] + Math.floor(this.ev[1]/4) + 5;
        break;
      case "def":
        this.ev[2] = parseInt(event.target.value);
        this.stats[2] = 2 * allPkmnData[this.name]["def"] + this.iv[2] + Math.floor(this.ev[2]/4) + 5;
        break;
      case "spa":
        this.ev[3] = parseInt(event.target.value);
        this.stats[3] = 2 * allPkmnData[this.name]["spatk"] + this.iv[3] + Math.floor(this.ev[3]/4) + 5;
        break;
      case "spd":
        this.ev[4] = parseInt(event.target.value);
        this.stats[4] = 2 * allPkmnData[this.name]["spdef"] + this.iv[4] + Math.floor(this.ev[4]/4) + 5;
        break;
      case "spe":
        this.ev[5] = parseInt(event.target.value);
        this.stats[5] = 2 * allPkmnData[this.name]["speed"] + this.iv[5] + Math.floor(this.ev[5]/4) + 5;
        break;
      default:
        console.log("stat type error");
    }

    this.ptsRemaining = 508 - (this.ev[0] + this.ev[1] + this.ev[2] + this.ev[3] + this.ev[4] + this.ev[5]);
    //var ptsDisplay = document.getElementById('pts');
    if (this.ptsRemaining < 0) {
      document.getElementById('pts' + this.index).style.color = 'red';
    } else {
      document.getElementById('pts' + this.index).style.color = 'black';
    }

    // set stats label
    // REMOVE LATER AND REPLACE WITH LIST VIEW OF EVs AND NATURE +-
    this.statsLabel = "";
    if (this.ev[0] > 0) {this.statsLabel += this.ev[0] + ' HP ';}
    if (this.ev[1] > 0) {this.statsLabel += this.ev[1] + ' Atk ';}
    if (this.ev[2] > 0) {this.statsLabel += this.ev[2] + ' Def ';}
    if (this.ev[3] > 0) {this.statsLabel += this.ev[3] + ' SpA ';}
    if (this.ev[4] > 0) {this.statsLabel += this.ev[4] + ' SpD ';}
    if (this.ev[5] > 0) {this.statsLabel += this.ev[5] + ' Spe ';}
  }

  setNature(natureSelected: string) {
    this.nature = natureSelected;

    // reset stats to neutral nature
    this.stats[0] = 2 * allPkmnData[this.name]["hp"] + this.iv[0] + Math.floor(this.ev[0]/4) + 110;
    this.stats[1] = 2 * allPkmnData[this.name]["atk"] + this.iv[1] + Math.floor(this.ev[1]/4) + 5;
    this.stats[2] = 2 * allPkmnData[this.name]["def"] + this.iv[2] + Math.floor(this.ev[2]/4) + 5;
    this.stats[3] = 2 * allPkmnData[this.name]["spatk"] + this.iv[3] + Math.floor(this.ev[3]/4) + 5;
    this.stats[4] = 2 * allPkmnData[this.name]["spdef"] + this.iv[4] + Math.floor(this.ev[4]/4) + 5;
    this.stats[5] = 2 * allPkmnData[this.name]["speed"] + this.iv[5] + Math.floor(this.ev[5]/4) + 5;
    
    // add modifier for non-neutral natures
    switch(natureSelected) {
      case "Adamant":
        this.stats[1] = Math.floor(this.stats[1] * 1.1);
        this.stats[3] = Math.floor(this.stats[3] * 0.9);
        break;
      case "Bold":
        this.stats[2] = Math.floor(this.stats[2] * 1.1);
        this.stats[1] = Math.floor(this.stats[1] * 0.9);
        break;
      case "Brave":
        this.stats[1] = Math.floor(this.stats[1] * 1.1);
        this.stats[5] = Math.floor(this.stats[5] * 0.9);
        break;
      case "Calm":
        this.stats[4] = Math.floor(this.stats[4] * 1.1);
        this.stats[1] = Math.floor(this.stats[1] * 0.9);
        break;
      case "Careful":
        this.stats[4] = Math.floor(this.stats[4] * 1.1);
        this.stats[3] = Math.floor(this.stats[3] * 0.9);
        break;
      case "Gentle":
        this.stats[4] = Math.floor(this.stats[4] * 1.1);
        this.stats[2] = Math.floor(this.stats[2] * 0.9);
        break;
      case "Hasty":
        this.stats[5] = Math.floor(this.stats[5] * 1.1);
        this.stats[2] = Math.floor(this.stats[2] * 0.9);
        break;
      case "Impish":
        this.stats[2] = Math.floor(this.stats[2] * 1.1);
        this.stats[3] = Math.floor(this.stats[3] * 0.9);
        break;
      case "Jolly":
        this.stats[5] = Math.floor(this.stats[5] * 1.1);
        this.stats[3] = Math.floor(this.stats[3] * 0.9);
        break;
      case "Lax":
        this.stats[2] = Math.floor(this.stats[2] * 1.1);
        this.stats[4] = Math.floor(this.stats[4] * 0.9);
        break;
      case "Lonely":
        this.stats[1] = Math.floor(this.stats[1] * 1.1);
        this.stats[2] = Math.floor(this.stats[2] * 0.9);
        break;
      case "Mild":
        this.stats[3] = Math.floor(this.stats[3] * 1.1);
        this.stats[2] = Math.floor(this.stats[2] * 0.9);
        break;
      case "Modest":
        this.stats[3] = Math.floor(this.stats[3] * 1.1);
        this.stats[1] = Math.floor(this.stats[1] * 0.9);
        break;
      case "Naive":
        this.stats[5] = Math.floor(this.stats[5] * 1.1);
        this.stats[4] = Math.floor(this.stats[4] * 0.9);
        break;
      case "Naughty":
        this.stats[1] = Math.floor(this.stats[1] * 1.1);
        this.stats[4] = Math.floor(this.stats[4] * 0.9);
        break;
      case "Quiet":
        this.stats[3] = Math.floor(this.stats[3] * 1.1);
        this.stats[5] = Math.floor(this.stats[5] * 0.9);
        break;
      case "Rash":
        this.stats[3] = Math.floor(this.stats[3] * 1.1);
        this.stats[4] = Math.floor(this.stats[4] * 0.9);
        break;
      case "Relaxed":
        this.stats[2] = Math.floor(this.stats[2] * 1.1);
        this.stats[5] = Math.floor(this.stats[5] * 0.9);
        break;
      case "Sassy":
        this.stats[4] = Math.floor(this.stats[4] * 1.1);
        this.stats[5] = Math.floor(this.stats[5] * 0.9);
        break;
      case "Timid":
        this.stats[5] = Math.floor(this.stats[5] * 1.1);
        this.stats[1] = Math.floor(this.stats[1] * 0.9);
        break;
      default:
        console.log("unknown nature");
    }

    this.scrollToDisplay();
  }

}

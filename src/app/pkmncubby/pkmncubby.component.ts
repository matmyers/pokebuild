import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as pkmnData from "../../jsondata/tierList.json"
import * as allPkmnData from "../../jsondata/dataTest3.json"
import * as itemData from "../../jsondata/items.json"
import * as abilityData from "../../jsondata/abilities.json"
import * as moveData from "../../jsondata/moves.json"


@Component({
  selector: 'app-pkmncubby',
  templateUrl: './pkmncubby.component.html',
  styleUrls: ['./pkmncubby.component.css']
})
export class PkmncubbyComponent implements OnInit {
  @ViewChild('searchItem') searchIte: ElementRef;
  @ViewChild('searchAbility') searchAbi: ElementRef;
  //@ViewChild('searchMove') searchMov: ElementRef;

  @Input() itemImport? : string;
  @Input() abilityImport? : string;
  @Input() evsImport? : number[];
  @Input() natureImport? : string;
  @Input() ivsImport? : number[];
  @Input() movesImport? : string[];

	@Input() team : string[];
  @Input() teamSprites : string[];
  @Input() singleDisplay : boolean[];
  @Input() name : string;
  @Input() tier : string;
  @Input() index : number;
  sprite = "";
  isSearching = false;
	item = "";
  itemSprite = "";
  itemlist = Object.keys(itemData);
  recitemlist = [];
  itemIndex = 0;
	ability = "";
  abilitylist = [];
  abilityIndex = 0;
	moves = ["", "", "", ""];
  moveSelected = [false, false, false, false]
  movelist = [];
  recmovelist = [];
  moveIndex = 0;
  moveNavIndex = 0;
  recspreadlist = [];
  spreadIndex = 0;
  statModifiers = [1, 1, 1, 1, 1, 1];
  stats = [0, 0, 0, 0, 0, 0];
  ptsRemaining = 508;
	ev = [0, 0, 0, 0, 0, 0];
	iv = [31, 31, 31, 31, 31, 31];
	nature = "Serious";
  level = 100;
  speedBoost = 0;
  boostLevel = 1;
  displayItems = false;
  displayAbilities = false;
  displayMoves = false;
  displayStats = false;
  displaySpeedComparison = false;
  displaySpreads = false;
  opponentSelected = false;
  opponent = "";
  opponentSprite = "";
  opponentEv = 0;
  opponentIv = 31;
  opponentModifier = 1;
  opponentBoostLevel = 1;
  opponentSpeed = 0;
  allData = allPkmnData;
  allDataArray = Object.keys(allPkmnData);
  itemData = itemData;
  abilityData = abilityData;
  moveData = moveData;
  natureKeys = ["Adamant (+Atk, -SpA)", "Bashful", "Bold (+Def, -Atk)", "Brave (+Atk, -Spe)", "Calm (+SpD, -Atk)", "Careful (+SpD, -SpA)", "Docile", "Gentle (+SpD, -Def)", "Hardy", "Hasty (+Spe, -Def)", "Impish (+Def, -SpA)", "Jolly (+Spe, -SpA)", "Lax (+Def, -SpD)", "Lonely (+Atk, -Def)", "Mild (+SpA, -Def)", "Modest (+SpA, -Atk)", "Naive (+Spe, -SpD)", "Naughty (+Atk, -SpD)", "Quiet (+SpA, -Spe)", "Quirky", "Rash (+SpA, -SpD)", "Relaxed (+Def, -Spe)", "Sassy (+SpD, -Spe)", "Serious", "Timid (+Spe, -Atk)"]

  constructor() {
  }

  ngOnInit() {
    this.abilitylist = allPkmnData[this.name]["abilities"];

    if (this.itemImport) {
      this.item = this.itemImport;
      this.itemSprite = "../../assets/items/" + this.itemImport + ".png";
    } else {
      if (allPkmnData[this.name]["specialItem"]) {
        this.addItem(allPkmnData[this.name]["specialItem"]);
      } else {
        this.searchIte.nativeElement.focus();
      }
    }
    if (this.abilityImport && this.abilityImport.length > 0) {
      this.ability = this.abilityImport;
    } else {
      this.ability = this.abilitylist[0];
    }
    if (this.evsImport) {
      this.ev = this.evsImport;
      this.ptsRemaining = 508 - (this.ev[0] + this.ev[1] + this.ev[2] + this.ev[3] + this.ev[4] + this.ev[5]);
    }
    if (this.natureImport && this.natureImport.length > 0) {
      this.setNature(this.natureImport, 'import');
    }
    if (this.ivsImport) {
      this.iv = this.ivsImport;
    }
    if (this.movesImport) {
      for (var i = 0; i < this.movesImport.length; ++i) {
        this.moves[i] = this.movesImport[i];
      }
    }
  	// initialize everything using this.name
  	// this.tier = this.tier.toLowerCase();
    this.sprite = "../../assets/sprites/" + this.name.toLowerCase().replace(/['%:.]/g,'') + ".png";

    this.movelist = allPkmnData[this.name]["moves"];
    this.itemlist.splice(-1,1);
    this.recitemlist = [];

    if (allPkmnData[this.name]["itemUsage"][this.tier]) {
      for (var j = 0; j < allPkmnData[this.name]["itemUsage"][this.tier].length; ++j) {
        var key = Object.keys(allPkmnData[this.name]["itemUsage"][this.tier][j]);
        this.recitemlist.push(key[0]);
      }
    }

    if (allPkmnData[this.name]["moveUsage"][this.tier]) {
      for (var j = 0; j < allPkmnData[this.name]["moveUsage"][this.tier].length; ++j) {
        var key = Object.keys(allPkmnData[this.name]["moveUsage"][this.tier][j]);
        this.recmovelist.push(key[0]);
      }
    }

    if (allPkmnData[this.name]["statUsage"][this.tier]) {
      for (var k = 0; k < allPkmnData[this.name]["statUsage"][this.tier].length; ++k) {
        var key = Object.keys(allPkmnData[this.name]["statUsage"][this.tier][k]);

        var colonIndex = key[0].indexOf(':');
        var natureSelected = key[0].substring(0, colonIndex);
        // parse statUsage data
        var slash1 = key[0].indexOf('/');
        var slash2 = key[0].substring(slash1).indexOf('/', 1) + slash1;
        var slash3 = key[0].substring(slash2).indexOf('/', 1) + slash2;
        var slash4 = key[0].substring(slash3).indexOf('/', 1) + slash3;
        var slash5 = key[0].substring(slash4).indexOf('/', 1) + slash4;

        this.recspreadlist.push({nature:natureSelected, hp:key[0].substring(colonIndex+1, slash1), atk:key[0].substring(slash1+1, slash2), def:key[0].substring(slash2+1, slash3), spa:key[0].substring(slash3+1, slash4), spd:key[0].substring(slash4+1, slash5), spe:key[0].substring(slash5+1), usage:allPkmnData[this.name]["statUsage"][this.tier][k][key[0]]});
      }
    }

    this.allDataArray.splice(-1,1);

    if (this.tier === "LC") {
      this.level = 5;
    }
    if (this.tier === "VGC") {
      this.level = 50;
    }
    this.setAllStats();

    this.speedBoost = this.stats[5];
  }

  removeMe() {
    this.team.splice(this.index, 1);
    this.teamSprites.splice(this.index, 1);
  }

  scrollToDisplay() {
    setTimeout(()=>{
      var displayArea = document.getElementById('displayArea' + this.index);
      if (displayArea !== null) {
        displayArea.scrollIntoView({ block: 'start', behavior: 'auto' });
      }
    }, 10);
  }

  scrollToSpreads() {
    setTimeout(()=>{
      var displayArea = document.getElementById('displaySpreadArea' + this.index);
      displayArea.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 10);
  }

  onUpdateSearchItem(event: Event) {
    //searchInput = event.target.value;
    
    if (this.itemlist.length > 0) {
      var prevHoverItem = document.getElementById('item' + this.itemIndex);
      prevHoverItem.classList.remove('myHover');
    }
    
    if ((<HTMLInputElement>event.target).value.length === 0) {
      this.isSearching = false;
      this.itemIndex = 0;
    } else {
      this.isSearching = true;
      this.itemIndex = this.recitemlist.length;
    }

    this.itemlist = [];
    // search by name
    for (var i = 0; i < Object.keys(itemData).length; ++i) {
      if (Object.keys(itemData)[i].toLowerCase().includes((<HTMLInputElement>event.target).value.toLowerCase()) && Object.keys(itemData)[i].toLowerCase() !== "default") {
        this.itemlist.push(Object.keys(itemData)[i]);
      }
    }

    this.highlightItems(this.itemIndex);
  }

  addItem(itemSelected: string) {
    this.item = itemSelected;
    this.itemSprite = "../../assets/items/" + itemSelected + ".png";
    this.displayItems = false;
    setTimeout(()=>{
      this.searchAbi.nativeElement.focus();
    }, 10);
  }

  navigateItem(event: KeyboardEvent) {
    let minValue = 0;
    let maxValue = this.itemlist.length-1;

    if (this.isSearching) {
      minValue = this.recitemlist.length;
      maxValue = this.itemlist.length-1 + this.recitemlist.length;
    }
    // else {
    //   let minValue = 0;
    //   let maxValue = this.itemlist.length-1;
    // }

    if (event.keyCode == 13) {
      if (this.itemIndex < this.recitemlist.length) {
        this.addItem(this.recitemlist[this.itemIndex]);
      } else {
        this.addItem(this.itemlist[this.itemIndex - this.recitemlist.length]);
      }
    } else if (event.keyCode == 38) {
      if (this.itemIndex > minValue) {
        var prevHoverItem = document.getElementById('item' + this.itemIndex);
        prevHoverItem.classList.remove('myHover');
        this.itemIndex--;
        var nextHoverItem = document.getElementById('item' + this.itemIndex);
        nextHoverItem.classList.add('myHover');
      }
    } else if (event.keyCode == 40) {
      if (this.itemIndex < maxValue) {
        var prevHoverItem = document.getElementById('item' + this.itemIndex);
        prevHoverItem.classList.remove('myHover');
        this.itemIndex++;
        var nextHoverItem = document.getElementById('item' + this.itemIndex);
        nextHoverItem.classList.add('myHover');
      }
    }
  }

  navigateAbility(event: KeyboardEvent) {
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

  navigateMove(event: KeyboardEvent) {
    let minValue = 0;
    let maxValue = this.movelist.length-1;

    if (this.isSearching) {
      minValue = this.recmovelist.length;
      maxValue = this.movelist.length-1 + this.recmovelist.length;
    }
    // else {
    //   let minValue = 0;
    //   let maxValue = this.movelist.length-1;
    // }

    if (event.keyCode == 13) {
      if (this.moveNavIndex < this.recmovelist.length) {
        this.addMove(this.recmovelist[this.moveNavIndex]);
      } else {
        this.addMove(this.movelist[this.moveNavIndex - this.recmovelist.length]);
      }
      // this.addMove(this.movelist[this.moveNavIndex]);
    } else if (event.keyCode == 38) {
      if (this.moveNavIndex > minValue) {
        var prevHoverMove = document.getElementById('moveNav' + this.moveNavIndex);
        prevHoverMove.classList.remove('myHover');
        this.moveNavIndex--;
        var nextHoverMove = document.getElementById('moveNav' + this.moveNavIndex);
        nextHoverMove.classList.add('myHover');
      }
    } else if (event.keyCode == 40) {
      if (this.moveNavIndex < maxValue) {
        var prevHoverMove = document.getElementById('moveNav' + this.moveNavIndex);
        prevHoverMove.classList.remove('myHover');
        this.moveNavIndex++;
        var nextHoverMove = document.getElementById('moveNav' + this.moveNavIndex);
        nextHoverMove.classList.add('myHover');
      }
    }
  }

  enterSinglePokemonView() {
    for (var i = 0; i < this.team.length; ++i) {
      if (i != this.index) {
        // this.displayArray[i] = false;
        document.getElementById("cubby" + i).style.display = "none";
      } else {
        document.getElementById("cubby" + i).style.display = "block";
      }
    }

    this.singleDisplay[0] = true;
  }

  highlightItems(index: number) {
    this.itemIndex = index;

    if (this.itemlist.length > 0) {
      setTimeout(()=>{
        var hoverItem = document.getElementById('item' + this.itemIndex);
        if (hoverItem !== null) {
          hoverItem.classList.add('myHover');
        }
      }, 10);
    }

    this.scrollToDisplay();
  }

  highlightAbilities() {
    this.abilityIndex = 0;

    setTimeout(()=>{
      var hoverAbility = document.getElementById('ability' + this.abilityIndex);
      if (hoverAbility !== null) {
        hoverAbility.classList.add('myHover');
      }
    }, 10);

    this.scrollToDisplay();
  }

  highlightMoves(index: number) {
    this.moveNavIndex = index;

    if (this.movelist.length > 0) {
      setTimeout(()=>{
        var hoverMove = document.getElementById('moveNav' + this.moveNavIndex);
        if (hoverMove !== null) {
          hoverMove.classList.add('myHover');
        }
      }, 10);
    }

    this.scrollToDisplay();
  }

  setHoverItem(newHoverIndex: number) {
    var prevHoverItem = document.getElementById('item' + this.itemIndex);
    if (prevHoverItem !== null) {
      prevHoverItem.classList.remove('myHover');
    }
    this.itemIndex = newHoverIndex;
    var nextHoverItem = document.getElementById('item' + this.itemIndex);
    if (nextHoverItem !== null) {
      nextHoverItem.classList.add('myHover');
    }
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

  setHoverSpread(newHoverIndex: number) {
    var prevHoverSpread = document.getElementById('popSpread' + this.spreadIndex);
    prevHoverSpread.classList.remove('myHover');
    this.spreadIndex = newHoverIndex;
    var nextHoverSpread = document.getElementById('popSpread' + this.spreadIndex);
    nextHoverSpread.classList.add('myHover');
  }

  addAbility(abilitySelected: string) {
    this.ability = abilitySelected;
    this.displayAbilities = false;
    setTimeout(()=>{
      document.getElementById('searchMov' + this.index + '-0').focus();
    }, 10);
  }

  calcHammingDistance(searchTerm: string, possibleMatch: string) {
    var hd = 0;
    for (var i = 0; i < searchTerm.length && i < possibleMatch.length; ++i) {
      if (searchTerm[i] !== possibleMatch[i]) {
        hd++;
      }
    }

    return hd;
  }

  onUpdateSearchMove(event: Event) {
    //searchInput = event.target.value;

    if (this.movelist.length > 0) {
      var prevHoverMove = document.getElementById('moveNav' + this.moveNavIndex);
      if (prevHoverMove != null) {
        prevHoverMove.classList.remove('myHover');
      }
    }

    if ((<HTMLInputElement>event.target).value.length === 0) {
      this.isSearching = false;
      this.moveNavIndex = 0;
      this.moveSelected[this.moveIndex] = false;
    } else {
      this.isSearching = true;
      this.moveNavIndex = this.recmovelist.length;
    }

    this.movelist = [];
    // search by name
    for (var i = 0; i < allPkmnData[this.name]["moves"].length; ++i) {
      if (allPkmnData[this.name]["moves"][i].toLowerCase().includes((<HTMLInputElement>event.target).value.toLowerCase()) || moveData[allPkmnData[this.name]["moves"][i]]['type'].includes((<HTMLInputElement>event.target).value.toLowerCase())) {
        this.movelist.push(allPkmnData[this.name]["moves"][i]);
      }
    }

    this.highlightMoves(this.moveNavIndex);
  }

  addMove(moveSelected: string) {
    this.moves[this.moveIndex] = moveSelected;
    this.moveSelected[this.moveIndex] = true;
    // shift move focus
    if (this.moveIndex == 3) {
      this.displayMoves = false;
      // move focus to stats
      this.displayStats = true;
      //this.scrollToDisplay();
    } else {
      setTimeout(()=>{
        this.moveIndex++;
        // reset move display for next move
        if (!this.moveSelected[this.moveIndex]) {
          (<HTMLInputElement>document.getElementById('searchMov' + this.index + '-' + (this.moveIndex))).value = "";  
        }
        
        this.movelist = allPkmnData[this.name]["moves"];
        document.getElementById('searchMov' + this.index + '-' + (this.moveIndex)).focus();
      }, 10);
    }
  }

  addSpread(spreadSelected: any) {
    let natureSelected = spreadSelected.nature;

    this.ev[0] = parseInt(spreadSelected.hp);
    this.ev[1] = parseInt(spreadSelected.atk);
    this.ev[2] = parseInt(spreadSelected.def);
    this.ev[3] = parseInt(spreadSelected.spa);
    this.ev[4] = parseInt(spreadSelected.spd);
    this.ev[5] = parseInt(spreadSelected.spe);

    this.setAllStats();

    this.ptsRemaining = 508 - (this.ev[0] + this.ev[1] + this.ev[2] + this.ev[3] + this.ev[4] + this.ev[5]);
    if (this.ptsRemaining < 0) {
      document.getElementById('pts' + this.index).style.color = 'red';
    } else {
      document.getElementById('pts' + this.index).style.color = 'white';
    }

    this.setNature(natureSelected, undefined);
    this.displaySpreads = false
  }

  setStats(event: Event, statChanged: string) {
    if ((<HTMLInputElement>event.target).value.length === 0) {
      (<HTMLInputElement>event.target).value = '0';
    }
    if (parseInt((<HTMLInputElement>event.target).value) > 252) {
      (<HTMLInputElement>event.target).value = '252';
    }
    switch(statChanged) {
      case "hp":
        this.ev[0] = parseInt((<HTMLInputElement>event.target).value);
        break;
      case "atk":
        this.ev[1] = parseInt((<HTMLInputElement>event.target).value);
        break;
      case "def":
        this.ev[2] = parseInt((<HTMLInputElement>event.target).value);
        break;
      case "spa":
        this.ev[3] = parseInt((<HTMLInputElement>event.target).value);
        break;
      case "spd":
        this.ev[4] = parseInt((<HTMLInputElement>event.target).value);
        break;
      case "spe":
        this.ev[5] = parseInt((<HTMLInputElement>event.target).value);
        break;
      default:
        console.log("stat type error");
    }

    this.setAllStats();

    this.ptsRemaining = 508 - (this.ev[0] + this.ev[1] + this.ev[2] + this.ev[3] + this.ev[4] + this.ev[5]);
    //var ptsDisplay = document.getElementById('pts');
    if (this.ptsRemaining < 0) {
      document.getElementById('pts' + this.index).style.color = 'red';
    } else {
      document.getElementById('pts' + this.index).style.color = 'white';
    }
  }

  setIV(event: Event, statChanged: string) {
    if ((<HTMLInputElement>event.target).value.length === 0) {
      (<HTMLInputElement>event.target).value = '0';
    }
    if (parseInt((<HTMLInputElement>event.target).value) > 31) {
      (<HTMLInputElement>event.target).value = '31';
    }
    switch(statChanged) {
      case "hp":
        this.iv[0] = parseInt((<HTMLInputElement>event.target).value);
        break;
      case "atk":
        this.iv[1] = parseInt((<HTMLInputElement>event.target).value);
        break;
      case "def":
        this.iv[2] = parseInt((<HTMLInputElement>event.target).value);
        break;
      case "spa":
        this.iv[3] = parseInt((<HTMLInputElement>event.target).value);
        break;
      case "spd":
        this.iv[4] = parseInt((<HTMLInputElement>event.target).value);
        break;
      case "spe":
        this.iv[5] = parseInt((<HTMLInputElement>event.target).value);
        break;
      default:
        console.log("stat type error");
    }

    this.setAllStats();
  }

  setNature(preset: string, imported: string) {
    //console.log(document.getElementById('natureSelect').options);
    var natureSelected = "";

    if (preset === undefined) {
      this.nature = (<HTMLInputElement>document.getElementById('natureSelect')).value;

      let parenIndex = this.nature.indexOf('(');
      natureSelected = this.nature.substring(0, parenIndex-1);
    } else {
      if (imported === undefined) {
        for (var m = 0; m < (<HTMLSelectElement>document.getElementById('natureSelect')).options.length; ++m) {
          if ((<HTMLSelectElement>document.getElementById('natureSelect')).options[m].value.includes(preset)) {
            (<HTMLSelectElement>document.getElementById('natureSelect')).value = (<HTMLSelectElement>document.getElementById('natureSelect')).options[m].value;
          }
        }
        this.nature = (<HTMLSelectElement>document.getElementById('natureSelect')).value;
      } else {
        for (var m = 0; m < this.natureKeys.length; ++m) {
          if (this.natureKeys[m].includes(preset)) {
            //document.getElementById('natureSelect').value = this.natureKeys[m];
            this.nature = this.natureKeys[m];
          }
        }
      }
      natureSelected = preset;
    }

    //this.nature = document.getElementById('natureSelect').value;
    
    // reset modifiers to neutral nature
    this.statModifiers = [1, 1, 1, 1, 1, 1];

    // add modifier for non-neutral natures
    switch(natureSelected) {
      case "Adamant":
        this.statModifiers[1] = 1.1;
        this.statModifiers[3] = 0.9;
        break;
      case "Bold":
        this.statModifiers[2] = 1.1;
        this.statModifiers[1] = 0.9;
        break;
      case "Brave":
        this.statModifiers[1] = 1.1;
        this.statModifiers[5] = 0.9;
        break;
      case "Calm":
        this.statModifiers[4] = 1.1;
        this.statModifiers[1] = 0.9;
        break;
      case "Careful":
        this.statModifiers[4] = 1.1;
        this.statModifiers[3] = 0.9;
        break;
      case "Gentle":
        this.statModifiers[4] = 1.1;
        this.statModifiers[2] = 0.9;
        break;
      case "Hasty":
        this.statModifiers[5] = 1.1;
        this.statModifiers[2] = 0.9;
        break;
      case "Impish":
        this.statModifiers[2] = 1.1;
        this.statModifiers[3] = 0.9;
        break;
      case "Jolly":
        this.statModifiers[5] = 1.1;
        this.statModifiers[3] = 0.9;
        break;
      case "Lax":
        this.statModifiers[2] = 1.1;
        this.statModifiers[4] = 0.9;
        break;
      case "Lonely":
        this.statModifiers[1] = 1.1;
        this.statModifiers[2] = 0.9;
        break;
      case "Mild":
        this.statModifiers[3] = 1.1;
        this.statModifiers[2] = 0.9;
        break;
      case "Modest":
        this.statModifiers[3] = 1.1;
        this.statModifiers[1] = 0.9;
        break;
      case "Naive":
        this.statModifiers[5] = 1.1;
        this.statModifiers[4] = 0.9;
        break;
      case "Naughty":
        this.statModifiers[1] = 1.1;
        this.statModifiers[4] = 0.9;
        break;
      case "Quiet":
        this.statModifiers[3] = 1.1;
        this.statModifiers[5] = 0.9;
        break;
      case "Rash":
        this.statModifiers[3] = 1.1;
        this.statModifiers[4] = 0.9;
        break;
      case "Relaxed":
        this.statModifiers[2] = 1.1;
        this.statModifiers[5] = 0.9;
        break;
      case "Sassy":
        this.statModifiers[4] = 1.1;
        this.statModifiers[5] = 0.9;
        break;
      case "Timid":
        this.statModifiers[5] = 1.1;
        this.statModifiers[1] = 0.9;
        break;
      default:
        console.log("unknown or neutral nature");
    }

    this.setAllStats();
    this.scrollToDisplay();
  }

  setAllStats() {
    if (this.name === "Shedinja") {
      this.stats[0] = 1;
    } else {
      this.stats[0] = Math.floor((2 * allPkmnData[this.name]["baseStats"][0] + this.iv[0] + Math.floor(this.ev[0]/4)) * this.level / 100) + this.level + 10;
    }
    for (var k = 1; k < 6; ++k) {
      this.stats[k] = Math.floor((Math.floor((2 * allPkmnData[this.name]["baseStats"][k] + this.iv[k] + Math.floor(this.ev[k]/4)) * this.level / 100) + 5) * this.statModifiers[k]);
    }
    this.speedBoost = Math.floor(this.stats[5] * this.boostLevel);
  }

  setSpeedBoost() {
    switch((<HTMLInputElement>document.getElementById('speedBoostSelect')).value) {
      case "+6":
        this.boostLevel = 4;
        break;
      case "+5":
        this.boostLevel = 3.5;
        break;
      case "+4":
        this.boostLevel = 3;
        break;
      case "+3":
        this.boostLevel = 2.5;
        break;
      case "+2":
        this.boostLevel = 2;
        break;
      case "+1":
        this.boostLevel = 1.5;
        break;
      case "0":
        this.boostLevel = 1;
        break;
      case "-1":
        this.boostLevel = (2.0/3.0);
        break;
      case "-2":
        this.boostLevel = 0.5;
        break;
      case "-3":
        this.boostLevel = 0.4;
        break;
      case "-4":
        this.boostLevel = (1.0/3.0);
        break;
      case "-5":
        this.boostLevel = (2.0/7.0);
        break;
      case "-6":
        this.boostLevel = 0.25;
        break;
      default:
        console.log("speed boost type error");
    }

    this.speedBoost = Math.floor(this.stats[5] * this.boostLevel);
  }

  setOpponentSpeedBoost() {
    switch((<HTMLInputElement>document.getElementById('opponentSpeedBoostSelect')).value) {
      case "+6":
        this.opponentBoostLevel = 4;
        break;
      case "+5":
        this.opponentBoostLevel = 3.5;
        break;
      case "+4":
        this.opponentBoostLevel = 3;
        break;
      case "+3":
        this.opponentBoostLevel = 2.5;
        break;
      case "+2":
        this.opponentBoostLevel = 2;
        break;
      case "+1":
        this.opponentBoostLevel = 1.5;
        break;
      case "0":
        this.opponentBoostLevel = 1;
        break;
      case "-1":
        this.opponentBoostLevel = (2.0/3.0);
        break;
      case "-2":
        this.opponentBoostLevel = 0.5;
        break;
      case "-3":
        this.opponentBoostLevel = 0.4;
        break;
      case "-4":
        this.opponentBoostLevel = (1.0/3.0);
        break;
      case "-5":
        this.opponentBoostLevel = (2.0/7.0);
        break;
      case "-6":
        this.opponentBoostLevel = 0.25;
        break;
      default:
        console.log("opp speed boost type error");
    }

    this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * this.opponentBoostLevel);
  }

  setOpponent() {
    this.opponent = (<HTMLInputElement>document.getElementById('opponentSelect')).value;
    this.opponentSprite = "../../assets/sprites/" + this.opponent.toLowerCase().replace(/['%:.]/g,'') + ".png";
    this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * this.opponentBoostLevel);
    this.opponentSelected = true;
  }

  setOpponentModifier() {
    if ((<HTMLInputElement>document.getElementById('opponentModSelect')).value === "+Speed") {
      this.opponentModifier = 1.1;
    } else if ((<HTMLInputElement>document.getElementById('opponentModSelect')).value === "-Speed") {
      this.opponentModifier = 0.9;
    } else {
      this.opponentModifier = 1;
    }

    this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * this.opponentBoostLevel);
  }  

  setOpponentStats(event: Event, evOrIv: string) {
    if ((<HTMLInputElement>event.target).value.length === 0) {
      (<HTMLInputElement>event.target).value = '0';
    }

    if (evOrIv === "ev") {
      if (parseInt((<HTMLInputElement>event.target).value) > 252) {(<HTMLInputElement>event.target).value = '252';}
      this.opponentEv = parseInt((<HTMLInputElement>event.target).value);
    } else if (evOrIv === "iv") {
      if (parseInt((<HTMLInputElement>event.target).value) > 31) {(<HTMLInputElement>event.target).value = '31';}
      this.opponentIv = parseInt((<HTMLInputElement>event.target).value);
    } else {
      console.log("opponent stat selection error");
    }

    this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * this.opponentBoostLevel);
  }

}

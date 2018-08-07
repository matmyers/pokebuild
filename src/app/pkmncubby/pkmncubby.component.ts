import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as pkmnData from "../../assets/tierList.json"
import * as allPkmnData from "../../assets/dataTest3.json"
import * as itemData from "../../assets/items.json"
import * as abilityData from "../../assets/abilities.json"
import * as moveData from "../../assets/moves.json"


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
  movelist = [];
  recmovelist = [];
  moveIndex = 0;
  moveNavIndex = 0;
  recspreadlist = [];
  spreadIndex = 0;
  statModifiers = [1, 1, 1, 1, 1, 1];
  stats = [0, 0, 0, 0, 0, 0];
  statsLabel = "";
  ptsRemaining = 508;
	ev = [0, 0, 0, 0, 0, 0];
	iv = [31, 31, 31, 31, 31, 31];
	nature = "Select nature";
  speedBoost = 0;
  boostLevel = 1;
  displayItems = false;
  displayAbilities = false;
  displayMoves = false;
  displayStats = false;
  displaySpeedComparison = false;
  opponentSelected = false;
  opponent = "";
  opponentSprite = "";
  opponentEv = 0;
  opponentIv = 31;
  opponentModifier = 1;
  opponentSpeed = 0;
  allData = allPkmnData;
  allDataArray = Object.keys(allPkmnData);
  itemData = itemData;
  abilityData = abilityData;
  moveData = moveData;

  constructor() {
  }

  ngOnInit() {
  	// initialize everything using this.name
  	this.tier = this.tier.toLowerCase();
    this.sprite = "../../assets/sprites/" + this.name.toLowerCase().replace(/['%:.]/g,'') + ".png";

    this.abilitylist = allPkmnData[this.name]["abilities"];
    this.ability = this.abilitylist[0];
    this.movelist = allPkmnData[this.name]["moves"];
    this.itemlist.splice(-1,1);
    this.recitemlist = [];// allPkmnData[this.name]["itemUsage"][this.tier];
    // var obj = { first: 'someVal' };
    // obj[Object.keys(obj)[0]]; //returns 'someVal'
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

        this.recspreadlist.push({nature:natureSelected, hp:key[0].substring(colonIndex+1, slash1), atk:key[0].substring(slash1+1, slash2), def:key[0].substring(slash2+1, slash3), spa:key[0].substring(slash3+1, slash4), spd:key[0].substring(slash4+1, slash5), spe:key[0].substring(slash5+1)});
      }
    }

    if (allPkmnData[this.name]["specialItem"]) {
      // this.item = allPkmnData[this.name]["specialItem"];
      // this.searchAbi.nativeElement.focus();
      this.addItem(allPkmnData[this.name]["specialItem"]);
    } else {
      this.searchIte.nativeElement.focus();
    }

    this.allDataArray.splice(-1,1);

    this.setAllStats();

    this.speedBoost = this.stats[5];
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
    
    if (event.target.value.length === 0) {
      this.isSearching = false;
      this.itemIndex = 0;
    } else {
      this.isSearching = true;
      this.itemIndex = this.recitemlist.length;
    }

    this.itemlist = [];
    // search by name
    for (var i = 0; i < Object.keys(itemData).length; ++i) {
      if (Object.keys(itemData)[i].toLowerCase().includes(event.target.value.toLowerCase()) && Object.keys(itemData)[i].toLowerCase() !== "default") {
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

  navigateItem(event: Event) {
    if (event.keyCode == 13) {
      if (this.itemIndex < this.recitemlist.length) {
        this.addItem(this.recitemlist[this.itemIndex]);
      } else {
        this.addItem(this.itemlist[this.itemIndex - this.recitemlist.length]);
      }
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
      if (this.moveNavIndex < this.recmovelist.length) {
        this.addMove(this.recmovelist[this.moveNavIndex]);
      } else {
        this.addMove(this.movelist[this.moveNavIndex - this.recmovelist.length]);
      }
      // this.addMove(this.movelist[this.moveNavIndex]);
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

  highlightItems(index: number) {
    this.itemIndex = index;

    if (this.itemlist.length > 0) {
      setTimeout(()=>{
        var hoverItem = document.getElementById('item' + this.itemIndex);
        hoverItem.classList.add('myHover');
      }, 10);
    }

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

  highlightMoves(index: number) {
    this.moveNavIndex = index;

    if (this.movelist.length > 0) {
      setTimeout(()=>{
        var hoverMove = document.getElementById('moveNav' + this.moveNavIndex);
        hoverMove.classList.add('myHover');
      }, 10);
    }

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

  onUpdateSearchMove(event: Event) {
    //searchInput = event.target.value;

    if (this.movelist.length > 0) {
      var prevHoverMove = document.getElementById('moveNav' + this.moveNavIndex);
      prevHoverMove.classList.remove('myHover');  
    }

    if (event.target.value.length === 0) {
      this.isSearching = false;
      this.moveNavIndex = 0;
    } else {
      this.isSearching = true;
      this.moveNavIndex = this.recmovelist.length;
    }

    this.movelist = [];
    // search by name
    for (var i = 0; i < allPkmnData[this.name]["moves"].length; ++i) {
      if (allPkmnData[this.name]["moves"][i].toLowerCase().includes(event.target.value.toLowerCase())) {
        this.movelist.push(allPkmnData[this.name]["moves"][i]);
      }
    }

    this.highlightMoves(this.moveNavIndex);
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
        // reset move display for next move
        document.getElementById('searchMov' + this.index + '-' + (this.moveIndex)).value = "";
        this.movelist = allPkmnData[this.name]["moves"];
        document.getElementById('searchMov' + this.index + '-' + (this.moveIndex)).focus();
      }, 10);
    }
  }

  addSpread(spreadSelected: string) {
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
      document.getElementById('pts' + this.index).style.color = 'black';
    }

    this.setNature(natureSelected);
    this.displaySpreads = false
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
        break;
      case "atk":
        this.ev[1] = parseInt(event.target.value);
        break;
      case "def":
        this.ev[2] = parseInt(event.target.value);
        break;
      case "spa":
        this.ev[3] = parseInt(event.target.value);
        break;
      case "spd":
        this.ev[4] = parseInt(event.target.value);
        break;
      case "spe":
        this.ev[5] = parseInt(event.target.value);
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

  setIV(event: Event, statChanged: string) {
    if (event.target.value.length === 0) {
      event.target.value = 0;
    }
    if (event.target.value > 31) {
      event.target.value = 31;
    }
    switch(statChanged) {
      case "hp":
        this.iv[0] = parseInt(event.target.value);
        break;
      case "atk":
        this.iv[1] = parseInt(event.target.value);
        break;
      case "def":
        this.iv[2] = parseInt(event.target.value);
        break;
      case "spa":
        this.iv[3] = parseInt(event.target.value);
        break;
      case "spd":
        this.iv[4] = parseInt(event.target.value);
        break;
      case "spe":
        this.iv[5] = parseInt(event.target.value);
        break;
      default:
        console.log("stat type error");
    }

    this.setAllStats();
  }

  setNature(preset: string) {
    //console.log(document.getElementById('natureSelect').options);
    var natureSelected = "";

    if (preset === undefined) {
      this.nature = document.getElementById('natureSelect').value;

      let parenIndex = this.nature.indexOf('(');
      natureSelected = this.nature.substring(0, parenIndex-1);
    } else {
      for (var m = 0; m < document.getElementById('natureSelect').options.length; ++m) {
        if (document.getElementById('natureSelect').options[m].value.includes(preset)) {
          document.getElementById('natureSelect').value = document.getElementById('natureSelect').options[m].value;
        }
      }
      natureSelected = preset;
    }

    this.nature = document.getElementById('natureSelect').value;
    
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
    this.stats[0] = 2 * allPkmnData[this.name]["baseStats"][0] + this.iv[0] + Math.floor(this.ev[0]/4) + 110;
    for (var k = 1; k < 6; ++k) {
      this.stats[k] = Math.floor((2 * allPkmnData[this.name]["baseStats"][k] + this.iv[k] + Math.floor(this.ev[k]/4) + 5) * this.statModifiers[k]);
    }
    this.speedBoost = Math.floor(this.stats[5] * this.boostLevel);
  }

  setSpeedBoost() {
    switch(document.getElementById('speedBoostSelect').value) {
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
    switch(document.getElementById('opponentSpeedBoostSelect').value) {
      case "+6":
        this.speedBoost = this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * 4);
        break;
      case "+5":
        this.speedBoost = this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * 3.5);
        break;
      case "+4":
        this.speedBoost = this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * 3);
        break;
      case "+3":
        this.speedBoost = this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * 2.5);
        break;
      case "+2":
        this.speedBoost = this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * 2);
        break;
      case "+1":
        this.speedBoost = this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * 1.5);
        break;
      case "0":
        this.speedBoost = this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier);
        break;
      case "-1":
        this.speedBoost = this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * (2.0/3.0));
        break;
      case "-2":
        this.speedBoost = this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * 0.5);
        break;
      case "-3":
        this.speedBoost = this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * 0.4);
        break;
      case "-4":
        this.speedBoost = this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * (1.0/3.0));
        break;
      case "-5":
        this.speedBoost = this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * (2.0/7.0));
        break;
      case "-6":
        this.speedBoost = this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier * 0.25);
        break;
      default:
        console.log("opp speed boost type error");
    }
  }

  setOpponent() {
    this.opponent = document.getElementById('opponentSelect').value;
    this.opponentSprite = "../../assets/sprites/" + this.opponent.toLowerCase().replace(/['%:.]/g,'') + ".png";
    this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier);
    this.opponentSelected = true;
  }

  setOpponentModifier() {
    if (document.getElementById('opponentModSelect').value === "+Speed") {
      this.opponentModifier = 1.1;
    } else if (document.getElementById('opponentModSelect').value === "-Speed") {
      this.opponentModifier = 0.9;
    } else {
      this.opponentModifier = 1;
    }

    this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier);
  }  

  setOpponentStats(event: Event, evOrIv: string) {
    if (event.target.value.length === 0) {
      event.target.value = 0;
    }

    if (evOrIv === "ev") {
      if (event.target.value > 252) {event.target.value = 252;}
      this.opponentEv = parseInt(event.target.value);
    } else if (evOrIv === "iv") {
      if (event.target.value > 31) {event.target.value = 31;}
      this.opponentIv = parseInt(event.target.value);
    } else {
      console.log("opponent stat selection error");
    }

    this.opponentSpeed = Math.floor((2 * allPkmnData[this.opponent]["baseStats"][5] + this.opponentIv + Math.floor(this.opponentEv/4) + 5) * this.opponentModifier);
  }

}

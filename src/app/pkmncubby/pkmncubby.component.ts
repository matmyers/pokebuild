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
	type = "Type to be found later";
	item = "";
  itemlist = pkmnData["item"];
	ability = "";
  abilitylist = pkmnData["ability"];
	moves = ["", "", "", ""];
  movelist = pkmnData["moves"];
  moveIndex = 0;
  stats = [0, 0, 0, 0, 0, 0];
	ev = [0, 0, 0, 0, 0, 0];
	iv = [0, 0, 0, 0, 0, 0];
	nature = "";
  displayItems = false;
  displayAbilities = false;
  displayMoves = false;

  constructor() {
  }

  ngOnInit() {
  	// initialize everything using this.name
  	//this.type = pkmnData["OU"][this.name]["type"];
    this.sprite = "../../assets/sprites/" + this.name.toLowerCase() + ".png";
    this.searchIte.nativeElement.focus();

    this.stats[0] = 2 * allPkmnData[this.name]["hp"] + this.iv[0] + this.ev[0]/4 + 110;
    this.stats[1] = 2 * allPkmnData[this.name]["atk"] + this.iv[1] + this.ev[1]/4 + 5;
    this.stats[2] = 2 * allPkmnData[this.name]["def"] + this.iv[2] + this.ev[2]/4 + 5;
    this.stats[3] = 2 * allPkmnData[this.name]["spatk"] + this.iv[3] + this.ev[3]/4 + 5;
    this.stats[4] = 2 * allPkmnData[this.name]["spdef"] + this.iv[4] + this.ev[4]/4 + 5;
    this.stats[5] = 2 * allPkmnData[this.name]["speed"] + this.iv[5] + this.ev[5]/4 + 5;

    // testing testing 123...
    // this.item = "Leftovers";
    // this.ability = "Pressure"
    // this.nature = "Adamant";
    // this.moves[0] = "Protect";
    // this.moves[1] = "Protect";
    // this.moves[2] = "Protect";
    // this.moves[3] = "Protect";
  }

  removeMe() {
    this.team.splice(this.index, 1);
  }

  onUpdateSearchItem(event: Event) {
    //searchInput = event.target.value;
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

  addAbility(abilitySelected: string) {
    this.ability = abilitySelected;
    this.displayAbilities = false;
    setTimeout(()=>{
      document.getElementById('searchMov' + this.index + '-0').focus();
    }, 10);
  }

  onUpdateSearchMove(event: Event) {
    //searchInput = event.target.value;
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
    } else {
      setTimeout(()=>{
        document.getElementById('searchMov' + this.index + '-' + (this.moveIndex + 1)).focus();
      }, 10);
    }
  }

}

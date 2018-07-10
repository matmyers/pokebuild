import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as pkmnData from "../../assets/tierList.json"


@Component({
  selector: 'app-pkmncubby',
  templateUrl: './pkmncubby.component.html',
  styleUrls: ['./pkmncubby.component.css']
})
export class PkmncubbyComponent implements OnInit {
  @ViewChild('searchItem') searchIte: ElementRef;
  @ViewChild('searchMove') searchMov: ElementRef;

	@Input() team : string[];
  @Input() name : string;
  @Input() index : number;
  sprite = "";
	type = "Type to be found later";
	item = "";
  itemlist = pkmnData["item"];
	ability = "";
  abilitylist = pkmnData["item"];
	moves = ["", "", "", ""];
  movelist = pkmnData["item"];
  moveIndex = 0;
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
  }

  onUpdateSearchMove(event: Event) {
    //searchInput = event.target.value;
    this.movelist = [];
    // search by name
    for (var i = 0; i < pkmnData["item"].length; ++i) {
      if (pkmnData["item"][i].toLowerCase().includes(event.target.value.toLowerCase())) {
        this.movelist.push(pkmnData["item"][i]);
      }
    }
  }

  addMove(moveSelected: string) {
    this.moves[this.moveIndex] = moveSelected;
    this.displayMoves = false;
  }

}

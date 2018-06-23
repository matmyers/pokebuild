import { Component, OnInit, Input } from '@angular/core';
import * as pkmnData from "../../assets/tierList.json"


@Component({
  selector: 'app-pkmncubby',
  templateUrl: './pkmncubby.component.html',
  styleUrls: ['./pkmncubby.component.css']
})
export class PkmncubbyComponent implements OnInit {
	@Input() team : string[];
  @Input() name : string;
  @Input() index : number;
  sprite = "";
	type = "Type to be found later";
	item = "Select item";
	ability = "Select ability";
	moves = ["Select move", "Select move", "Select move", "Select move"];
	ev = [0, 0, 0, 0, 0, 0];
	iv = [0, 0, 0, 0, 0, 0];
	nature = "";

  constructor() {
  }

  ngOnInit() {
  	// initialize everything using this.name
  	//this.type = pkmnData["OU"][this.name]["type"];
    this.sprite = "../../assets/sprites/" + this.name.toLowerCase() + ".png";

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
    this.team.splice(this.index, 1);;
  }

}

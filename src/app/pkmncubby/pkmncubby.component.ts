import { Component, OnInit, Input } from '@angular/core';
import * as pkmnData from "../../assets/pokemon.json"


@Component({
  selector: 'app-pkmncubby',
  templateUrl: './pkmncubby.component.html',
  styleUrls: ['./pkmncubby.component.css']
})
export class PkmncubbyComponent implements OnInit {
	@Input() team : string[];
  @Input() name : string;
  @Input() index : number;
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
    console.log(this.team);
  }

  removeMe() {
    this.team.splice(this.index, 1);;
  }

}

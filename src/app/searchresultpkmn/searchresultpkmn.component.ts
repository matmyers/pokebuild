import { Component, OnInit, Input } from '@angular/core';
import * as pkmnData from "../../assets/pokemon.json"


@Component({
  selector: 'app-searchresultpkmn',
  templateUrl: './searchresultpkmn.component.html',
  styleUrls: ['./searchresultpkmn.component.css']
})
export class SearchresultpkmnComponent implements OnInit {
  @Input() name : string;
  sprite = "";
  type = "Type";
  ability = "Abilities";
  stats = "Stats";

  constructor() {
  }

  ngOnInit() {
  	// initialize everything using this.name
  	//this.type = pkmnData["OU"][this.name]["type"];
    this.sprite = "../../assets/sprites/" + this.name.toLowerCase() + ".png";
  }

}

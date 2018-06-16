import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pkmncubby',
  templateUrl: './pkmncubby.component.html',
  styleUrls: ['./pkmncubby.component.css']
})
export class PkmncubbyComponent implements OnInit {
	@Input() name : string;
	type = "";
	item = "";
	ability = "";
	moves = ["", "", "", ""];
	ev = [0, 0, 0, 0, 0, 0];
	iv = [0, 0, 0, 0, 0, 0];
	nature = "";

  constructor() {
  }

  ngOnInit() {
  	// initialize everything using this.name
  }

}

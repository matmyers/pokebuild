import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pkmncubby',
  templateUrl: './pkmncubby.component.html',
  styleUrls: ['./pkmncubby.component.css']
})
export class PkmncubbyComponent implements OnInit {
	name = "";
	type = "";
	item = "";
	ability = "";
	moves = ["", "", "", ""];
	ev = [0, 0, 0, 0, 0, 0];
	iv = [0, 0, 0, 0, 0, 0];
	nature = "";

  constructor() { }

  ngOnInit() {
  }

}

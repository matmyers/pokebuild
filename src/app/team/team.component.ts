import { Component, OnInit, QueryList, ViewChild, ViewChildren, ElementRef, ChangeDetectorRef } from '@angular/core';
import { PkmncubbyComponent } from '../pkmncubby/pkmncubby.component';
import * as pkmnData from "../../jsondata/tierList.json"
import * as allPkmnData from "../../jsondata/dataTest3.json"
import * as abilityData from "../../jsondata/abilities.json"
import * as moveData from "../../jsondata/moves.json"
import * as roleData from "../../jsondata/roles.json"


enum Tier {
  Ubers = 0,
  OU,
  UUBL,
  UU,
  RUBL,
  RU,
  NUBL,
  NU,
  PUBL,
  PU,
  LC,
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @ViewChild('searchPoke') searchBar: ElementRef;

  @ViewChildren(PkmncubbyComponent) pkmnCubbies: QueryList<PkmncubbyComponent>;
  teamCubbies = [];

  teamMembers = [];
  teamSprites = [];
  viewPortItems;
  tier = "Select tier";
  tierpkmn = [];
  legalpkmn = [];
  tierKeys = Object.keys(pkmnData);
  tierEnum = Tier;
  allData = allPkmnData;
  sprites = [];
  listedpkmnIndex = 0;
  displayPokemon = false;
  tierSelected = false;
  searchInput = "";
  exportText = "";
  exportClicked = false;
  exportRows = 0;
  importClicked = false;
  singlePokemonView = [false];
  typeKeys = ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fire", "Fighting", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"];
  abilityKeys = Object.keys(abilityData);
  moveKeys = Object.keys(moveData);
  roleKeys = ["Setup Sweeper", "Physical Wallbreaker", "Special Wallbreaker", "Mixed Wallbreaker", "Stallbreaker", "Physically Defensive Wall", "Specially Defensive Wall", "Mixed Defensive Wall", "Offensive Pivot", "Defensive Pivot", "Cleric", "Hazard Setter", "Hazard Removal", "Dedicated Lead", "Choice Band User", "Choice Specs User", "Choice Scarf User", "Trapper", "Priority", "Trick Room Setter", "Trick Room Abuser", "Rain", "Sun", "Sand", "Hail"];
  displayRecommended = false;
  recpokelist = [];


  constructor(private cd : ChangeDetectorRef) { }

  ngOnInit() {
    this.tierKeys.splice(-1,1);
  }

  scrollToSearch() {
    setTimeout(()=>{
      var searchDisplayArea = document.getElementById('searchDisplayArea');
      searchDisplayArea.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 10);
  }

  scrollToTop() {
    setTimeout(()=>{
      var top = document.getElementById('top');
      top.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 10);
  }

  setTier(tierInput: string) {
    this.tierpkmn = [];
    this.legalpkmn = [];
  	this.tier = tierInput;

    if (tierInput === "VGC") {
      this.tierpkmn = pkmnData[tierInput];
      this.tierpkmn = this.tierpkmn.slice(0,1).concat(this.tierpkmn.slice(1,this.tierpkmn.length).sort());
      this.legalpkmn = pkmnData[tierInput];
      this.legalpkmn = this.legalpkmn.slice(0,1).concat(this.legalpkmn.slice(1,this.legalpkmn.length).sort());
    } else {
      for (var k = 0; k < this.tierKeys.length; ++k) {
        if (this.tierKeys[k] !== 'VGC') {
          if (this.tierEnum[this.tierKeys[k]] >= this.tierEnum[this.tier]) {
            this.tierpkmn.push.apply(this.tierpkmn, pkmnData[this.tierKeys[k]]);
            this.legalpkmn.push.apply(this.legalpkmn, pkmnData[this.tierKeys[k]]);
          }
        }
      }
    }

  	//this.tierpkmn = pkmnData[this.tier];
    for (var i = 0; i < this.tierpkmn.length; ++i) {
      if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
        this.sprites[i] = "";
      } else {
        this.sprites[i] = "./assets/sprites/" + this.tierpkmn[i].toLowerCase().replace(/['%:.]/g,'') + ".png";
      }
    }
    this.tierSelected = true;
  	this.displayPokemon = true;
    setTimeout(()=>{
      this.searchBar.nativeElement.focus();
    },10);
  }

  updateViewPort(event: Event) {
    this.viewPortItems = event;

    for (var i = 0; i < this.viewPortItems.length; ++i) {
      if (this.tierKeys.indexOf(this.viewPortItems[i]) != -1) {
        this.sprites[i] = "";
      } else {
        this.sprites[i] = "./assets/sprites/" + this.viewPortItems[i].toLowerCase().replace(/['%:.]/g,'') + ".png";
      }
    }
  }

  navigatePokemon(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.addTeamMember(this.tierpkmn[this.listedpkmnIndex]);
    } else if (event.keyCode == 38) {
      if (this.listedpkmnIndex > 0) {
        var prevHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        prevHoverPkmn.classList.remove('myHover');
        this.listedpkmnIndex--;
        var nextHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        while (nextHoverPkmn === null) {
          this.listedpkmnIndex--;
          nextHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        }
        nextHoverPkmn.classList.add('myHover');
      }
    } else if (event.keyCode == 40) {
      if (this.listedpkmnIndex < (this.tierpkmn.length-1)) {
        var prevHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        prevHoverPkmn.classList.remove('myHover');
        this.listedpkmnIndex++;
        var nextHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        while (nextHoverPkmn === null) {
          this.listedpkmnIndex++;
          nextHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
        }
        nextHoverPkmn.classList.add('myHover');
      }
    }
  }

  highlightPokemon() {
    setTimeout(()=>{
      var hoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
      while (hoverPkmn === null) {
        this.listedpkmnIndex++;
        hoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
      }
      // if (hoverPkmn !== null) {
      //   hoverPkmn.classList.add('myHover');
      // }
      hoverPkmn.classList.add('myHover');
    }, 10);

    this.scrollToSearch();
  }

  setHover(newHoverIndex: number) {
    var prevHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
    if (prevHoverPkmn !== null) {
      prevHoverPkmn.classList.remove('myHover');
    }
    this.listedpkmnIndex = newHoverIndex;
    var nextHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
    if (nextHoverPkmn !== null) {
      nextHoverPkmn.classList.add('myHover');
    }
  }

  addTeamMember(poke: string) {
  	this.teamMembers.push(poke);
    this.teamSprites.push("./assets/sprites/" + poke.toLowerCase().replace(/['%:.]/g,'') + ".png");
    this.displayPokemon = false;
    setTimeout(()=>{
      this.teamCubbies = this.pkmnCubbies.toArray();
      this.teamCubbies[this.teamCubbies.length-1].enterSinglePokemonView();
    },10);
    this.singlePokemonView[0] = true;
    this.displayRecommended = false;
  }

  updateRecommended() {
    // get recommendations
    this.recpokelist = [];
    for (var i = 0; i < this.teamMembers.length; ++i) {
      if (this.teamMembers[i].nameImport == null) {
        var memberName = this.teamMembers[i];
      } else {
        var memberName = this.teamMembers[i].nameImport;
      }

      if (allPkmnData[memberName]["teammates"][this.tier]) {
        for (var j = 0; j < allPkmnData[memberName]["teammates"][this.tier].length; ++j) {
          var key = Object.keys(allPkmnData[memberName]["teammates"][this.tier][j]);
          // check if already in, if not, push
          var poke = {name:key[0], sprite:"./assets/sprites/" + key[0].toLowerCase().replace(/['%:.]/g,'') + ".png", usage:[allPkmnData[memberName]["teammates"][this.tier][j][key[0]]], partner:[memberName]};
          var alreadyIn = false;
          for (var k = 0; k < this.recpokelist.length; ++k) {
            if (this.recpokelist[k].name === key[0]) {
              this.recpokelist[k].usage.push(poke.usage);
              this.recpokelist[k].partner.push(poke.partner);
              alreadyIn = true;
              break;
            }
          }

          var alreadyOnTeam = false;
          for (var m = 0; m < this.teamMembers.length; ++m) {
            if (this.teamMembers[m].nameImport == null) {
              if (this.teamMembers[m] === poke.name) {
                alreadyOnTeam = true;
                break;
              }
            } else {
              if (this.teamMembers[m].nameImport === poke.name) {
                alreadyOnTeam = true;
                break;
              }
            }
          }
          if (!alreadyIn && !alreadyOnTeam) {
            this.recpokelist.push(poke);
          }
        }
      }
    }

    // sort by length of teammates, then by usage percentage
    this.recpokelist.sort(function(a,b) {
      if (a.partner.length !== b.partner.length) {
        return b.partner.length - a.partner.length;
      } else {
        var totalUsageA = 0;
        var totalUsageB = 0;
        for (var i = 0; i < a.partner.length; ++i) {
          totalUsageA += parseFloat(a.usage[i]);
          totalUsageB += parseFloat(b.usage[i]);
        }
        return totalUsageB - totalUsageA;
      }
    });

    this.displayRecommended = true;
  }

  sortPokeList() {
    var sortSelected = (<HTMLInputElement>document.getElementById('sortInput')).value;

    switch(sortSelected) {
      case "Alphabetical":
        var startIndex = 1;
        for (var i = 1; i < this.tierpkmn.length; ++i) {
          if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
            this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,i).sort()).concat(this.tierpkmn.slice(i,this.tierpkmn.length));
            startIndex = i+1;
          }
        }
        this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,this.tierpkmn.length).sort());
        break;
      case "Highest HP":
        var startIndex = 1;
        for (var i = 1; i < this.tierpkmn.length; ++i) {
          if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
            this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,i).sort(function(a,b) {
              return allPkmnData[b]['baseStats'][0] - allPkmnData[a]['baseStats'][0];
            })).concat(this.tierpkmn.slice(i,this.tierpkmn.length));
            startIndex = i+1;
          }
        }
        this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,this.tierpkmn.length).sort(function(a,b) {
          return allPkmnData[b]['baseStats'][0] - allPkmnData[a]['baseStats'][0];
        }));
        break;
      case "Lowest HP":
        var startIndex = 1;
        for (var i = 1; i < this.tierpkmn.length; ++i) {
          if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
            this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,i).sort(function(a,b) {
              return allPkmnData[a]['baseStats'][0] - allPkmnData[b]['baseStats'][0];
            })).concat(this.tierpkmn.slice(i,this.tierpkmn.length));
            startIndex = i+1;
          }
        }
        this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,this.tierpkmn.length).sort(function(a,b) {
          return allPkmnData[a]['baseStats'][0] - allPkmnData[b]['baseStats'][0];
        }));
        break;
      case "Highest Atk":
        var startIndex = 1;
        for (var i = 1; i < this.tierpkmn.length; ++i) {
          if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
            this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,i).sort(function(a,b) {
              return allPkmnData[b]['baseStats'][1] - allPkmnData[a]['baseStats'][1];
            })).concat(this.tierpkmn.slice(i,this.tierpkmn.length));
            startIndex = i+1;
          }
        }
        this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,this.tierpkmn.length).sort(function(a,b) {
          return allPkmnData[b]['baseStats'][1] - allPkmnData[a]['baseStats'][1];
        }));
        break;
      case "Lowest Atk":
        var startIndex = 1;
        for (var i = 1; i < this.tierpkmn.length; ++i) {
          if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
            this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,i).sort(function(a,b) {
              return allPkmnData[a]['baseStats'][1] - allPkmnData[b]['baseStats'][1];
            })).concat(this.tierpkmn.slice(i,this.tierpkmn.length));
            startIndex = i+1;
          }
        }
        this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,this.tierpkmn.length).sort(function(a,b) {
          return allPkmnData[a]['baseStats'][1] - allPkmnData[b]['baseStats'][1];
        }));
        break;
      case "Highest Def":
        var startIndex = 1;
        for (var i = 1; i < this.tierpkmn.length; ++i) {
          if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
            this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,i).sort(function(a,b) {
              return allPkmnData[b]['baseStats'][2] - allPkmnData[a]['baseStats'][2];
            })).concat(this.tierpkmn.slice(i,this.tierpkmn.length));
            startIndex = i+1;
          }
        }
        this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,this.tierpkmn.length).sort(function(a,b) {
          return allPkmnData[b]['baseStats'][2] - allPkmnData[a]['baseStats'][2];
        }));
        break;
      case "Lowest Def":
        var startIndex = 1;
        for (var i = 1; i < this.tierpkmn.length; ++i) {
          if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
            this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,i).sort(function(a,b) {
              return allPkmnData[a]['baseStats'][2] - allPkmnData[b]['baseStats'][2];
            })).concat(this.tierpkmn.slice(i,this.tierpkmn.length));
            startIndex = i+1;
          }
        }
        this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,this.tierpkmn.length).sort(function(a,b) {
          return allPkmnData[a]['baseStats'][2] - allPkmnData[b]['baseStats'][2];
        }));
        break;
      case "Highest SpA":
        var startIndex = 1;
        for (var i = 1; i < this.tierpkmn.length; ++i) {
          if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
            this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,i).sort(function(a,b) {
              return allPkmnData[b]['baseStats'][3] - allPkmnData[a]['baseStats'][3];
            })).concat(this.tierpkmn.slice(i,this.tierpkmn.length));
            startIndex = i+1;
          }
        }
        this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,this.tierpkmn.length).sort(function(a,b) {
          return allPkmnData[b]['baseStats'][3] - allPkmnData[a]['baseStats'][3];
        }));
        break;
      case "Lowest SpA":
        var startIndex = 1;
        for (var i = 1; i < this.tierpkmn.length; ++i) {
          if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
            this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,i).sort(function(a,b) {
              return allPkmnData[a]['baseStats'][3] - allPkmnData[b]['baseStats'][3];
            })).concat(this.tierpkmn.slice(i,this.tierpkmn.length));
            startIndex = i+1;
          }
        }
        this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,this.tierpkmn.length).sort(function(a,b) {
          return allPkmnData[a]['baseStats'][3] - allPkmnData[b]['baseStats'][3];
        }));
        break;
      case "Highest SpD":
        var startIndex = 1;
        for (var i = 1; i < this.tierpkmn.length; ++i) {
          if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
            this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,i).sort(function(a,b) {
              return allPkmnData[b]['baseStats'][4] - allPkmnData[a]['baseStats'][4];
            })).concat(this.tierpkmn.slice(i,this.tierpkmn.length));
            startIndex = i+1;
          }
        }
        this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,this.tierpkmn.length).sort(function(a,b) {
          return allPkmnData[b]['baseStats'][4] - allPkmnData[a]['baseStats'][4];
        }));
        break;
      case "Lowest SpD":
        var startIndex = 1;
        for (var i = 1; i < this.tierpkmn.length; ++i) {
          if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
            this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,i).sort(function(a,b) {
              return allPkmnData[a]['baseStats'][4] - allPkmnData[b]['baseStats'][4];
            })).concat(this.tierpkmn.slice(i,this.tierpkmn.length));
            startIndex = i+1;
          }
        }
        this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,this.tierpkmn.length).sort(function(a,b) {
          return allPkmnData[a]['baseStats'][4] - allPkmnData[b]['baseStats'][4];
        }));
        break;
      case "Highest Spe":
        var startIndex = 1;
        for (var i = 1; i < this.tierpkmn.length; ++i) {
          if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
            this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,i).sort(function(a,b) {
              return allPkmnData[b]['baseStats'][5] - allPkmnData[a]['baseStats'][5];
            })).concat(this.tierpkmn.slice(i,this.tierpkmn.length));
            startIndex = i+1;
          }
        }
        this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,this.tierpkmn.length).sort(function(a,b) {
          return allPkmnData[b]['baseStats'][5] - allPkmnData[a]['baseStats'][5];
        }));
        break;
      case "Lowest Spe":
        var startIndex = 1;
        for (var i = 1; i < this.tierpkmn.length; ++i) {
          if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
            this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,i).sort(function(a,b) {
              return allPkmnData[a]['baseStats'][5] - allPkmnData[b]['baseStats'][5];
            })).concat(this.tierpkmn.slice(i,this.tierpkmn.length));
            startIndex = i+1;
          }
        }
        this.tierpkmn = this.tierpkmn.slice(0,startIndex).concat(this.tierpkmn.slice(startIndex,this.tierpkmn.length).sort(function(a,b) {
          return allPkmnData[a]['baseStats'][5] - allPkmnData[b]['baseStats'][5];
        }));
        break;
      default:
        console.log("sort input error");
    }
  }

  // removeTeamMember(index: number) {
  // 	this.teamMembers.splice(index, 1);
  //   this.teamSprites.splice(index, 1);
  //   this.singlePokemonView[0] = false;
  // }

  editPoke(index: number) {
    this.displayPokemon = false;
    this.teamCubbies = this.pkmnCubbies.toArray();
    this.teamCubbies[index].enterSinglePokemonView();
  }

  enterTeamView() {
    for (var i = 0; i < this.teamMembers.length; ++i) {
      document.getElementById("cubby" + i).style.display = "block";
    }
    this.singlePokemonView[0] = false;

    this.cd.detectChanges();
    this.displayPokemon = false;

    setTimeout(()=>{
      (<HTMLInputElement>document.activeElement).blur();
      this.scrollToTop();
    },10);
  }

  printPokemon() {
    this.listedpkmnIndex = 0;
    this.tierpkmn = this.legalpkmn;
    for (var i = 0; i < this.tierpkmn.length; ++i) {
      if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
        this.sprites[i] = "";
      } else {
        this.sprites[i] = "./assets/sprites/" + this.tierpkmn[i].toLowerCase().replace(/['%:.]/g,'') + ".png";
      }
    }
  	this.displayPokemon = true;
    setTimeout(()=>{
      this.searchBar.nativeElement.focus();
    },10);
  }

  importShowdown() {
    this.teamMembers = [];
    this.teamSprites = [];
    let importLines = (<HTMLTextAreaElement>document.getElementById("importTextArea")).value.split("\n");

    for (var i = 0; i < importLines.length; ++i) {
      if (importLines[i].length == 0) {
        break;
      }

      if (importLines[i].indexOf('(') != -1) {
        var name = importLines[i].slice(0,importLines[i].indexOf('(')-1).trim();
      } else {
        if (importLines[i].indexOf('@') != -1) {
          var name = importLines[i].slice(0,importLines[i].indexOf('@')-1).trim();
        } else {
          var name = importLines[i].trim();
        }
      }

      if (importLines[i].indexOf('@') != -1) {
        var item = importLines[i].slice(importLines[i].indexOf('@')+2,importLines[i].length).trim();
      } else {
        var item = "";
      }
      i += 1;

      var ability = importLines[i].slice(importLines[i].indexOf(':')+2,importLines[i].length).trim();
      i += 1;

      while (importLines[i].slice(0,3) !== "EVs" && !importLines[i].includes('Nature')) {
        i += 1;
      }

      var evs = [0,0,0,0,0,0];
      if (importLines[i].slice(0,3) === "EVs") {
        // get EVs
        var newEVstring = "";
        if (importLines[i].includes('HP')) {
          evs[0] = parseInt(importLines[i].slice(5,importLines[i].indexOf('H')-1).trim());
          if (importLines[i].indexOf('/') != -1) {
            newEVstring = importLines[i].slice(importLines[i].indexOf('/')+2,importLines[i].length);
          }
        } else {
          newEVstring = importLines[i].slice(5,importLines[i].length);
        }

        if (newEVstring.includes('Atk')) {
          evs[1] = parseInt(newEVstring.slice(0,newEVstring.indexOf('A')-1).trim());
          if (newEVstring.indexOf('/') != -1) {
            newEVstring = newEVstring.slice(newEVstring.indexOf('/')+2,newEVstring.length);
          }
        }

        if (newEVstring.includes('Def')) {
          evs[2] = parseInt(newEVstring.slice(0,newEVstring.indexOf('D')-1).trim());
          if (newEVstring.indexOf('/') != -1) {
            newEVstring = newEVstring.slice(newEVstring.indexOf('/')+2,newEVstring.length);
          }
        }

        if (newEVstring.includes('SpA')) {
          evs[3] = parseInt(newEVstring.slice(0,newEVstring.indexOf('S')-1).trim());
          if (newEVstring.indexOf('/') != -1) {
            newEVstring = newEVstring.slice(newEVstring.indexOf('/')+2,newEVstring.length);
          }
        }

        if (newEVstring.includes('SpD')) {
          evs[4] = parseInt(newEVstring.slice(0,newEVstring.indexOf('S')-1).trim());
          if (newEVstring.indexOf('/') != -1) {
            newEVstring = newEVstring.slice(newEVstring.indexOf('/')+2,newEVstring.length);
          }
        }

        if (newEVstring.includes('Spe')) {
          evs[5] = parseInt(newEVstring.slice(0,newEVstring.indexOf('S')-1).trim());
          if (newEVstring.indexOf('/') != -1) {
            newEVstring = newEVstring.slice(newEVstring.indexOf('/')+2,newEVstring.length);
          }
        }

        i += 1;
      }

      if (importLines[i].includes('Nature')) {
        var nature = importLines[i].slice(0,importLines[i].indexOf('Nature')-1).trim();
        i += 1;
      } else {
        var nature = "Serious";
      }

      var ivs = [31,31,31,31,31,31];
      if (importLines[i].slice(0,3) === "IVs") {
        // get IVs
        var newIVstring = "";
        if (importLines[i].includes('HP')) {
          ivs[0] = parseInt(importLines[i].slice(5,importLines[i].indexOf('H')-1).trim());
          if (importLines[i].indexOf('/') != -1) {
            newIVstring = importLines[i].slice(importLines[i].indexOf('/')+2,importLines[i].length);
          }
        } else {
          newIVstring = importLines[i].slice(5,importLines[i].length);
        }

        if (newIVstring.includes('Atk')) {
          ivs[1] = parseInt(newIVstring.slice(0,newIVstring.indexOf('A')-1).trim());
          if (newIVstring.indexOf('/') != -1) {
            newIVstring = newIVstring.slice(newIVstring.indexOf('/')+2,newIVstring.length);
          }
        }

        if (newIVstring.includes('Def')) {
          ivs[2] = parseInt(newIVstring.slice(0,newIVstring.indexOf('D')-1).trim());
          if (newIVstring.indexOf('/') != -1) {
            newIVstring = newIVstring.slice(newIVstring.indexOf('/')+2,newIVstring.length);
          }
        }

        if (newIVstring.includes('SpA')) {
          ivs[3] = parseInt(newIVstring.slice(0,newIVstring.indexOf('S')-1).trim());
          if (newIVstring.indexOf('/') != -1) {
            newIVstring = newIVstring.slice(newIVstring.indexOf('/')+2,newIVstring.length);
          }
        }

        if (newIVstring.includes('SpD')) {
          ivs[4] = parseInt(newIVstring.slice(0,newIVstring.indexOf('S')-1).trim());
          if (newIVstring.indexOf('/') != -1) {
            newIVstring = newIVstring.slice(newIVstring.indexOf('/')+2,newIVstring.length);
          }
        }

        if (newIVstring.includes('Spe')) {
          ivs[5] = parseInt(newIVstring.slice(0,newIVstring.indexOf('S')-1).trim());
          if (newIVstring.indexOf('/') != -1) {
            newIVstring = newIVstring.slice(newIVstring.indexOf('/')+2,newIVstring.length);
          }
        }

        i += 1;
      }

      var moves = [];
      while (importLines[i].length > 0) {
        moves.push(importLines[i].slice(importLines[i].indexOf('-')+2,importLines[i].length).trim());
        i += 1;
      }

      this.teamMembers.push({nameImport:name, itemImport:item, abilityImport:ability, evsImport:evs, natureImport:nature, ivsImport:ivs, movesImport:moves});
      this.teamSprites.push("./assets/sprites/" + name.toLowerCase().replace(/['%:.]/g,'') + ".png");
    }


    this.importClicked = false;
    setTimeout(()=>{
      this.enterTeamView();
    },10);
  }

  exportShowdown() {
    this.exportText = "";
    this.teamCubbies = this.pkmnCubbies.toArray();
    for (var i = 0; i < this.teamCubbies.length; ++i) {
      this.exportText += this.teamCubbies[i].name;
      if (this.teamCubbies[i].item) {
        this.exportText += " @ " + this.teamCubbies[i].item + "\n";
      } else {
        this.exportText += "\n";
      }
      this.exportText += "Ability: " + this.teamCubbies[i].ability + "\n";
      this.exportText += "EVs: " + this.teamCubbies[i].ev[0] + " HP / " + this.teamCubbies[i].ev[1] + " Atk / " + this.teamCubbies[i].ev[2] + " Def / " + this.teamCubbies[i].ev[3] + " SpA / " + this.teamCubbies[i].ev[4] + " SpD / " + this.teamCubbies[i].ev[5] + " Spe\n";

      let natureSelected = this.teamCubbies[i].nature;
      let parenIndex = this.teamCubbies[i].nature.indexOf('(');
      if (parenIndex != -1) {
        natureSelected = this.teamCubbies[i].nature.substring(0, parenIndex-1);
      }
      this.exportText += natureSelected + " Nature\n";

      for (var j = 0; j < this.teamCubbies[i].moves.length; ++j) {
        if (this.teamCubbies[i].moves[j]) {
          this.exportText += "- " + this.teamCubbies[i].moves[j] + "\n";
        }
      }
      this.exportText += "\n";
    }

    this.exportRows = 9 * this.teamMembers.length + 1;
    this.exportClicked = true;
  }

  calcHammingDistance(searchTerm: string, possibleMatch: string) {
    var hd = 0;
    for (var i = 0; i < searchTerm.length && i < possibleMatch.length; ++i) {
      if (searchTerm.charAt(i) !== possibleMatch.charAt(i)) {
        hd++;
      }
    }

    return hd;
  }

  onUpdateSearchPokemon(event: Event) {
    this.tierpkmn = [];
    if ((<HTMLInputElement>event.target).value.length === 0) {
      this.tierpkmn = this.legalpkmn;

      for (var i = 0; i < this.tierpkmn.length; ++i) {
        if (this.tierKeys.indexOf(this.tierpkmn[i]) != -1) {
          this.sprites[i] = "";
        } else {
          this.sprites[i] = "./assets/sprites/" + this.tierpkmn[i].toLowerCase().replace(/['%:.]/g,'') + ".png";
        }
      }

      this.applyFilter();
      this.highlightPokemon();
      return;
    }

    this.searchInput = (<HTMLInputElement>event.target).value;
    //console.log(this.searchInput);

    if (this.tierpkmn.length > 0) {
      // remove hover class only if there was something to hover over before
      var prevHoverPkmn = document.getElementById('listedpkmn' + this.listedpkmnIndex);
      if (prevHoverPkmn !== null) {
        prevHoverPkmn.classList.remove('myHover');
      }
    }

    this.tierpkmn = [];
    // search by name
    for (var j = 0; j < this.legalpkmn.length; ++j) {
      if (this.tierKeys.indexOf(this.legalpkmn[j]) == -1) {
        if (this.legalpkmn[j].toLowerCase().includes(this.searchInput.toLowerCase()) || (this.searchInput.length > 3 && this.calcHammingDistance(this.searchInput.toLowerCase(), this.legalpkmn[j].toLowerCase()) < 2)) {
          this.tierpkmn.push(this.legalpkmn[j]);
        }
      }
    }

    var hdArray = {};
    for (var k = 0; k < this.tierpkmn.length; ++k) {
      var name = this.tierpkmn[k];
      var hd = this.calcHammingDistance(this.searchInput.toLowerCase(),this.tierpkmn[k].toLowerCase());
      hdArray[name] = hd;
    }
    console.log(this.tierpkmn.length);
    console.log(Object.keys(hdArray).length);

    // sort by hamming distance
    if (this.tierpkmn.length > 0) {
      console.log('noice');
      this.tierpkmn.sort(function(a,b) {
        return hdArray[a] - hdArray[b];
      });
    }

    console.log('no problem yet')

    for (var m = 0; m < this.tierpkmn.length; ++m) {
      if (this.tierKeys.indexOf(this.tierpkmn[m]) != -1) {
        this.sprites[m] = "";
      } else {
        this.sprites[m] = "./assets/sprites/" + this.tierpkmn[m].toLowerCase().replace(/['%:.]/g,'') + ".png";
      }
    }

    if (this.tierpkmn.length > 0) {
      // highlight only if there is something to highlight
      this.listedpkmnIndex = 0;
      this.highlightPokemon();
    }
  }

  checkBoxInsideDiv(index: number, prop: string) {
    if(prop === 'propBad') {
      event.stopPropagation();
    }

    (<HTMLInputElement>document.getElementById('tierFilterInput' + index)).checked = !(<HTMLInputElement>document.getElementById('tierFilterInput' + index)).checked;
    this.applyFilter();
  }

  setHoverFilter(index: number, filterSelected: string) {
    if (filterSelected === 'tier') {
      var clickableDiv = document.getElementById('tierFilterDiv' + index);
      clickableDiv.classList.add('filterHover');
    } else if (filterSelected === 'tierNo') {
      var clickableDiv = document.getElementById('tierFilterDiv' + index);
      clickableDiv.classList.remove('filterHover');
    }
  }

  //pseudocode for now

  applyFilter() {
    var roleSelected = (<HTMLInputElement>document.getElementById('roleFilterInput')).value;
    var pkmnSearchArray = [];
    // check if 'all tiers' selected
    if ((<HTMLInputElement>document.getElementById('tierFilterInput12')).checked) {
      pkmnSearchArray = ['All Pokemon'].concat(Object.keys(allPkmnData));
      pkmnSearchArray.splice(-1,1);
    } else {
      for (var h = 0; h < this.tierKeys.length; ++h) {
        var checkbox = (<HTMLInputElement>document.getElementById('tierFilterInput' + h));
        if (checkbox.checked) {
          if (roleSelected === 'Role') {
            pkmnSearchArray.push.apply(pkmnSearchArray, pkmnData[this.tierKeys[h]]);
          } else if (roleSelected !== 'Role' && h < this.tierKeys.length-2) {
            var endIndex = h+1;
            while (roleData[roleSelected].indexOf(this.tierKeys[endIndex]) == -1) {
              endIndex++;
              if (endIndex > this.tierKeys.length-3) {break;}
            }
            if (endIndex > this.tierKeys.length-3) {
              pkmnSearchArray.push.apply(pkmnSearchArray, roleData[roleSelected].slice(roleData[roleSelected].indexOf(this.tierKeys[h]), roleData[roleSelected].length));
            } else {
              pkmnSearchArray.push.apply(pkmnSearchArray, roleData[roleSelected].slice(roleData[roleSelected].indexOf(this.tierKeys[h]), roleData[roleSelected].indexOf(this.tierKeys[endIndex])));
            }
          }
          
        }
      }
    }

    if (pkmnSearchArray.length == 0) {
      if (roleSelected === 'Role') {
        pkmnSearchArray = this.legalpkmn;
      } else {
        pkmnSearchArray = roleData[roleSelected];
      }
      
    }

    var tempArray = [];
    var typeSelected = (<HTMLInputElement>document.getElementById('typeFilterInput')).value;
    if (typeSelected !== 'Type') {

      for (var i = 0; i < pkmnSearchArray.length; ++i) {
        if (this.tierKeys.indexOf(pkmnSearchArray[i]) != -1 || allPkmnData[pkmnSearchArray[i]]['types'].includes(typeSelected.toLowerCase())) {
          tempArray.push(pkmnSearchArray[i]);
        }
        if (this.tierKeys.indexOf(tempArray[tempArray.length-1]) != -1 && this.tierKeys.indexOf(tempArray[tempArray.length-2]) != -1) {
          tempArray.splice(tempArray.length-2, 1);
        }
        if (i == pkmnSearchArray.length-1 && this.tierKeys.indexOf(tempArray[tempArray.length-1]) != -1) {
          tempArray.splice(tempArray.length-1, 1);
        }
      }

      pkmnSearchArray = tempArray;
    }

    var abilitySelected = (<HTMLInputElement>document.getElementById('abilityFilterInput')).value;
    if (abilitySelected !== 'Ability') {
      tempArray = [];

      for (var m = 0; m < pkmnSearchArray.length; ++m) {
        if (this.tierKeys.indexOf(pkmnSearchArray[m]) != -1 || allPkmnData[pkmnSearchArray[m]]['abilities'].includes(abilitySelected)) {
          tempArray.push(pkmnSearchArray[m]);
        }
        if (this.tierKeys.indexOf(tempArray[tempArray.length-1]) != -1 && this.tierKeys.indexOf(tempArray[tempArray.length-2]) != -1) {
          tempArray.splice(tempArray.length-2, 1);
        }
        if (m == pkmnSearchArray.length-1 && this.tierKeys.indexOf(tempArray[tempArray.length-1]) != -1) {
          tempArray.splice(tempArray.length-1, 1);
        }
      }

      pkmnSearchArray = tempArray;
    }

    var moveSelected = (<HTMLInputElement>document.getElementById('moveFilterInput')).value;
    if (moveSelected !== 'Move') {
      tempArray = [];

      for (var n = 0; n < pkmnSearchArray.length; ++n) {
        if (this.tierKeys.indexOf(pkmnSearchArray[n]) != -1 || allPkmnData[pkmnSearchArray[n]]['moves'].includes(moveSelected)) {
          tempArray.push(pkmnSearchArray[n]);
        }
        if (this.tierKeys.indexOf(tempArray[tempArray.length-1]) != -1 && this.tierKeys.indexOf(tempArray[tempArray.length-2]) != -1) {
          tempArray.splice(tempArray.length-2, 1);
        }
        if (n == pkmnSearchArray.length-1 && this.tierKeys.indexOf(tempArray[tempArray.length-1]) != -1) {
          tempArray.splice(tempArray.length-1, 1);
        }
      }

      pkmnSearchArray = tempArray;
    }


    this.tierpkmn = pkmnSearchArray;
    this.sortPokeList();
  }

  resetFilters() {
    for (var i = 0; i < this.tierKeys.length+1; ++i) {
      (<HTMLInputElement>document.getElementById('tierFilterInput' + i)).checked = false;
    }
    (<HTMLInputElement>document.getElementById('typeFilterInput')).value = "Type";
    (<HTMLInputElement>document.getElementById('abilityFilterInput')).value = "Ability";
    (<HTMLInputElement>document.getElementById('moveFilterInput')).value = "Move";
    (<HTMLInputElement>document.getElementById('roleFilterInput')).value = "Role";
    this.applyFilter();
  }

}

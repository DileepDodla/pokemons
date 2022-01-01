import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pokemons } from 'src/app/models/pokemons.model';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent {

  // MatPaginator Inputs
  length = 100;
  pageSize = 8;
  pageSizeOptions: number[] = [8, 16, 40, 80, 160];

  pokemons: any = [];
  maxStats: any = {
    hp: 255,
    attack: 190,
    defense: 250,
    special_attack: 194,
    special_defense: 250,
    speed: 200
  };

  constructor(private pokeApi$: PokeApiService) {
    this.loadPokeData(this.pageSize);
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.pokemons.length = 0;
    this.pageSize = event.pageSize;
    this.loadPokeData(event.pageSize, event.pageIndex * event.pageSize);
    return event;
  }

  loadPokeData(limit: number, offset?: number): void {
    this.pokeApi$.getPokemons(limit, offset).subscribe(
      (data: Pokemons) => {
        this.length = data.count;
        for (var pokemon of data.results) {
          this.pokeApi$.getPokemon(pokemon.url).subscribe(
            (pokeData) => {
              this.pokemons[(pokeData.id - 1) % this.pageSize] = pokeData;
            },
            err => {
              console.log(err);
            }
          );
        }
        // console.log(this.pokemons);
      },
      err => {
        console.log(err);
      }
    )
  }

  getTypesOfPokemon(pokemon: any) {
    return pokemon?.types.map((a: any) => a.type.name);
  }

  convertHeight(heightInMeters: any, event: MouseEvent): void {
    let ele: HTMLButtonElement = event.target as HTMLButtonElement
    if (ele.innerText.includes('m')) {
      let inFeet: number = heightInMeters / 0.3048;
      let ft: number = Math.trunc(inFeet)
      let inch: number = Math.round((inFeet - Math.trunc(inFeet)) / 0.08333)
      ele.innerText = `${ft}'${inch}" ft`;
    }
    else {
      ele.innerText = `${heightInMeters} m`;
    }
  }

  convertWeight(weightInKgs: any, event: MouseEvent): void {
    let ele: HTMLButtonElement = event.target as HTMLButtonElement
    if (ele.innerText.includes('kgs')) {
      let weightInLbs: number = weightInKgs * 2.204623;
      ele.innerText = `${weightInLbs.toFixed(1)} lbs`;
    }
    else {
      ele.innerText = `${weightInKgs} kgs`;
    }
  }

  rotatePokeBall(event: MouseEvent) {
    let img: HTMLImageElement = event.target as HTMLImageElement;
    if (img.classList.contains("poke-ball-rotate")) {
      img.classList.remove("poke-ball-rotate");
    }
    else {
      img.classList.add("poke-ball-rotate")
    }
  }

  getPokemonImage(pokemonSprites: any) {
    return pokemonSprites?.other.dream_world.front_default || pokemonSprites?.other["official-artwork"].front_default || pokemonSprites?.front_default;
  }
}

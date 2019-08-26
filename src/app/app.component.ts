import { Component } from '@angular/core';
import { rules } from 'src/app/ds.rules'

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public allow_dup = false;
  public use_ds_rules = false;

  
  private _results : string[];
  public get results() : string[] {
    return this._results;
  }
  public set results(v : string[]) {
    this._results = v;
  }

  private pick_4() :string[] {
    const keys = Object.keys(rules);
    const rand = () => getRandomIntInclusive(0, 13)
    if (this.allow_dup) {
      return [keys[rand()], keys[rand()], keys[rand()], keys[rand()]]
    } else {
      return keys.sort(_ => 0.5 - Math.random()).slice(0, 4)
    }
  }

  /**
   * roll
   */
  public roll() {
    if(this.use_ds_rules) {
      this.results = this.pick_4().map(k => `${k}: ${rules[k]}`)
    } else {
      this.results = this.pick_4()
    }
  }
}

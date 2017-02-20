import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'my-app',
  template: `
    <h1>Firebase Spammer</h1>
    <div class="form-group">
      <label>Mensagens por segundo: </label>
      <input type="number" [(ngModel)]="mensagensPorSegundo" />
    </div>
    <button type="button" (click)="onButtonClicked()">{{executando ? 'Parar': 'Iniciar'}}</button>
  
  `
})
export class AppComponent {

  public mensagensPorSegundo: number = 1;
  public executando: boolean = false;

  private execucaoHandler = null;

  constructor(private af: AngularFire) {
    // af.database.list(`test`, {
    //   query: {
    //     limitToFirst: this.limit
    //   }
    // }).subscribe((val) => console.log(val));

    // this.limit.next(1);

    // setTimeout(() => {
    //   this.limit.next(2);
    // }, 2000);

    // setTimeout(() => {
    //   this.limit.next(3);
    // }, 4000);

    // let random = Math.floor(Math.random() * 10);
    // setTimeout(() => {
    //   af.database.object(`test/i0`).set(random);
    // }, 6000);
  }

  onButtonClicked() {
    if (this.executando === false) {
      this.iniciar();
    } else {
      this.parar();
    }
  }

  iniciar() {
    this.executando = true;
    this.execucaoHandler = setInterval(() => {
      this.af.database.object('mensagens').$ref.push({
        id: null,
        mensagem: 'Strees test!'
      });
    }, 1000 / this.mensagensPorSegundo);
  }

  parar() {
    this.executando = false;
    clearInterval(this.execucaoHandler);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
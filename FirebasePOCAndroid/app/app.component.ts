import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "./firebase.service";
import { Observable } from "rxjs";
import { Mensagem } from "./models/mensagem.model";

@Component({
  selector: "my-app",
  templateUrl: "app.html"
})
export class AppComponent implements OnInit {
  public mensagem: string = "";

  constructor(private _firebaseService: FirebaseService){ }

  ngOnInit() {
  }

  enviarMensagem(): void {
    this._firebaseService.enviarMensagem(new Mensagem(null, this.mensagem));
    this.mensagem = "";
  }


}

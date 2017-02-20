import { Injectable, NgZone } from "@angular/core";
import { Mensagem } from "./models/mensagem.model";
import firebase = require("nativescript-plugin-firebase");
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';

@Injectable()
export class FirebaseService {
    constructor(
        private ngZone: NgZone
    ) { }

    enviarMensagem(mensagem: Mensagem) {
        return firebase.push(
            Mensagem.FIREBASE_PATH, 
            mensagem
        ).then(
            function (result: any) {
                return 'Mensagem enviada!';
            },
            function (errorMessage: any) {
                console.log(errorMessage);
            });
    }

    handleErrors(error) {
        console.log(JSON.stringify(error));
        return Promise.reject(error.message);
    }
}
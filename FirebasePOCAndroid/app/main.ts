import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
import { AppConfig } from "./core/app.config"

import firebase = require("nativescript-plugin-firebase");

firebase.init({
  persist: false,
  storageBucket: AppConfig.firebaseApiUrl
}).then(
  function (instance) {
    console.log("firebase.init done");
  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
  );

platformNativeScriptDynamic().bootstrapModule(AppModule);

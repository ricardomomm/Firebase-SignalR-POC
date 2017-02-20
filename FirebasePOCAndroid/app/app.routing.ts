import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppComponent } from "./app.component";

const appRoutes = [
  { path: "", component: AppComponent }
];

@NgModule({
  imports: [ NativeScriptRouterModule.forRoot(appRoutes) ],
  exports: [ NativeScriptRouterModule ]
})
export class AppRoutingModule {}


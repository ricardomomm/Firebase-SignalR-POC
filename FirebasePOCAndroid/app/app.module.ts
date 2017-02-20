import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { FirebaseService } from "./firebase.service";
import { AppComponent } from "./app.component";

@NgModule({
  imports: [
      NativeScriptFormsModule,
      NativeScriptModule,
      NativeScriptHttpModule
  ],
  providers: [ FirebaseService ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}


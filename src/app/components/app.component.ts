import { HttpClient } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Brand } from "src/app/interfaces/brand";
import { ModalComponent } from "./modal/modal.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  brands: Brand[] = [];
  canPlay: boolean = true;
  squareColour: string = 'white';

  chosenCompany: Brand | undefined;
  guessedName: string = '';

  
  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.http.get<Brand[]>('http://brandle-api.onrender.com/').subscribe(data => {
      this.brands = data.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  

  startGame() {
    this.canPlay = false;
    this.chosenCompany = this.brands[Math.floor(Math.random() * this.brands.length)];

    this.squareColour = this.chosenCompany.logoHex;

  }

  guess() {
    if (this.guessedName.toLowerCase() == this.chosenCompany?.brandId.toLowerCase()) {
      this.dialog.open(ModalComponent, {
        width: '250px',
        data: "You guessed correctly!",
      });
    } else {
      this.dialog.open(ModalComponent, {
        width: '250px',
        data: "You guessed incorrectly! - The correct answer was " + this.chosenCompany?.name,
      });
    }

    this.canPlay = true;
  }
}

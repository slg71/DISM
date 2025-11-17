import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { timeOutline } from 'ionicons/icons';
import { Api } from '../services/api';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, IonLabel, ExploreContainerComponent]
})
export class Tab3Page implements OnInit{
  fichajes: any = [];

  constructor(private api: Api) {
    addIcons({ timeOutline });//codigo pa registrar iconos (ejer 1)
  }

  ngOnInit() {
    this.cargarFichajes();
  }

/*============FUNCIONES===========*/

//lista de fichajes
  cargarFichajes() {
    this.api.getFichajesAll().subscribe(
      (data) => {
        this.fichajes = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}

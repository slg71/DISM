import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { timeOutline } from 'ionicons/icons';
import { Api } from '../services/api';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, IonLabel, ExploreContainerComponent]
})
export class Tab2Page {
  trabajos: any = [];

  constructor(private api: Api) {
    addIcons({ timeOutline });//codigo pa registrar iconos (ejer 1)
  }

  ionViewWillEnter() {
    this.cargarTrabajos();
  }

/*============FUNCIONES===========*/

//lista de fichajes
  cargarTrabajos() {
    this.api.getTrabajos().subscribe(
      (data) => {
        this.trabajos = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Api } from '../services/api';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Fichaje } from '../models/fichaje';
import { NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { create, trash } from 'ionicons/icons';
import * as Leaflet from 'leaflet';
import { icon, Marker } from 'leaflet';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [RouterLink, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, IonLabel, ExploreContainerComponent]
})
export class Tab3Page {
  fichajes: any = [];
  map?: Leaflet.Map;

  constructor(
    public api: Api,
    private nav: NavController
  ) {
    addIcons({ create, trash });
  }

 ionViewWillEnter() {
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

//mostrará un mapa con un punto indicando la dirección donde se ha fichado.
  mapa(item: Fichaje) {
    this.nav.navigateForward('/mapa', {
      state: {
        latitud: item.GeolocalizacionLatitud,
        longitud: item.GeolocalizacionLongitud
      }
    });
  }
}

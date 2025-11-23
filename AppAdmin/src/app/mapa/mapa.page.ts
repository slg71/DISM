import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Api } from '../services/api';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Fichaje } from '../models/fichaje';
import { NavController } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import { icon, Marker } from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: true,
  imports: [RouterLink, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, IonLabel, ExploreContainerComponent]
})
export class MapaPage {
  fichajes: any = [];
  map?: Leaflet.Map;
  lat: number = 0;
  long: number = 0;

  constructor(
    public api: Api,
    private nav: NavController,
    private router: Router
  ) {
  }

  ionViewDidEnter() {
    // Recuperar datos pasados por state
    const state = history.state;
    if (state && state.latitud && state.longitud) {
      this.lat = state.latitud;
      this.long = state.longitud;
    }
    this.mapa();
  }

//mostrará un mapa con un punto indicando la dirección donde se ha fichado.
  mapa() {
    // Si no hay latitud O no hay longitud, paramos aquí.
     if (this.lat === undefined || this.long === undefined) {
       console.error('Faltan coordenadas para este fichaje');
       return;
    }
    if (this.map) {
      this.map.remove(); //resetear
    }

    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    Marker.prototype.options.icon = iconDefault;
    this.map = Leaflet.map('mapId').setView([this.lat, this.long], 4);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'DISM © Ionic Leaflet',
    }).addTo(this.map);
    Leaflet.marker([this.lat, this.long]).addTo(this.map).bindPopup('Ubicación de Fichaje').openPopup();
  }
}

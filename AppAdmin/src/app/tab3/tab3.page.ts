import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonSearchbar, IonInput, IonSegment } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Api } from '../services/api';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Fichaje } from '../models/fichaje';
import { NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { create, trash } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [RouterLink, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, IonLabel, ExploreContainerComponent, IonSearchbar, FormsModule, IonInput, IonSegment]
})
export class Tab3Page {
  fichajes: any = [];//fichajes en el html
  todos: any = [];//fichajes en el bd
  modo: string = 'usuario';//usuario o fecha
  filtroFechaIni: string = '';
  filtroFechaFin: string = '';

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
        this.todos = data;
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

//cambia el modo y resetea la lista
  cambiarModo(nuevoModo: string) {
    this.modo = nuevoModo;
    this.fichajes = this.todos; //reset
    this.filtroFechaIni = '';
    this.filtroFechaFin = '';
  }

//mostrará un listado de fichajes, permitiendo filtrar por fechas y usuarios (searchbar):
  buscarUsuario(event: any) {
    const texto = event.target.value;
    if (texto && texto.trim() !== '') {
      this.fichajes = this.todos.filter((item: any) => {
        return (item.IdUsuario + '').includes(texto);
      });
    } else {
      this.fichajes = this.todos;
    }
  }

  buscarPorFecha() {
    // Si no hay fechas seleccionadas, mostramos todo
    if (!this.filtroFechaIni && !this.filtroFechaFin) {
      this.fichajes = this.todos;
      return;
    }

    this.fichajes = this.todos.filter((item: any) => {
      // Convertimos la fecha del fichaje a objeto Date
      const fechaFichaje = new Date(item.FechaHoraEntrada).getTime();

      let cumpleInicio = true;
      let cumpleFin = true;

      // Si el usuario puso fecha inicio
      if (this.filtroFechaIni) {
        const fIni = new Date(this.filtroFechaIni).getTime();
        cumpleInicio = fechaFichaje >= fIni;
      }

      // Si el usuario puso fecha fin
      if (this.filtroFechaFin) {
        // Añadimos un día o ajustamos para incluir el final del día seleccionado
        const fFin = new Date(this.filtroFechaFin).setHours(23, 59, 59);
        cumpleFin = fechaFichaje <= fFin;
      }

      return cumpleInicio && cumpleFin;
    });
  }
}

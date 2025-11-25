import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Api } from '../services/api';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Trabajo } from '../models/trabajo';
import { NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { create, trash } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [RouterLink, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, IonLabel, ExploreContainerComponent]
})
export class Tab2Page {
  trabajos: any = [];

  constructor(
    public api: Api,
    private nav: NavController
  ) {
    addIcons({ create, trash });
  }

  ionViewWillEnter() {
    this.cargarTrabajos();
  }

/*============FUNCIONES===========*/

//lista de usuarios
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

//botones
  deleteTrabajo(item: Trabajo) {
    // 1. Comprobamos si el ID existe (no es null ni undefined)
    if (item.IdTrabajo !== undefined && item.IdTrabajo !== null) {
      if (confirm('¿Seguro que desea borrar al trabajo ' + item.Nombre + '?'))
      // 2. Si existe, llamamos al API
      this.api.deleteTrabajo(item.IdTrabajo).subscribe({
        next: () => this.cargarTrabajos(),
        error: (err) => { console.error('Error al eliminar trabajo: ', err);}
      });
    } else {
      console.error('No se puede eliminar el trabajo: IdTrabajo no está definido.');
    }
  }

  editTrabajo(item: Trabajo) {
    this.nav.navigateForward('editar-t', { state: { item }});
  }
}

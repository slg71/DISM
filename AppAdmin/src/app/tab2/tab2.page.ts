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
  // deleteTrabajo(item: Trabajo) {
  //   // 1. Comprobamos si el ID existe (no es null ni undefined)
  //   if (item.IdTrabajo !== undefined && item.IdTrabajo !== null) {
  //     if (confirm('¿Seguro que desea borrar al trabajo ' + item.Nombre + '?'))
  //     // 2. Si existe, llamamos al API
  //     this.api.deleteTrabajo(item.IdTrabajo).subscribe({
  //       next: () => this.cargarTrabajos(),
  //       error: (err) => { console.error('Error al eliminar trabajo: ', err);}
  //     });
  //   } else {
  //     console.error('No se puede eliminar el trabajo: IdTrabajo no está definido.');
  //   }
  // }

//BORRAR
  deleteTrabajo(item: Trabajo) {
    if (item.IdTrabajo === undefined || item.IdTrabajo === null) return;

    if (confirm('¿Seguro que desea borrar a ' + item.Nombre + '?')) {

      //recoger todos los fichajes pa recorrerlo
      this.api.getFichajesAll().subscribe(
        (todosLosFichajes: any) => {

          //los que son de ESTE trabajo
          const listaFichajesDelTrabajo = todosLosFichajes.filter((f: any) => f.IdTrabajo === item.IdTrabajo);

          //eliminamos en cascada sobre la lista de fichajes con el usuario
          this.eliminarFichajesEnCascada(listaFichajesDelTrabajo, item.IdTrabajo!);
        },
        (error) => {
          console.error("Error al pedir fichajes", error);
        }
      );
    }
  }

  //Recursividad
  // Esta función borra uno, espera, y se llama a sí misma para borrar el siguiente
  eliminarFichajesEnCascada(listaFichajes: any[], idTrabajo: number) {

    // CASO BASE: Si la lista está vacía, ya no hay hijos -> borrar padre
    if (listaFichajes.length === 0) {
      this.borrarTrabajoFinal(idTrabajo);
      return;
    }

    // Si hay fichajes, cogemos el primero de la lista
    const fichajeABorrar = listaFichajes[0];

    // Lo borramos
    this.api.deleteFichaje(fichajeABorrar.IdFichaje).subscribe(
      () => {
        //Quitamos el fichaje borrado de la lista (el primero)
        listaFichajes.shift();

        //Nos volvemos a llamar con el resto de la lista
        this.eliminarFichajesEnCascada(listaFichajes, idTrabajo);
      },
      (error) => {
        console.error("Error borrando un fichaje individual", error);
        // Si falla, paramos
        alert("Ocurrió un error borrando los fichajes.");
      }
    );
  }

  // Borrado final del trabajo
  borrarTrabajoFinal(id: number) {
    this.api.deleteTrabajo(id).subscribe(
      () => {
        console.log("Trabajo eliminado y limpio.");
        this.cargarTrabajos(); // Refrescamos la pantalla
      },
      (error) => {
        console.error("Error final:", error);
      }
    );
  }

  editTrabajo(item: Trabajo) {
    this.nav.navigateForward('editar-t', { state: { item }});
  }
}

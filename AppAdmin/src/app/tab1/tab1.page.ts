import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonAlert } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Api } from '../services/api';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Usuario } from '../models/usuario';
import { NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { create, trash } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [RouterLink, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, IonLabel, ExploreContainerComponent, IonAlert]
})
export class Tab1Page {
  usuarios: any = [];

  constructor(
    public api: Api,
    private nav: NavController
  ) {
    addIcons({ create, trash });
  }

  ionViewWillEnter() {
    this.cargarUsuarios();
  }

/*============FUNCIONES===========*/

//lista de usuarios
  cargarUsuarios() {
    this.api.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

//botones
  // deleteUsuario(item: Usuario) {
  //   //Comprobamos si el ID existe (no es null ni undefined)
  //   if (item.IdUsuario !== undefined && item.IdUsuario !== null) {
  //     if (confirm('¿Seguro que desea borrar al usuario ' + item.Nombre + '?')) {
  //       //Si existe, llamamos al API
  //       this.api.deleteUsuario(item.IdUsuario).subscribe({
  //         next: () => this.cargarUsuarios(),
  //         error: (err) => { console.error('Error al eliminar usuario: ', err);}
  //       });
  //     }
  //   } else {
  //     console.error('No se puede eliminar el usuario: IdUsuario no está definido.');
  //   }
  // }

//BORRAR
  deleteUsuario(item: Usuario) {
    if (item.IdUsuario === undefined || item.IdUsuario === null) return;

    if (confirm('¿Seguro que desea borrar a ' + item.Nombre + '?')) {

      //recoger todos los fichajes pa recorrerlo
      this.api.getFichajesAll().subscribe(
        (todosLosFichajes: any) => {

          //los que son de ESTE usuario
          const listaFichajesDelUsuario = todosLosFichajes.filter((f: any) => f.IdUsuario === item.IdUsuario);

          //eliminamos en cascada sobre la lista de fichajes con el usuario
          this.eliminarFichajesEnCascada(listaFichajesDelUsuario, item.IdUsuario!);
        },
        (error) => {
          console.error("Error al pedir fichajes", error);
        }
      );
    }
  }

  //Recursividad
  //borra uno, espera, y se llama a sí misma para borrar el siguiente
  eliminarFichajesEnCascada(listaFichajes: any[], idUsuario: number) {

    // CASO BASE: Si la lista está vacía, ya no hay hijos -> borrar padre
    if (listaFichajes.length === 0) {
      this.borrarUsuarioFinal(idUsuario);
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
        this.eliminarFichajesEnCascada(listaFichajes, idUsuario);
      },
      (error) => {
        console.error("Error borrando un fichaje individual", error);
        // Si falla, paramos
        alert("Ocurrió un error borrando los fichajes.");
      }
    );
  }

  // Borrado final del usuario
  borrarUsuarioFinal(id: number) {
    this.api.deleteUsuario(id).subscribe(
      () => {
        console.log("Usuario eliminado y limpio.");
        this.cargarUsuarios(); // Refrescamos la pantalla
      },
      (error) => {
        console.error("Error final:", error);
      }
    );
  }

  editUsuario(item: Usuario) {
    this.nav.navigateForward('editar', { state: { item }});
  }
}

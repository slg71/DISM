import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { timeOutline } from 'ionicons/icons';
import { Api } from '../services/api';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Usuario } from '../models/usuario';
import { NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [RouterLink, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, IonLabel, ExploreContainerComponent]
})
export class Tab1Page implements OnInit{
  usuarios: any = [];

  constructor(
    public api: Api,
    private nav: NavController
  ) {
    addIcons({ timeOutline });//codigo pa registrar iconos (ejer 1)
  }

  ngOnInit() {
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
  deleteUsuario(item: Usuario) {
    // 1. Comprobamos si el ID existe (no es null ni undefined)
    if (item.IdUsuario !== undefined && item.IdUsuario !== null) {
      // 2. Si existe, llamamos al API
      this.api.deleteUsuario(item.IdUsuario).subscribe({
        next: () => this.cargarUsuarios(),
        error: (err) => { console.error('Error al eliminar usuario: ', err);}
      });
    } else {
      console.error('No se puede eliminar el usuario: IdUsuario no está definido.');
    }
  }

  editUsuario(item: Usuario) {
    this.nav.navigateForward('editar', { state: { item }});
  }
}

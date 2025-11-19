import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { Usuario } from '../models/usuario';
import { Api } from '../services/api';
import { addIcons } from 'ionicons';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { create, trash } from 'ionicons/icons';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class EditarPage {
  id: number = 0;
  UsuarioData: Usuario = {
    Nombre: '',
    Usuario: '',
    Clave: ''
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: Api
  ) {
    addIcons({ create, trash });
  }

  ionViewWillEnter() {
    const navData = history.state as { item: Usuario };
    if (navData && navData.item) {
      this.UsuarioData = navData.item;
    }
  }

  putUsuario() {
    this.apiService.updateUsuario(this.UsuarioData).subscribe({
      next: () => {
        this.router.navigate(['/tabs/tab1']);
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
      }
    });
  }
}

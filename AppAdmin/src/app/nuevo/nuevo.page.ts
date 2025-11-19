import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { Usuario } from '../models/usuario';
import { Api } from '../services/api';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.page.html',
  styleUrls: ['./nuevo.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class NuevoPage {
  UsuarioData: Usuario = {
    Nombre: '',
    Usuario: '',
    Clave: ''
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: Api
  ) { }

  ionViewWillEnter() {
  }

  newUsuario() {
    this.apiService.createUsuario(this.UsuarioData).subscribe({
      next: () => {
        this.router.navigate(['/tabs/tab1']);
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
      }
    });
  }
}

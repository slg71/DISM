import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { Trabajo } from '../models/trabajo';
import { Api } from '../services/api';
import { addIcons } from 'ionicons';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { create, trash } from 'ionicons/icons';

@Component({
  selector: 'app-editar-t',
  templateUrl: './editar-t.page.html',
  styleUrls: ['./editar-t.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class EditarTPage {
  id: number = 0;
  TrabajoData: Trabajo = {
    Nombre: ''
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: Api
  ) {
    addIcons({ create, trash });
  }

  ionViewWillEnter() {
    const navData = history.state as { item: Trabajo };
    if (navData && navData.item) {
      this.TrabajoData = navData.item;
    }
  }

  putTrabajo() {
    this.apiService.updateTrabajo(this.TrabajoData).subscribe({
      next: () => {
        this.router.navigate(['/tabs/tab2']);
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { Trabajo } from '../models/trabajo';
import { Api } from '../services/api';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nuevo-t',
  templateUrl: './nuevo-t.page.html',
  styleUrls: ['./nuevo-t.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class NuevoTPage {
  TrabajoData: Trabajo = {
    Nombre: ''
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: Api
  ) { }

  ionViewWillEnter() {
  }

  newTrabajo() {
    this.apiService.createTrabajo(this.TrabajoData).subscribe({
      next: () => {
        this.router.navigate(['/tabs/tab2']);
      },
      error: (err) => {
        console.error('Error al crear trabajo:', err);
      }
    });
  }
}

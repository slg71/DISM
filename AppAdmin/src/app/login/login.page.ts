import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { Usuario } from '../models/usuario';
import { Api } from '../services/api';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class LoginPage {
  UsuarioData: Usuario = {
    Usuario: '',
    Clave: ''
  };

  usuarios: any = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: Api
  ) { }

  ionViewWillEnter() {
    this.limpiar();
  }

  login() {
    this.apiService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        //buscar en el array por el usuario
        const usuarioEncontrado = this.usuarios.find((u: any) =>
          u.Usuario === this.UsuarioData.Usuario && //mismo usuario
          u.Clave === this.UsuarioData.Clave// misma contraseña
        );
        //si lo encuentro voy al primer tab
        if (usuarioEncontrado) {
          console.log('Login Correcto', usuarioEncontrado);
          this.router.navigate(['/tabs/tab1']);
        } else {//si no existe o no es admin, error
          console.log('Usuario o clave incorrectos');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  limpiar() {
    this.UsuarioData = {
      Usuario: '',
      Clave: ''
    };
  }

}

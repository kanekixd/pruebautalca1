import { Component, OnInit } from '@angular/core';
import { Usuario, EquipoService } from 'src/app/services/equipo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  public usuario!: Usuario;
  
  public esadmin: boolean;

  constructor(private EquipoService:EquipoService, private router:Router, private activeRoute:ActivatedRoute) { 
    this.esadmin=localStorage.getItem('rol')== 'admin' ? true: false;
  }

  ngOnInit(): void {
    const identrada = <string>this.activeRoute.snapshot.params['id'];
    console.log('id entrada: ' +identrada);

    if(identrada){
      this.EquipoService.getunusuario(identrada).subscribe(
        res=>{
          this.usuario = res[0];
          console.log(res);
        },
        err=>console.log(err)
      );
    }
  }
  
  
  modificar(){
    this.EquipoService.editusuario(this.usuario.idusuarios, this.usuario).subscribe(
      res=>{
        console.log(res);
      },
      err=>console.log(err)
    );
    this.router.navigate(['/inicio'])   
  }
}


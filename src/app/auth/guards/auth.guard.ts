import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
// Es bueno que canActivate se complemente con canLoad
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate restringe que se pueda activar la ruta
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.auth.id) {
    //   return true;
    // }

    // console.log('Bloqueado por el AuthGuard - CanActivate');

    // return false;
    return this.authService.verificaAutenticacion().pipe(
      // tap sirve para evaluar el valor que ha llegado
      tap((estaAutenticado) => {
        if (!estaAutenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }

  // canLoad sólo restringe que se pueda cargar el módulo. Si estoy trabajando con Lazy load, hay que usar canLoad, si no, con el canActivate es suficiente
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificaAutenticacion().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
    // if (this.authService.auth.id) {
    //   return true;
    // }

    // console.log('Bloqueado por el AuthGuard - CanLoad');

    // return false;
  }
}

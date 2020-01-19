import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, observable, Subscription } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  template: `
    <p>
      rxjs works!
    </p>
  `,
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy  {
  
  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
    // .pipe(
    //   retry(2)
    // )
    .subscribe(
      numero => console.log('Pr', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador')
    );
  }



  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('la pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable <any> {

    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador ++;

        const salida = {
          valor: contador
        };
        observer.next( salida );

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }
        // if ( contador === 2 ) {
        //   clearInterval( intervalo );
        //   observer.error('Auxilio');
        // }

      }, 1000);
    }).pipe(
      map( resp => {
        return resp.valor;
      })
    )
    ;
    
  }

}

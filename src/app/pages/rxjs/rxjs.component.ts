import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  template: `
    <p>
      rxjs works!
    </p>
  `,
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {

    this.regresaObservable()
    .pipe(
      retry(2)
    )
    .subscribe(
      numero => console.log('Pr', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador')
    );
  }



  ngOnInit() {
  }

  regresaObservable(): Observable <number> {

    return new Observable( (observer: Subscriber<number>) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador ++;
        observer.next( contador );

        if ( contador === 3 ) {
          clearInterval( intervalo );
          observer.complete();
        }
        if ( contador === 2 ) {
          clearInterval( intervalo );
          observer.error('Auxilio');
        }

      }, 1000);
    });
    
  }

}

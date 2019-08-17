import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {
      /**
      const interval$ = interval(3000); // Declaring a definition for stream of values (Observable)
                                        // This Observable emits a sequence of numbers

      interval$.subscribe( val => console.log('stream 1 => ' + val));  // With subscribe() we're creating a
                                                                      // stream of values
      interval$.subscribe( val => console.log('stream 2 => ' + val));
       */

      const interval$ = timer(3000, 1000);

      const sub = interval$.subscribe( val => console.log('stream 1 => ' + val));

      // Unsubscribe from interval stream after 5 seconds
      setTimeout(() => {
        console.log('Unsubscribing from interval stream...');
        sub.unsubscribe();
      }, 10000);

      const click$ = fromEvent(document, 'click'); // Defining an stream of click events

      click$.subscribe(
        evt => console.log(evt),
        err => console.log(err),
        () => console.log('Completed'));
    }
}







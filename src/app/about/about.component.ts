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

      // An HTTP stream definition
      const http$ = Observable.create( (observer: { next: () => void; complete: () => void; error: (arg0: any) => void; }) => {
        fetch('/api/courses')
          .then( response => {
            return response.json();
          })
          .then( body => {
            observer.next(body);
            observer.complete();
          })
          .catch( err => {
            observer.error(err);
          });
      });

      http$.subscribe(
        courses => console.log(courses),
        noop,
        () => console.log('Completed')
      );
    }
}







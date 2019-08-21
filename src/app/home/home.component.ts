import {Component, OnInit} from '@angular/core';
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
import {delayWhen, map, filter, take, timeout, tap, shareReplay} from 'rxjs/operators';
import {createHttpObservable} from '@app/common/util';
import { Course } from '@app/model/course';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // Streams definition data
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {
      // An HTTP stream definition
      const http$ = createHttpObservable('/api/courses');

      const courses$: Observable<Course []> = http$
          .pipe(
            tap(() => console.log('HTTP request executed')),
            map(res => Object.values(res['payload'])),
            shareReplay()
          );

      this.beginnerCourses$ = courses$
            .pipe(
              map(courses => courses
                .filter(course => course.category === 'BEGINNER'))
            );

      this.advancedCourses$ = courses$
          .pipe(
            map(courses => courses
              .filter(course => course.category === 'ADVANCED'))
          );
    }
}

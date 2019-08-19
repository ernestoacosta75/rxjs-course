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
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '@app/common/util';
import { Course } from '@app/model/course';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses: Course [];
    advancedCourses: Course [];

    constructor() {

    }

    ngOnInit() {
      // An HTTP stream definition
      const http$ = createHttpObservable('/api/courses');

      const courses$ = http$
          .pipe(
            map(res => Object.values(res['payload']))
          );

      courses$.subscribe(
        courses => {
          this.beginnerCourses = courses
              .filter(course => course.category === 'BEGINNER');

              this.advancedCourses = courses
              .filter(course => course.category === 'ADVANCED');
        },
        noop,
        () => console.log('Completed')
      );
    }
}

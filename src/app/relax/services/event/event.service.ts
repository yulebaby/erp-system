import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {

  private _eventBus = new Subject<BroadcastEvent>();

  constructor() { }

  emit(key: any, data?: any) {
    this._eventBus.next({ key, data });
  }

  on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable()
      .filter(event => event.key === key)
      .map(event => <T>event.data);
  }

}


interface BroadcastEvent {
  key: any;
  data?: any;
}
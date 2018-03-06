import { HttpService } from './relax/services/http/http.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  
  constructor(
    private http: HttpService
  ) {
    http.post('/auth/login?username=t__bby&password=q123456')
  }
}

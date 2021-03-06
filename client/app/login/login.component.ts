import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

import {SessionService} from '../common/session.service';

const template = require('./login.component.html');
const styles   = require('./login.component.scss');

@Component({
  selector: 'app-login',
  template: template,
  styles: [styles],
  providers: [SessionService]
})
export class LoginComponent {
  public loginMsg;
  public loading;

  constructor(
      private router: Router, private http: Http,
      private sessionService: SessionService) {}

  login(event, email, password) {
    this.loading = true;
    event.preventDefault();

    let data = JSON.stringify({email, password});
    this.sessionService.login(data).subscribe((res) => {
      console.log('login: ' + JSON.stringify(res));
      this.loginMsg = (res.msg);
      if (res.success) {
        this.router.navigate(['usersInvestments']);
        window.location.reload();
      }
      this.loading = false;
    });
  }

  register(event) {
    event.preventDefault();
    this.router.navigate(['register']);
  }
}

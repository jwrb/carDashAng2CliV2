import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {headers} from '../common/headers';
import {Purchase} from '../Models/purchase';
import {User} from '../Models/user';
import {AppConfig} from '../common/app.config';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
  constructor(private http: Http) {}

  getPurchases(): Promise<Purchase[]> {
    return this.http.get(`${AppConfig.server}/api/v1/purchase/`)
        .toPromise()
        .then(response => {
          return response.json().purchases as Purchase[];

        })
        .catch(this.handleError);
  };

  getUsers(): Promise<User[]> {
    let options = new RequestOptions({headers: headers});
    return this.http.get(`${AppConfig.server}/api/v1/user/`, options)
        .toPromise()
        .then(response => {
          return response.json().users as User[];

        })
        .catch(this.handleError);
  };

  addUserPurchase(email: string, purchase: Purchase): Promise<Purchase> {
    let options = new RequestOptions({headers: headers});
    return this.http
        .post(`${AppConfig.server}/api/v1/user/`, JSON.stringify({email: email, purchase: purchase}),
            options)
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  };

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

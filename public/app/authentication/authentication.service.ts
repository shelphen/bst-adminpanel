import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response,Headers, RequestOptions  } from '@angular/http';
import { IUser } from './user';

 
export class User {
  constructor(
    public email: string,
    public password: string) { }
}
 
var users = [
  new User('admin@admin.com','adm9'),
  new User('user1@gmail.com','a23')
];
 
@Injectable()
export class AuthenticationService {
  private authenticatedUser:any;
  private _loginUrl = 'http://api.local-angular/index.php/api/authenticate';
  constructor(
    private _router: Router,private _http: Http)
  {}
    
    logout() {
      localStorage.removeItem("user");
      this._router.navigate(['Login']);
    }
   
    login(user: any) {
      
      let body = JSON.stringify(user);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
       /*Initializing HTTP request*/
       console.log(body);
      this._http.post(this._loginUrl, body, options).subscribe(res=> this.authenticatedUser = res );
      console.log(this.authenticatedUser);

      if (this.authenticatedUser){
        localStorage.setItem("user", this.authenticatedUser);
        this._router.navigate(['/welcome']);
       return true;
      }
      return false;
   
    }
   
     checkCredentials(){
      if (localStorage.getItem("user") === null){
          console.log('navigating to login');
          this._router.navigate(['/login']);
      }
    } 

    private handleError (error: any) {
      // In a real world app, we might use a remote logging infrastructure
      // We'd also dig deeper into the error to get a better message
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
    }

    private extractData(res: Response) {
      let body = res.json();

      console.log(body);

      return body.data || { };
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 
import { Profile } from 'selenium-webdriver/firefox';
import { User } from './user.model';
// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AuthService {
  // resetForm(email: any, password: any) {
  //   throw new Error("Method not implemented.");
  // }

user : User;
private uuserAdddFormUrl = "http://localhost:9000/user"
//  private userRegistrationFormUrl = "http://localhost:9000/user"

pp : Profile;
private addPPFormUrl = "http://localhost:9000/pp"
  constructor(private http: HttpClient) { }




}

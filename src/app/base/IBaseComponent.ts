import { AccountService } from '../services/account.service';

export abstract class IBaseComponent  {

constructor(public accountService: AccountService){}

isLoggedin(){
  
   return this.accountService.isLoggedIn();
}
logOut(){
  this.accountService.logOut();
}


}
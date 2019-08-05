import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AccountService } from '../services/account.service';


@Injectable()
export class LoginGuard implements CanActivate{
    state: any;
  public  sonuc=false;
    constructor(private accountService:AccountService,
                private router:Router){}
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
      
         if(!this.accountService.isLoggedIn()) 
           this.router.navigate(["login"]);

        return true;

    }
    }
    // let logged = this.accountService.isLoggedIn();
        // if(logged){
        //     this.accountService.isLoggedIn();
        //     return true;
        // }
        // else{this.router.navigate(["login"]);
        // return false;
//}

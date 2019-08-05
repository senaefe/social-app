import { Component, OnInit } from '@angular/core';
import { IBaseComponent } from '../../base/IBaseComponent';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profilecard',
  templateUrl: './profilecard.component.html',
  styleUrls: ['./profilecard.component.css']
})
export class ProfilecardComponent extends IBaseComponent implements OnInit {

  constructor(public accountService:AccountService) {
    super(accountService);
   }

  ngOnInit() {
  }

}

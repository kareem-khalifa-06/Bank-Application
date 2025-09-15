import { Component } from '@angular/core';
import { Account } from '../../models/account';
import { AccountService } from '../../core/services/account.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-user-transfer',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './user-transfer.component.html',
  styleUrl: './user-transfer.component.css'
})
export class UserTransferComponent {
  constructor(private _AccountService:AccountService){}
  account!:Account|undefined;
  ngOnInit():void{
    const user =localStorage.getItem('currentUser');
 
    if(user){
     const userData=JSON.parse(user);
const userId=userData.userId;
  this._AccountService.getUserById(userId).subscribe({
next:(res)=>{
  this.account=res;
}
    })
    }
  }

}

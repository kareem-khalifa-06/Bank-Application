import { Component } from '@angular/core';
import { Account } from '../../models/account';
import { AccountService } from '../../core/services/account.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '../../models/transactions';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-user-transfer',
  standalone: true,
  imports: [CurrencyPipe,ReactiveFormsModule,DatePipe],
  templateUrl: './user-transfer.component.html',
  styleUrl: './user-transfer.component.css',
  providers:[DatePipe]
})
export class UserTransferComponent {
  userId!:number;
  constructor(private _AccountService:AccountService,private _FormBuilder:FormBuilder,private _TransactionService:TransactionService, private _DatePipe:DatePipe){}
  account!:Account;
  accounts!:Account[];
  ngOnInit():void{
    const user =localStorage.getItem('currentUser');
 
    if(user){
     const userData=JSON.parse(user);
     this.userId=userData.userId;
  this._AccountService.getUserById(this.userId.toString()).subscribe({
next:(res)=>{
  if(res)
  this.account=res;
}
    })
    }
    this._AccountService.getAllAccounts().subscribe({
      next:(res)=>{
        this.accounts=res
      }
    })
  }
transferForm:FormGroup=this._FormBuilder.group({
  ToAccountNo:['',[Validators.required]],
  fromAccountNo:['',[Validators.required]],
  amount:['',[Validators.required]],
  description:['']
});
id:number=45;
newTransaction!:Transaction;
todayDate=new Date();
formatedDate=this._DatePipe.transform(this.todayDate,
  "yyyy-MM-dd'T'HH:mm:ss'Z'"
)
transferFunds():void{
  if(this.transferForm.valid){
    this.id=this.id+1
  console.log(this.transferForm.value);
  this.newTransaction={
    ToAccountNo:this.transferForm.value.ToAccountNo,
   fromAccountNo:this.transferForm.value.fromAccountNo,
   amount:this.transferForm.value.amount,
   date:this.todayDate,
   type:'credit',
   description:this.transferForm.value.description,
   id:this.id.toString()

  }
  if(this.transferForm.value.amount<=this.account?.balance){
  this._TransactionService.makeNewTransaction(this.newTransaction).subscribe({
    next:()=>{
      const updatedUser:Account={
        id:this.userId.toString(),
        accountNo:this.account.accountNo,
        accountType:this.account.accountType,
        balance:(this.account.balance-this.newTransaction.amount),
       userId:this.userId

      }
      this._AccountService.updateUser(updatedUser, this.userId).subscribe({
        next: (res) => {
          this.account = res; 
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  })
  
}
else{
alert("insufficent Balance");
}

  }
 else{
  alert('invalid transfer');
 } 
 this.transferForm.reset();


}



}

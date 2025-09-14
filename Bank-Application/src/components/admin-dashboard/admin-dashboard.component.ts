import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
constructor(public _UserService:UserService){}
usersData=this._UserService.users;
deleteUser(i:number):void{
  this.usersData.splice(i,1);
  console.log(this.usersData);
}
toggleUserStatus(i:number):void{
  this.usersData[i].isActive=!this.usersData[i].isActive;
}
}



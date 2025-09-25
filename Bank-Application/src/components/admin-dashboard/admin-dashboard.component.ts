import { User } from './../../models/user';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  editUserData: User | null = null;
  editUserForm!:FormGroup;
  addUserForm!:FormGroup;
  showEditFrom=false;
showAddFrom=false;
constructor(public _UserService:UserService,
  private formBuilder:FormBuilder,private _AccountService:AccountService
){
  this.initializeForms();
  
}
usersData=this._UserService.users

deleteUser(i:number):void{
  if(confirm('are you sure you want to delete this user')){
    this.usersData.splice(i,1);
    this._AccountService.deleteUser(i).subscribe();
    this.saveToStorage();
    
    console.log(this.usersData);
  }
  

}
toggleUserStatus(i:number):void{
  this.usersData[i].isActive=!this.usersData[i].isActive;
  
  this.saveToStorage();
}

initializeForms() {
  this.addUserForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^\\+[0-9]{11}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['User', [Validators.required]]
  });

  this.editUserForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^\\+[0-9]{11}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['User', [Validators.required]]
  });
}
showEditdata(i:number):void{
  this.editUserForm = this.formBuilder.group({
    username: [this.usersData[i].username, [Validators.required, Validators.minLength(3)]],
    email: [this.usersData[i].email, [Validators.required, Validators.email]],
    phone: [this.usersData[i].phone, [Validators.required, Validators.pattern('^\\+[0-9]{11}$')]],
    password: [this.usersData[i].password, [Validators.required, Validators.minLength(6)]],
    role: [this.usersData[i].role, [Validators.required]]
  });
  this.editUserData=this.usersData[i];
}
editUser(){
  if(this.editUserForm.valid&&this.editUserData){
  this.showEditFrom=false;
  const formValue=this.editUserForm.value;
  const index = this.usersData.findIndex((u)=> u.id===this.editUserData?.id)
  if(index>-1){
    this.usersData[index]={
      ...this.editUserData,
      username:formValue?.username,
      password:formValue?.password,
      phone:formValue?.phone,
      email:formValue?.email,
      role:formValue?.role,
    }
    
  }
  this.editUserForm.reset();

  }
  this.saveToStorage();
}
saveToStorage() {
  localStorage.setItem('users', JSON.stringify(this.usersData));
}
addNewUser() {

  
  if (this.addUserForm.valid) {
    const formValue = this.addUserForm.value;
    const id = this.usersData.length;
    const newUser: User = {
      id: id.toString(),
      username: formValue.username,
      password: formValue.password,
      role: formValue.role,
      isActive: true,
      email: formValue.email,
      phone: formValue.phone
    };
    this.usersData.push(newUser);
    this.saveToStorage();
    this.showAddFrom = false;
    this.addUserForm.reset();
    
  }
}
}



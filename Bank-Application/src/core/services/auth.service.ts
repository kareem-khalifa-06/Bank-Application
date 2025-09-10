import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Role, User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _UserService:UserService, private _Router:Router) {}

  getAllUsers(): User[] {
    return this._UserService.users;
  }

  login(username: string, password: string | number): boolean {
    const user = this.getAllUsers().find(
      (u) => u.username === username && u.password === password && u.isActive
    );
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({
        userId: user.id,
        role: user.role,
        username: user.username,
      }));
      return true;
    }
    return false;
  }
  getUserName():string|null{
    const user=localStorage.getItem('currentUser')
    if(user){
      const userData=JSON.parse(user);
      const userName=userData.username;
      return userName
    }
    else return null
   
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this._Router.navigate(['/']);
  }

  getRole(): Role | null {
    const data = localStorage.getItem('currentUser');
    if (data) return JSON.parse(data).role;
    return null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}

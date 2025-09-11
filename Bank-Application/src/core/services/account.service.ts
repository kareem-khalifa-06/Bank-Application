import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../../models/account';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private base_url = 'http://localhost:3000/';

  constructor(private _HttpClient: HttpClient) {}

  getAllAccounts(): Observable<Account[]> {
    return this._HttpClient.get<Account[]>(this.base_url + 'Account');
  }

  getUserById(id: string): Observable<Account | undefined> {
    return this.getAllAccounts().pipe(
      map(accounts => accounts.find(u => u.id ===id))
    );
  }
}


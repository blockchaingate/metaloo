import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private TOKEN_KEY = 'token';

  constructor(private sessionStorage: SessionStorageService) {}

  // Store token in sessionStorage
  storeToken(token: string): void {
    this.sessionStorage.store(this.TOKEN_KEY, token);
  }

  // Get token from sessionStorage
  getToken(): string | null {
    return this.sessionStorage.retrieve(this.TOKEN_KEY);
  }

  // Delete token from sessionStorage
  deleteToken(): void {
    this.sessionStorage.clear(this.TOKEN_KEY);
  }

  // store temp password
  storeTempPwd(pwd: string): void {
    this.sessionStorage.store('password', pwd);
  }

  // get temp password
  async getTempPwd(): Promise<string | null> {
    return await this.sessionStorage.retrieve('password');
  }

  // delete temp password
  deleteTempPwd(): void {
    this.sessionStorage.clear('password');
  }
}

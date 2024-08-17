import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  getUserList(page: number): Observable<any> {
    const cacheKey = `userList-${page}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    } else {
      return this.http.get(`https://reqres.in/api/users?page=${page}`).pipe(
        tap(data => this.cache.set(cacheKey, data)),
        shareReplay(1)
      );
    }
  }

  getUserDetails(id: number): Observable<any> {
    const cacheKey = `userDetails-${id}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    } else {
      return this.http.get(`https://reqres.in/api/users/${id}`).pipe(
        tap(data => this.cache.set(cacheKey, data)),
        shareReplay(1)
      );
    }
  }

  searchUsersById(id: string): Observable<any[]> {
    const cacheKey = `searchUser-${id}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    } else {
      return this.http.get<any[]>(`https://reqres.in/api/users/${id}`).pipe(
        tap(data => this.cache.set(cacheKey, data)),
        shareReplay(1)
      );
    }
  }
}

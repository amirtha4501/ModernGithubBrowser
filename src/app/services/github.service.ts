import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repository } from '../models/repository.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private baseUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  getRepositories(username: string): Observable<Repository[]> {
    return this.http.get<Repository[]>(`${this.baseUrl}/${username}/repos`);
  }
}

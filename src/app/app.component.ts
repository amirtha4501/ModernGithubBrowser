import { Component, signal } from '@angular/core';
import { GithubService } from './services/github.service';
import { Repository } from './models/repository.model';
import { SearchComponent } from './components/search/search.component';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchComponent, RepoListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'modern-github-browser';
  repos = signal<Repository[]>([]);
  loading = signal(false);

  constructor(private githubService: GithubService) {}

  onSearch(username: string) {
    if (!username) return;

    this.loading.set(true);

    this.githubService.getRepositories(username).subscribe({
      next: (data) => {
        this.repos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.repos.set([]);
        this.loading.set(false);
      }
    });
  }
}

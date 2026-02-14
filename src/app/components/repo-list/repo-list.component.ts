import { Component, input } from '@angular/core';
import { Repository } from '../../models/repository.model';
import { RepoCardComponent } from '../repo-card/repo-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repo-list',
  standalone: true,
  imports: [CommonModule, RepoCardComponent],
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent {

  repos = input<Repository[]>([]);
  loading = input<boolean>(false);
}

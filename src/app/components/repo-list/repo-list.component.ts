import { Component, input } from '@angular/core';
import { Repository } from '../../models/repository.model';
import { RepoCardComponent } from '../repo-card/repo-card.component';


@Component({
    selector: 'app-repo-list',
    imports: [RepoCardComponent],
    templateUrl: './repo-list.component.html',
    styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent {

  repos = input<Repository[]>([]);
  loading = input<boolean>(false);
}

import { Component, input } from '@angular/core';
import { Repository } from '../../models/repository.model';


@Component({
    selector: 'app-repo-card',
    imports: [],
    templateUrl: './repo-card.component.html',
    styleUrls: ['./repo-card.component.css']
})
export class RepoCardComponent {

  repo = input.required<Repository>();
}

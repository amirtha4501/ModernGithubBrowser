import { Component, input } from '@angular/core';
import { Repository } from '../../models/repository.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.css']
})
export class RepoCardComponent {

  repo = input.required<Repository>();
}

import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-search',
    imports: [FormsModule],
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {

  username = signal('');
  searchEvent = output<string>();

  search() {
    this.searchEvent.emit(this.username());
  }
}

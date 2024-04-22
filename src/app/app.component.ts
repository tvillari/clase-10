import { RouterOutlet } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map, filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  // title = 'clase-10';
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private destroy$ = new Subject<void>();

  posts$: Observable<Post[]>;
  searchTerm = '';

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchData(): void {
    this.posts$ = this.http
      .get<Post[]>(this.apiUrl)
      .pipe(takeUntil(this.destroy$));
  }
  filterPosts(posts: Post[]): Post[] {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchTermChange(term: string): void {
    this.searchTerm = term;
  }
}

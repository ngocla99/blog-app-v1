import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() totalPages!: number[];
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {}

  changePage(page: number) {
    this.articleService.pageIndexSub.next(page);
  }
}

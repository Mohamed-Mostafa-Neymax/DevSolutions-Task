import { Router } from '@angular/router';
import { BoardService } from './../../services/board.service';
import { Component, OnInit } from '@angular/core';
import { SignService } from 'src/app/services/sign.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  token!: string | null;

  constructor(private boardService: BoardService, private signService: SignService, private router: Router) { }
  ngOnInit(): void {
    this.signService.tokenSubject.next(localStorage.getItem('token'));
    this.signService.tokenSubject.subscribe( token => this.token = token );
  }

  searchHandler(eve: Event) {
    this.boardService.getFilteredIssues((<HTMLInputElement>eve.target).value);
  }

  logoutHandler() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.signService.tokenSubject.next(null);
    this.router.navigate(['/sign']);
  }
}

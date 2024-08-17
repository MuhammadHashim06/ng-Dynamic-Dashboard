import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import * as UserActions from '../../State/user.actions';
import { AppState } from '../../State/app.state';
import { selectAllUsers } from '../../State/user.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataload=false
navigateToUserDetails(arg0: any) {
throw new Error('Method not implemented.');
}
  private searchSubject = new Subject<string>();
  searchResults: any[] = [];
  
  pages: number[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  user: any = {};
  pagenumber: number = 1;
  users$: Observable<any[]> | undefined;

  length: number = 0;
  pageSize: number = 6;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25];

  @ViewChild('paginator') paginator: any;

  constructor(
    private service: UserService,
    private activeroute: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeUsers();
    this.setupSearch();
    this.pagenumber = +this.activeroute.snapshot.params['pageno'] || 1;
    this.getService(this.pagenumber);
  }

  initializeUsers(): void {
    this.store.dispatch(UserActions.loadUsers({ page: 1 }));
    this.users$ = this.store.select(selectAllUsers);
  }

  setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      switchMap(searchTerm => this.service.searchUsersById(searchTerm))
    ).subscribe(
      results => this.searchResults = results,
      error => console.error('Error searching users:', error)
    );
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
  
    if (searchTerm) {
      this.searchSubject.next(searchTerm);
    }
  }

  getService(pagenumber: number): void {
    this.service.getUserList(pagenumber).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(error);
      })
    ).subscribe(res => {
      this.user = res;
      this.length = this.user.total;
      this.pageSize = this.user.per_page;
      this.pageIndex = this.user.page - 1;
      this.totalPages = this.user.total_pages;
      this.currentPage = this.user.page;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      if (this.paginator) {
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.pageSize = this.pageSize;
        this.paginator.length = this.length;
      }
    });
  }

  openProfile(id: number): void {
    this.router.navigateByUrl(`home/user/${id}`);
  }

  handlePageEvent(e: PageEvent): void {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.currentPage = e.pageIndex + 1;
    this.getService(this.currentPage);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string): void {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}

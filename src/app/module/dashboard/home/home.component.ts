import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  onSearch(arg0: any) {
  }
  user: any
  pagenumber: number = 1
  constructor(private service: UserService) { }
  ngOnInit(): void {
    this.getserivce(this.pagenumber)
  }

  getserivce(pagenumber: number) {
    this.service.getUserList(pagenumber).pipe(
      catchError(error => {
        return throwError(error)
      })
    ).subscribe(res => {
      this.user = res
    }
    )
  }

}



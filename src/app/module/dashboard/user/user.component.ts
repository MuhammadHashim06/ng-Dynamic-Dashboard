import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  id=0
  user:any
  dataload=false
  constructor(private service : UserService,private activeroute :ActivatedRoute ){}
  ngOnInit(): void {
this.id=this.activeroute.snapshot.params['id']
this.service.getUserDetails(this.id).pipe(
  catchError(error=>{
    return throwError(error)
  })
).subscribe(res=>{
  this.dataload=true
  console.log(res);
  
  this.user=res.data
})
  }

  
}

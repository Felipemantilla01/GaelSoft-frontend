import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userData = {
    email:'',
    password:''
  }

  constructor(
    private _snackBar: MatSnackBar,
    private _authService: AuthService,
    private _router:Router
  ) { }

  ngOnInit() {
  }

  login(){
    if(this.userData.email==='' || this.userData.password===''){
      this.openSnackBar('Error: you must fill in all fields','understood', 4000)
    }else{
      this._authService.loginUser(this.userData).subscribe(
        (res) => {
          //console.log(res)
          localStorage.setItem('token', res.token)
          localStorage.setItem('username', res.username)
          localStorage.setItem('_id', res._id)
          //this.openSnackBar(`${res.email} Login successfully`,'understood', 1000)
          this._router.navigate(['/dashboard'])
        },        
        (err) =>{
          this.openSnackBar(`Error: ${err.error}`,'understood', 2000)
          
        }
      )
    }    
  }

  openSnackBar(message: string, action: string, time:number) {
    this._snackBar.open(message, action, {
      duration: time,
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  userData = {
    email:'',
    username:'',
    password:''
  }

  constructor(
    private _authService : AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  registry(){
    if(this.userData.email==='' || this.userData.username==='' || this.userData.password===''){
      this.openSnackBar('Error: you must fill in all fields','understood', 4000)
    }else{
      this._authService.registerUser(this.userData).subscribe(
        (res) => {
          this.openSnackBar(`${res.email} registered successfully`,'understood', 1000)
          setTimeout(() => {
            this._router.navigate(['/login'])
          }, 1000);
        },
        
        (err) =>{
          this.openSnackBar(`Error: ${err.error}`,'understood', 1000)
          
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

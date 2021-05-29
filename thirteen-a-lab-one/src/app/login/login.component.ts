import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { SubscriptionService } from 'src/app/subscription.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  showPassword = true;
   
  private unsubscribe$ = new Subject<void>();
  user: any;

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private subscriptionService: SubscriptionService,
    
    ) { }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit()  {
    this.subscriptionService.userData.asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.user = data.userId;
      });
  }

  
  login() {
    if (this.loginForm.valid) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.authenticationService.login(this.loginForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data:any) => {
            this.router.navigate([returnUrl]);
          },
          () => {
            this.loginForm.reset();
            this.loginForm.setErrors({
              invalidLogin: true
            });
          });
    }
  }

  
  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}


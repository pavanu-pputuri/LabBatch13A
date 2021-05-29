import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe} from '@angular/core';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginComponent } from './login/login.component';
import { SubscriptionService } from './subscription.service';


@Injectable({
  providedIn: 'root'
})



export class AuthenticationService {
  
  

  oldUserId!: string | null;

  constructor(
    private http: HttpClient,
    private subscriptionService: SubscriptionService) { }

  login(user: any) {
    return this.http.post<any>('/api/login', user)
      .pipe(map(response => {
        if (response && response.token) {
          this.oldUserId = localStorage.getItem('userId');
          localStorage.setItem('authToken', response.token);
          this.setUserDetails();
          localStorage.setItem('userId', response.userDetails.userId);
          this.subscriptionService.cartItemcount$.next(response.carItemCount);
        }
        return response;
      }));
  }
  setUserDetails() {
    throw new Error('Method not implemented.');
  }
}

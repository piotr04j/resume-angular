import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  signedIn: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.signedIn$.subscribe(value => {
      this.signedIn = value;
    });
  }

}

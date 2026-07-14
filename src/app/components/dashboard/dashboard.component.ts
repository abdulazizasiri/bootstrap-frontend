import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
 import { CommonModule } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { RoomService } from 'src/app/services/room.service';
import { Subscription } from 'rxjs';
import { IRoomListDto } from 'src/app/models/room.model';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone:false
  // imports: [RouterOutlet, CommonModule, RouterModule],
})
export class DashboardComponent implements OnInit {
  currentRoute: string = '';
  mobileMenuOpen = false;
  isLargeScreen = false;
  rooms: IRoomListDto[] = [];
  language?: string;


  constructor(
    public authService: LoginService,
     private router: Router,
     private languageService: LanguageService,
    private renderer: Renderer2,
) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
        this.closeMobileMenu();
      });
  }


ngOnInit() {
  this.checkScreenSize();
 this.checkScreenSize();
  this.language = this.languageService.getLangInitially() || 'en';
}

changeLanguage() {
  // Toggle logic
  const newLang = this.language === 'ar' ? 'en' : 'ar';

  // Call the service to update the actual app state and translations
  this.languageService.setLang(newLang, this.renderer);

  // Update the local variable so the next click works correctly
  this.language = newLang;
}

  // @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 1024;
    if (this.isLargeScreen) {
      this.mobileMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    if (!this.isLargeScreen) {
      this.mobileMenuOpen = false;
    }
  }


  logout() {
    this.authService.logout();
  }
}

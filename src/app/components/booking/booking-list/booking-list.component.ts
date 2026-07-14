import { Component, OnInit } from '@angular/core';
// import { IBookingListDto } from '../../../models/booking.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import {  IBookMeetingDto, IUpdateBookingDateDto } from 'src/app/models/booking.model';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { AuthService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  standalone : false
})
export class BookingListComponent implements OnInit {

  bookings: IBookMeetingDto[] = [];
  loading = true;
  error = '';
 currentLang: string = 'ar'; // Default to Arabic

  isAdminUser = false;
  pageTitle = '';
    private _subscription: Subscription = new Subscription();
      private langSubscription: Subscription;
   currentUserId: string = '';

  constructor(

    private _bookingService: BookingService,
    //  private authService: LoginService
     private languageService: LanguageService,
    private router: Router,
        private authService: AuthService,
       ) {
          this.currentLang = this.languageService.getLangInitially();
          this.currentUserId = this.authService.getUserId();

     }
showDeleteModal = false;
  selectedBookingId: string | null = null;


  ngOnInit() {
    this.langSubscription = this.languageService.getLang().subscribe((lang: string) => {
      this.currentLang = lang;
    });    this.pageTitle = this.isAdminUser ? 'All IBookingListDtos' : 'My Bookings';

    // console.log('BookingList Component Initialized - User is admin:', this.isAdminUser);
    this.loadBookings();
  //    if (currentUserId) {
  //   this.bookingService.getUserBookings(currentUserId).subscribe(bookings => {
  //     this.bookings = bookings;
  //   });
  // }
  }



  loadBookings() {
     this._subscription.add(this._bookingService.getAllBookings(this.currentUserId).subscribe(res => {
      if (res.success) {
        // this.bookings = res.data;
        this.bookings = this.sortBookingsByDate(res.data);
         this.loading = false;
      } else {
         this.loading = false;
        // this.rooms.showWarn(res.message || res.errorMessage);
      }
    }));
  }
   sortBookingsByDate(bookings: IBookMeetingDto[]): IBookMeetingDto[] {
    return bookings.sort((a, b) => {
      const dateA = new Date(`${a.meetingDate}T${a.startTime}`).getTime();
      const dateB = new Date(`${b.meetingDate}T${b.startTime}`).getTime();
      return dateB - dateA; // Sort descending (newest first)
    });
  }

  // Format date based on current language
  formatDate(dateString: string): string {
    const date = new Date(dateString);

    if (this.currentLang === 'ar') {
      return date.toLocaleDateString('ar-SA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }

  // --- DELETE MODAL LOGIC ---


  closeModal() {
    this.showDeleteModal = false;
    this.selectedBookingId = null;
  }
  openDeleteModal(id: string) {
    this.selectedBookingId = id;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (!this.selectedBookingId) return;

    this.loading = true;
    this._subscription.add(
      this._bookingService.cancelBooking(this.selectedBookingId).subscribe(res => {
        if (res.success) {
          this.loadBookings();
          this.closeModal();
        } else {
          this.loading = false;
          // Handle error (e.g., toast message)
        }
      })
    );
  }

  // --- REDIRECT TO UPDATE ---

  navigateToUpdate(id: string) {
    this.router.navigate(['/dashboard/bookings/edit', id]);
  }
  // Format date and time together
formatTime(timeString: string): string {
  if (!timeString) return '';

  // Create a dummy date (today) and set the hours/minutes from the string
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(+hours, +minutes, 0);

  // Return localized time (e.g., "1:00 PM" or "١:٠٠ م")
  return date.toLocaleTimeString(this.currentLang === 'ar' ? 'ar-SA' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}


  updateBooking(meetingId: string, data: IUpdateBookingDateDto) {

       this._subscription.add(this._bookingService.updateBooking(meetingId,data).subscribe(res => {
      if (res.success) {
        // this.bookings = res.data;
        this.loadBookings();
        // this.bookings = this.sortBookingsByDate(res.data);
         this.loading = false;
      } else {
         this.loading = false;
        // this.rooms.showWarn(res.message || res.errorMessage);
      }
    }));
  }

  cancelBooking(id: string) {
    // debugger;
console.log("id for delete", id);

       this._subscription.add(this._bookingService.cancelBooking(id).subscribe(res => {
      if (res.success) {
        // this.bookings = res.data;
        this.loadBookings();
        // this.bookings = this.sortBookingsByDate(res.data);
         this.loading = false;
      } else {
         this.loading = false;
        // this.rooms.showWarn(res.message || res.errorMessage);
      }
    }));
  }

  getStatusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}

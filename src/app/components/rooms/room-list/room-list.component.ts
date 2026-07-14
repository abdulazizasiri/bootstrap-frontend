import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { IRoomListDto } from 'src/app/models/room.model';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  standalone: false
  // imports: [CommonModule, FormsModule]
})
export class RoomListComponent implements OnInit {
    rooms: IRoomListDto[] = [];
  loading = true;
  error = '';
  showAddForm = false;
    private _subscription: Subscription = new Subscription();

 currentLang: string = 'ar'; // Default to Arabic
  private langSubscription: Subscription;

  constructor(
    private _roomService: RoomService,private languageService: LanguageService,private router: Router
  ) {
     this.currentLang = this.languageService.getLangInitially();


  }

  ngOnInit() {
      this.langSubscription = this.languageService.getLang().subscribe((lang: string) => {
      this.currentLang = lang;
    });
        this.getAllRooms();

  }

    bookRoom(roomId: number) {
    // Navigate to booking form with roomId as query parameter
    this.router.navigate(['/dashboard/bookings/new'], {
      queryParams: { roomId: roomId }
    });
  }


  getAllRooms() {
    this._subscription.add(this._roomService.getAllRooms().subscribe(res => {
      if (res.success) {
        this.rooms = res.data;
         this.loading = false;
      } else {
         this.loading = false;
        // this.rooms.showWarn(res.message || res.errorMessage);
      }
    }));

  }
  loadRooms() {
    // this.loading = true;
    // this.roomService.getRooms().subscribe({
    //   next: (rooms) => {
    //     this.rooms = rooms;
    //     this.loading = false;
    //     console.log('Rooms loaded:', rooms);
    //   },
    //   error: (error) => {
    //     this.loading = false;
    //     this.error = 'Failed to load rooms. Please try again.';
    //     console.error('Error loading rooms:', error);
    //   }
    // });
  }

  addRoom() {
    // this.roomService.createRoom(this.newRoom as Room).subscribe({
    //   next: (room) => {
    //     console.log('Room created successfully:', room);
    //     this.loadRooms();
    //     this.resetForm();
    //   },
    //   error: (error) => {
    //     console.error('Error creating room:', error);
    //     this.error = 'Failed to create room. Please check your permissions.';
    //   }
    // });
  }

  resetForm() {
    // this.newRoom = {
    //   name: '',
    //   capacity: 10,
    //   location: '',
    //   amenities: '',
    //   available: true
    // };
    this.showAddForm = false;
  }

  getAmenitiesArray(amenitiesString: string): string[] {
    if (!amenitiesString) return [];
    return amenitiesString.split(',').map(a => a.trim()).filter(a => a);
  }
}

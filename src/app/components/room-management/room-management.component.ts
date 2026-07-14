import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IRoomListDto } from 'src/app/models/room.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  standalone:false
})
export class RoomManagementComponent implements OnInit {
  rooms: IRoomListDto[] = [];
  loading = true;
  error = '';
  showForm = false;
  editingRoom: IRoomListDto | null = null;
  private _subscription: Subscription = new Subscription();

  roomForm: Omit<IRoomListDto, 'id'> & { id?: number } = {
  roomId: 0,
  roomNameAr: '',
  roomNameEn: '',
  capacity: 5
  };

  commonAmenities = [
    'Projector', 'Whiteboard', 'Video Conferencing', 'WiFi',
    'Air Conditioning', 'Telephone', 'Catering', 'Monitor',
    'Sound System', 'Microphone', 'Webcam'
  ];

  constructor(private _roomService: RoomService) {}

  ngOnInit() {
    this.loadRooms();
  }
  loadRooms() {
    throw new Error('Method not implemented.');
  }

  getAllRooms() {
    this._subscription.add(this._roomService.getAllRooms().subscribe(res => {
      if (res.success) {
        this.rooms = res.data;
      } else {
        // this.rooms.showWarn(res.message || res.errorMessage);
      }
    }));
  }
  // loadRooms() {
  //   this.loading = true;
  //   this.roomService.getRooms().subscribe({
  //     next: (rooms) => {
  //       this.rooms = rooms;
  //       this.loading = false;
  //       console.log('Rooms loaded:', rooms);
  //     },
  //     error: (error) => {
  //       this.loading = false;
  //       this.error = 'Failed to load rooms';
  //       console.error('Error loading rooms:', error);
  //     }
  //   });
  // }

  // saveRoom() {
  //   if (this.editingRoom) {
  //     this.roomService.updateRoom(this.editingRoom.id, this.roomForm as Room).subscribe({
  //       next: (room) => {
  //         console.log('Room updated successfully:', room);
  //         this.loadRooms();
  //         this.resetForm();
  //       },
  //       error: (error) => {
  //         console.error('Error updating room:', error);
  //         this.error = 'Failed to update room. Please try again.';
  //       }
  //     });
  //   } else {
  //     this.roomService.createRoom(this.roomForm as Room).subscribe({
  //       next: (room) => {
  //         console.log('Room created successfully:', room);
  //         this.loadRooms();
  //         this.resetForm();
  //       },
  //       error: (error) => {
  //         console.error('Error creating room:', error);
  //         this.error = 'Failed to create room. Please try again.';
  //       }
  //     });
  //   }
  // }

  // editRoom(room: Room) {
  //   this.editingRoom = room;
  //   this.roomForm = { ...room };
  //   this.showForm = true;
  //   console.log('Editing room:', room);
  // }

  // deleteRoom(id: number) {
  //   if (confirm('Are you sure you want to delete this room? This action cannot be undone.')) {
  //     this.roomService.deleteRoom(id).subscribe({
  //       next: () => {
  //         console.log('Room deleted successfully');
  //         this.loadRooms();
  //       },
  //       error: (error) => {
  //         console.error('Error deleting room:', error);
  //         this.error = 'Failed to delete room. Please try again.';
  //       }
  //     });
  //   }
  // }

  // addAmenity(amenity: string) {
  //   const currentAmenities = this.roomForm.amenities || '';
  //   if (currentAmenities.includes(amenity)) {
  //     return;
  //   }

  //   if (currentAmenities) {
  //     this.roomForm.amenities = currentAmenities + ', ' + amenity;
  //   } else {
  //     this.roomForm.amenities = amenity;
  //   }
  // }

  // removeAmenity(amenityToRemove: string) {
  //   if (!this.roomForm.amenities) return;

  //   const amenitiesArray = this.roomForm.amenities.split(',').map(a => a.trim());
  //   const filteredAmenities = amenitiesArray.filter(a => a !== amenityToRemove);
  //   this.roomForm.amenities = filteredAmenities.join(', ');
  // }

  // getAmenitiesArray(amenitiesString: string): string[] {
  //   if (!amenitiesString) return [];
  //   return amenitiesString.split(',').map(a => a.trim()).filter(a => a);
  // }

  // cancelEdit() {
  //   this.editingRoom = null;
  //   this.resetForm();
  // }

  // resetForm() {
  //   this.roomForm = {
  //     name: '',
  //     capacity: 10,
  //     location: '',
  //     amenities: '',
  //     available: true
  //   };
  //   this.showForm = false;
  //   this.editingRoom = null;
  // }
}

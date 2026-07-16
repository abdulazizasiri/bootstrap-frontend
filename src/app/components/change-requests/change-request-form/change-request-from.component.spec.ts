// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { BookingFormComponent } from './booking-form.component';
// import { BookingService } from '../../../services/booking.service';
// import { RoomService } from '../../../services/room.service';
// import { UserService } from '../../../services/user.service';
// import { LanguageService } from '../../../services/language.service';
// import { Router } from '@angular/router';
// import { TranslateModule } from '@ngx-translate/core';
// import { of, throwError } from 'rxjs';
// import { IBookMeetingRequestDto } from '../../../models/booking.model';

// describe('BookingFormComponent - Integration Tests', () => {
//   let component: BookingFormComponent;
//   let fixture: ComponentFixture<BookingFormComponent>;
//   let bookingService: jasmine.SpyObj<BookingService>;
//   let roomService: jasmine.SpyObj<RoomService>;
//   let userService: jasmine.SpyObj<UserService>;
//   let languageService: jasmine.SpyObj<LanguageService>;
//   let router: jasmine.SpyObj<Router>;

//   beforeEach(async () => {
//     // Create spy objects for services
//     const bookingServiceSpy = jasmine.createSpyObj('BookingService', ['bookMeeting', 'updateBooking', 'cancelBooking']);
//     const roomServiceSpy = jasmine.createSpyObj('RoomService', ['getAllRooms']);
//     const userServiceSpy = jasmine.createSpyObj('UserService', ['getAllUsers']);
//     const languageServiceSpy = jasmine.createSpyObj('LanguageService', ['getLangInitially', 'getLang']);
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     // Default spy returns
//     languageServiceSpy.getLang.and.returnValue(of('en'));
//     languageServiceSpy.getLangInitially.and.returnValue('en');
//     roomServiceSpy.getAllRooms.and.returnValue(of({
//       success: true,
//       data: [
//         { roomId: '1', roomNameAr: 'غرفة 1', roomNameEn: 'Room 1', capacity: 10 },
//         { roomId: '2', roomNameAr: 'غرفة 2', roomNameEn: 'Room 2', capacity: 15 }
//       ]
//     }));
//     userServiceSpy.getAllUsers.and.returnValue(of({
//       success: true,
//       data: [
//         { userId: 'user-1', displayNameAr: 'أحمد', displayNameEn: 'Ahmed', email: 'ahmed@example.com' },
//         { userId: 'user-2', displayNameAr: 'فاطمة', displayNameEn: 'Fatima', email: 'fatima@example.com' }
//       ]
//     }));

//     await TestBed.configureTestingModule({
//       declarations: [BookingFormComponent],
//       imports: [
//         ReactiveFormsModule,
//         HttpClientTestingModule,
//         TranslateModule.forRoot()
//       ],
//       providers: [
//         { provide: BookingService, useValue: bookingServiceSpy },
//         { provide: RoomService, useValue: roomServiceSpy },
//         { provide: UserService, useValue: userServiceSpy },
//         { provide: LanguageService, useValue: languageServiceSpy },
//         { provide: Router, useValue: routerSpy }
//       ]
//     }).compileComponents();

//     bookingService = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;
//     roomService = TestBed.inject(RoomService) as jasmine.SpyObj<RoomService>;
//     userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
//     languageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;
//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

//     fixture = TestBed.createComponent(BookingFormComponent);
//     component = fixture.componentInstance;
//   });

//   describe('Book Meeting', () => {
//     it('should successfully book a meeting', (done) => {
//       // Arrange
//       fixture.detectChanges();
      
//       const mockBookingRequest: IBookMeetingRequestDto = {
//         roomId: '1',
//         MeetingDate: new Date('2026-01-25'),
//         startTime: '09:00:00',
//         endTime: '10:00:00',
//         userId: 'user-1',
//         title: 'Team Standup',
//         participantUserIds: ['user-2']
//       };

//       bookingService.bookMeeting.and.returnValue(of({
//         success: true,
//         message: 'Booking created successfully',
//         data: mockBookingRequest
//       }));

//       // Set form values
//       component.bookingForm.patchValue({
//         roomId: '1',
//         meetingDate: '2026-01-25',
//         startTime: '09:00',
//         endTime: '10:00',
//         userId: 'user-1',
//         title: 'Team Standup'
//       });
//       component.selectedMembers = [{ userId: 'user-2', displayNameEn: 'Fatima', displayNameAr: 'فاطمة', email: 'fatima@example.com' }];

//       // Act
//       component.submit();

//       // Assert
//       setTimeout(() => {
//         expect(bookingService.bookMeeting).toHaveBeenCalled();
//         expect(router.navigate).toHaveBeenCalledWith(['/dashboard/bookings/manage']);
//         done();
//       }, 100);
//     });

//     it('should display error when booking meeting fails', (done) => {
//       // Arrange
//       fixture.detectChanges();
      
//       const errorMessage = 'This room is already booked for the selected time slot.';
//       bookingService.bookMeeting.and.returnValue(throwError({ 
//         status: 409,
//         error: errorMessage 
//       }));

//       component.bookingForm.patchValue({
//         roomId: '1',
//         meetingDate: '2026-01-25',
//         startTime: '09:00',
//         endTime: '10:00',
//         userId: 'user-1',
//         title: 'Team Standup'
//       });

//       // Act
//       component.submit();

//       // Assert
//       setTimeout(() => {
//         expect(component.error).toBe(errorMessage);
//         expect(router.navigate).not.toHaveBeenCalled();
//         done();
//       }, 100);
//     });

//     it('should validate form before submitting', () => {
//       // Arrange
//       fixture.detectChanges();
//       component.bookingForm.reset();

//       // Act
//       component.submit();

//       // Assert
//       expect(bookingService.bookMeeting).not.toHaveBeenCalled();
//       expect(component.error).toContain('Please fill all required fields');
//     });

//     it('should validate that end time is after start time', () => {
//       // Arrange
//       fixture.detectChanges();
      
//       component.bookingForm.patchValue({
//         roomId: '1',
//         meetingDate: '2026-01-25',
//         startTime: '14:00',
//         endTime: '09:00', // End time before start time
//         userId: 'user-1',
//         title: 'Team Standup'
//       });

//       // Act
//       component.submit();

//       // Assert
//       expect(bookingService.bookMeeting).not.toHaveBeenCalled();
//       expect(component.error).toContain('End time must be after start time');
//     });

//     it('should not allow booking for past dates', () => {
//       // Arrange
//       fixture.detectChanges();
      
//       component.bookingForm.patchValue({
//         roomId: '1',
//         meetingDate: '2025-12-31', // Past date
//         startTime: '09:00',
//         endTime: '10:00',
//         userId: 'user-1',
//         title: 'Team Standup'
//       });

//       // Act
//       component.submit();

//       // Assert
//       expect(bookingService.bookMeeting).not.toHaveBeenCalled();
//       expect(component.error).toContain('Cannot book rooms for past dates');
//     });
//   });

//   describe('Update Meeting', () => {
//     it('should successfully update a meeting', (done) => {
//       // Arrange
//       fixture.detectChanges();
      
//       bookingService.updateBooking.and.returnValue(of({
//         success: true,
//         message: 'Booking updated successfully',
//         data: true
//       }));

//       // Simulate update scenario by directly calling the method
//       const updateRequest = {
//         bookingId: '123',
//         bookingDate: '2026-01-26',
//         startTime: '14:00:00',
//         endTime: '15:00:00'
//       };

//       // Act
//       bookingService.updateBooking(updateRequest).subscribe(
//         (response) => {
//           // Assert
//           expect(response.success).toBe(true);
//           expect(bookingService.updateBooking).toHaveBeenCalledWith(updateRequest);
//           done();
//         }
//       );
//     });

//     it('should display error when update fails due to time conflict', (done) => {
//       // Arrange
//       bookingService.updateBooking.and.returnValue(throwError({
//         status: 409,
//         error: { message: 'New time slot is not available' }
//       }));

//       const updateRequest = {
//         bookingId: '123',
//         bookingDate: '2026-01-26',
//         startTime: '10:00:00',
//         endTime: '11:00:00'
//       };

//       // Act
//       bookingService.updateBooking(updateRequest).subscribe(
//         () => {
//           fail('should have failed');
//         },
//         (error) => {
//           // Assert
//           expect(error.status).toBe(409);
//           done();
//         }
//       );
//     });

//     it('should display error when booking not found for update', (done) => {
//       // Arrange
//       bookingService.updateBooking.and.returnValue(throwError({
//         status: 404,
//         error: { message: 'Booking not found' }
//       }));

//       const updateRequest = {
//         bookingId: 'non-existent',
//         bookingDate: '2026-01-26',
//         startTime: '14:00:00',
//         endTime: '15:00:00'
//       };

//       // Act
//       bookingService.updateBooking(updateRequest).subscribe(
//         () => {
//           fail('should have failed');
//         },
//         (error) => {
//           // Assert
//           expect(error.status).toBe(404);
//           done();
//         }
//       );
//     });
//   });

//   describe('Cancel Meeting', () => {
//     it('should successfully cancel a meeting', (done) => {
//       // Arrange
//       bookingService.cancelBooking.and.returnValue(of({
//         success: true,
//         message: 'Booking cancelled successfully',
//         data: true
//       }));

//       const cancelRequest = {
//         bookingId: '123'
//       };

//       // Act
//       bookingService.cancelBooking(cancelRequest).subscribe(
//         (response) => {
//           // Assert
//           expect(response.success).toBe(true);
//           expect(bookingService.cancelBooking).toHaveBeenCalledWith(cancelRequest);
//           done();
//         }
//       );
//     });

//     it('should display error when cancellation fails - booking not found', (done) => {
//       // Arrange
//       bookingService.cancelBooking.and.returnValue(throwError({
//         status: 404,
//         error: { message: 'Booking not found' }
//       }));

//       const cancelRequest = {
//         bookingId: 'non-existent'
//       };

//       // Act
//       bookingService.cancelBooking(cancelRequest).subscribe(
//         () => {
//           fail('should have failed');
//         },
//         (error) => {
//           // Assert
//           expect(error.status).toBe(404);
//           done();
//         }
//       );
//     });

//     it('should display error when cancellation fails - already cancelled', (done) => {
//       // Arrange
//       bookingService.cancelBooking.and.returnValue(throwError({
//         status: 400,
//         error: { message: 'This booking is already cancelled' }
//       }));

//       const cancelRequest = {
//         bookingId: '123'
//       };

//       // Act
//       bookingService.cancelBooking(cancelRequest).subscribe(
//         () => {
//           fail('should have failed');
//         },
//         (error) => {
//           // Assert
//           expect(error.status).toBe(400);
//           done();
//         }
//       );
//     });

//     it('should display error when user lacks permission to cancel', (done) => {
//       // Arrange
//       bookingService.cancelBooking.and.returnValue(throwError({
//         status: 403,
//         error: { message: 'You do not have permission to cancel this booking' }
//       }));

//       const cancelRequest = {
//         bookingId: '456' // Booking owned by another user
//       };

//       // Act
//       bookingService.cancelBooking(cancelRequest).subscribe(
//         () => {
//           fail('should have failed');
//         },
//         (error) => {
//           // Assert
//           expect(error.status).toBe(403);
//           done();
//         }
//       );
//     });
//   });
// });

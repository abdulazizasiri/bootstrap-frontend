// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { BookingService } from './booking.service';
// import { ApiUrls } from './apis';
// import { 
//   IBookMeetingRequestDto, 
//   ICancelBookingDto, 
//   IUpdateBookingDateDto,
//   IBookMeetingDto 
// } from '../models/booking.model';
// import { IHttpResponse } from '../models/http-response.model';
// import { LoginService } from './login.service';

// describe('BookingService', () => {
//   let service: BookingService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         BookingService,
//         {
//           provide: LoginService,
//           useValue: { /* mock LoginService */ }
//         }
//       ]
//     });

//     service = TestBed.inject(BookingService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     // Verify that no unmatched requests exist after each test
//     httpMock.verify();
//   });

//   describe('bookMeeting', () => {
//     it('should call POST endpoint with correct booking data', () => {
//       // Arrange
//       const mockRequest: IBookMeetingRequestDto = {
//         roomId: '123e4567-e89b-12d3-a456-426614174000',
//         MeetingDate: new Date('2026-01-20'),
//         startTime: '09:00:00',
//         endTime: '10:00:00',
//         userId: 'user-123',
//         title: 'Team Meeting',
//         participantUserIds: ['user-456', 'user-789']
//       };

//       const mockResponse: IHttpResponse<IBookMeetingRequestDto> = {
//         success: true,
//         message: 'Booking created successfully',
//         data: mockRequest
//       };

//       // Act
//       service.bookMeeting(mockRequest).subscribe(
//         (response) => {
//           // Assert
//           expect(response).toEqual(mockResponse);
//           expect(response.success).toBe(true);
//           expect(response.data.roomId).toBe(mockRequest.roomId);
//           expect(response.data.title).toBe(mockRequest.title);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(ApiUrls.Bookings.bookBooking);
//       expect(req.request.method).toBe('POST');
//       expect(req.request.body).toEqual(mockRequest);
      
//       // Respond with mock data
//       req.flush(mockResponse);
//     });

//     it('should handle booking conflict error (409)', () => {
//       // Arrange
//       const mockRequest: IBookMeetingRequestDto = {
//         roomId: '123e4567-e89b-12d3-a456-426614174000',
//         MeetingDate: new Date('2026-01-20'),
//         startTime: '09:00:00',
//         endTime: '10:00:00',
//         userId: 'user-123',
//         title: 'Team Meeting',
//         participantUserIds: []
//       };

//       const errorMessage = 'This room is already booked for the selected time slot';

//       // Act
//       service.bookMeeting(mockRequest).subscribe(
//         () => {
//           fail('should have failed with 409 conflict error');
//         },
//         (error) => {
//           // Assert
//           expect(error.status).toBe(409);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(ApiUrls.Bookings.bookBooking);
//       expect(req.request.method).toBe('POST');
      
//       // Respond with error
//       req.flush(errorMessage, { status: 409, statusText: 'Conflict' });
//     });

//     it('should handle invalid booking data error (400)', () => {
//       // Arrange
//       const invalidRequest: IBookMeetingRequestDto = {
//         roomId: '',
//         MeetingDate: new Date(''),
//         startTime: '',
//         endTime: '',
//         userId: '',
//         title: '',
//         participantUserIds: []
//       };

//       // Act
//       service.bookMeeting(invalidRequest).subscribe(
//         () => {
//           fail('should have failed with 400 bad request error');
//         },
//         (error) => {
//           // Assert
//           expect(error.status).toBe(400);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(ApiUrls.Bookings.bookBooking);
//       req.flush('Invalid booking data', { status: 400, statusText: 'Bad Request' });
//     });
//   });

//   describe('updateBooking', () => {
//     it('should call POST endpoint with update booking data', () => {
//       // Arrange
//       const mockUpdateRequest: IUpdateBookingDateDto = {
//         bookingId: '123',
//         bookingDate: '2026-01-22',
//         startTime: '14:00:00',
//         endTime: '15:00:00'
//       };

//       const mockResponse: IHttpResponse<boolean> = {
//         success: true,
//         message: 'Booking updated successfully',
//         data: true
//       };

//       // Act
//       service.updateBooking(mockUpdateRequest).subscribe(
//         (response) => {
//           // Assert
//           expect(response.success).toBe(true);
//           expect(response.data).toBe(true);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(ApiUrls.Bookings.updateBooking);
//       expect(req.request.method).toBe('POST');
//       expect(req.request.body).toEqual(mockUpdateRequest);
//       expect(req.request.body.bookingId).toBe(mockUpdateRequest.bookingId);
      
//       // Respond with mock data
//       req.flush(mockResponse);
//     });

//     it('should handle update conflict when time slot is unavailable', () => {
//       // Arrange
//       const mockUpdateRequest: IUpdateBookingDateDto = {
//         bookingId: '123',
//         bookingDate: '2026-01-22',
//         startTime: '10:00:00',
//         endTime: '11:00:00'
//       };

//       const errorMessage = 'New time slot is not available';

//       // Act
//       service.updateBooking(mockUpdateRequest).subscribe(
//         () => {
//           fail('should have failed with conflict error');
//         },
//         (error) => {
//           // Assert
//           expect(error.status).toBe(409);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(ApiUrls.Bookings.updateBooking);
//       req.flush(errorMessage, { status: 409, statusText: 'Conflict' });
//     });

//     it('should handle not found error when booking does not exist', () => {
//       // Arrange
//       const mockUpdateRequest: IUpdateBookingDateDto = {
//         bookingId: 'non-existent-id',
//         bookingDate: '2026-01-22',
//         startTime: '14:00:00',
//         endTime: '15:00:00'
//       };

//       // Act
//       service.updateBooking(mockUpdateRequest).subscribe(
//         () => {
//           fail('should have failed with 404 not found error');
//         },
//         (error) => {
//           // Assert
//           expect(error.status).toBe(404);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(ApiUrls.Bookings.updateBooking);
//       req.flush('Booking not found', { status: 404, statusText: 'Not Found' });
//     });
//   });

//   describe('cancelBooking', () => {
//     it('should call POST endpoint with booking ID to cancel', () => {
//       // Arrange
//       const mockCancelRequest: ICancelBookingDto = {
//         bookingId: '123'
//       };

//       const mockResponse: IHttpResponse<boolean> = {
//         success: true,
//         message: 'Booking cancelled successfully',
//         data: true
//       };

//       // Act
//       service.cancelBooking(mockCancelRequest).subscribe(
//         (response) => {
//           // Assert
//           expect(response.success).toBe(true);
//           expect(response.data).toBe(true);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(`${ApiUrls.Bookings.cancelBooking}`);
//       expect(req.request.method).toBe('POST');
//       expect(req.request.body).toEqual(mockCancelRequest);
//       expect(req.request.body.bookingId).toBe(mockCancelRequest.bookingId);
      
//       // Respond with mock data
//       req.flush(mockResponse);
//     });

//     it('should handle cancellation of non-existent booking', () => {
//       // Arrange
//       const mockCancelRequest: ICancelBookingDto = {
//         bookingId: 'non-existent-id'
//       };

//       // Act
//       service.cancelBooking(mockCancelRequest).subscribe(
//         () => {
//           fail('should have failed with 404 not found error');
//         },
//         (error) => {
//           // Assert
//           expect(error.status).toBe(404);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(`${ApiUrls.Bookings.cancelBooking}`);
//       req.flush('Booking not found', { status: 404, statusText: 'Not Found' });
//     });

//     it('should handle cancellation of already cancelled booking', () => {
//       // Arrange
//       const mockCancelRequest: ICancelBookingDto = {
//         bookingId: '123'
//       };

//       const errorMessage = 'This booking is already cancelled';

//       // Act
//       service.cancelBooking(mockCancelRequest).subscribe(
//         () => {
//           fail('should have failed with bad request error');
//         },
//         (error) => {
//           // Assert
//           expect(error.status).toBe(400);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(`${ApiUrls.Bookings.cancelBooking}`);
//       req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
//     });

//     it('should handle cancellation permission denied', () => {
//       // Arrange
//       const mockCancelRequest: ICancelBookingDto = {
//         bookingId: '456' // Booking owned by another user
//       };

//       // Act
//       service.cancelBooking(mockCancelRequest).subscribe(
//         () => {
//           fail('should have failed with forbidden error');
//         },
//         (error) => {
//           // Assert
//           expect(error.status).toBe(403);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(`${ApiUrls.Bookings.cancelBooking}`);
//       req.flush('You do not have permission to cancel this booking', { 
//         status: 403, 
//         statusText: 'Forbidden' 
//       });
//     });
//   });

//   describe('getAllBookings', () => {
//     it('should fetch all bookings with pagination', () => {
//       // Arrange
//       const mockBookings: IBookMeetingDto[] = [
//         {
//           // id: '0128433E-F36B-1410-80E2-00A058C9E51C',
//           roomId: '123',
//           userId: '8927433E-F36B-1410-80E2-00A058C9E51C',
//           meetingDate: '2026-01-20',
//           startTime: '09:00:00',
//           endTime: '10:00:00',
//           title: 'Meeting 1',
//           participants: []
//         },
//         {
//          roomId: '123',
//           userId: '8927433E-F36B-1410-80E2-00A058C9E51C',
//           meetingDate: '2026-01-20',
//           startTime: '09:00:00',
//           endTime: '10:00:00',
//           title: 'Meeting 1',
//           participants: []
//         }
//       ];

//       const mockResponse = {
//         success: true,
//         message: 'Bookings retrieved successfully',
//         data: mockBookings,
//         totalCount: 2,
//         pageNumber: 1,
//         pageSize: 10
//       };

//       // Act
//       service.getAllBookings().subscribe(
//         (response) => {
//           // Assert
//           expect(response.data).toEqual(mockBookings);
//           expect(response.data.length).toBe(2);
//           expect(response.totalCount).toBe(2);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(ApiUrls.Bookings.GetAllBookings);
//       expect(req.request.method).toBe('GET');
      
//       // Respond with mock data
//       req.flush(mockResponse);
//     });

//     it('should handle empty bookings list', () => {
//       // Arrange
//       const mockResponse = {
//         success: true,
//         message: 'No bookings found',
//         data: [],
//         totalCount: 0,
//         pageNumber: 1,
//         pageSize: 10
//       };

//       // Act
//       service.getAllBookings().subscribe(
//         (response) => {
//           // Assert
//           expect(response.data.length).toBe(0);
//           expect(response.totalCount).toBe(0);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(ApiUrls.Bookings.GetAllBookings);
//       req.flush(mockResponse);
//     });
//   });

//   describe('getBookingById', () => {
//     it('should fetch booking by ID', () => {
//       // Arrange
//       const bookingId = '123';
//       const mockBooking = {
//         id: 1,
//         room: { roomId: '456', roomNameAr: 'غرفة الاجتماعات', roomNameEn: 'Meeting Room', capacity: 10 },
//         userEmail: 'user@example.com',
//         title: 'Team Meeting',
//         bookingDate: '2026-01-20',
//         startTime: '09:00:00',
//         endTime: '10:00:00',
//         createdAt: '2026-01-18T10:00:00Z',
//         updatedAt: '2026-01-18T10:00:00Z',
//         deletedAt: null
//       };

//       const mockResponse: IHttpResponse<any> = {
//         success: true,
//         message: 'Booking retrieved successfully',
//         data: mockBooking
//       };

//       // Act
//       service.getBookingById(bookingId).subscribe(
//         (response) => {
//           // Assert
//           expect(response.data).toEqual(mockBooking);
//           expect(response.data.).toBe(mockBooking.id);
//           expect(response.data.title).toBe(mockBooking.title);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(`${ApiUrls.Bookings.getBookingById}/${bookingId}`);
//       expect(req.request.method).toBe('GET');
      
//       // Respond with mock data
//       req.flush(mockResponse);
//     });

//     it('should handle not found error for non-existent booking', () => {
//       // Arrange
//       const bookingId = 'non-existent';

//       // Act
//       service.getBookingById(bookingId).subscribe(
//         () => {
//           fail('should have failed with 404 not found error');
//         },
//         (error) => {
//           // Assert
//           expect(error.status).toBe(404);
//         }
//       );

//       // Assert HTTP request
//       const req = httpMock.expectOne(`${ApiUrls.Bookings.getBookingById}/${bookingId}`);
//       req.flush('Booking not found', { status: 404, statusText: 'Not Found' });
//     });
//   });
// });

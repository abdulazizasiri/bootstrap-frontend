 import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { BaseService } from './base.service';
import { IPaginationResponse } from '../models/paginations.model';
import { ApiUrls } from './apis';
import { IHttpResponse } from '../models/http-response.model';
import {  IBookMeetingDto,  IBookMeetingRequestDto,  ICancelBookingDto, IGetBookingDto, IUpdateBookingDateDto } from '../models/booking.model';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class BookingService extends BaseService {

    constructor(injector: Injector, private _authMSALService: LoginService) {
        super(injector);
    }


getAllBookings(data: string): Observable<IPaginationResponse<IBookMeetingDto[]>> {
  return this.get<IBookMeetingDto[]>(ApiUrls.Bookings.GetAllBookings, data);
}

    bookMeeting(data: IBookMeetingRequestDto): Observable<IHttpResponse<IBookMeetingRequestDto>> {
        return this.post<IBookMeetingRequestDto>(ApiUrls.Bookings.bookBooking, data);
    }

// booking.service.ts

getBookingById(id: string): Observable<IHttpResponse<IBookMeetingDto>> {
    // The cURL shows the ID is a direct path parameter: /api/Meetings/{id}
    return this.get<IBookMeetingDto>(`${ApiUrls.Bookings.getBookingById}/${id}`);
}

updateBooking(meetingId: string, data: any): Observable<IHttpResponse<boolean>> {
    return this.put<boolean>(`${ApiUrls.Bookings.updateBooking}/${meetingId}`, data);
}


cancelBooking(meetingId: string): Observable<IHttpResponse<boolean>> {
    return this.delete<boolean>(ApiUrls.Bookings.cancelBooking, meetingId);
}

}

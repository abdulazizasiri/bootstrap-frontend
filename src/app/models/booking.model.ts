 import { IRoomListDto } from './room.model';

// export interface IBookingListDto {
//   id: number;
//   room: IRoomListDto;
//   userEmail: string;
//   title: string;
//   bookingDate: string;
//   startTime: string;
//   endTime: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string;
//   // status: 'PENDING' | 'APPROVED' | 'REJECTED';
// }


export interface IBookMeetingRequestDto {
  roomId: string;            // GUID
  MeetingDate: Date;       // Date string (YYYY-MM-DD)
  startTime: string;         // HH:mm:ss
  endTime: string;           // HH:mm:ss
  userId: string;            // GUID
  title: string;
  participantUserIds: string[];
}


// export interface IUpdateBookingDateDto {
//     bookingId: string
//   bookingDate: string;
//   startTime: string;
//   endTime: string;
// }

export interface IUpdateBookingDateDto {
  roomId: string
  meetingDate: string
  startTime: string
  endTime: string
  userId: string
  title: string
  participantUserIds: string[]
}




export interface ICancelBookingDto {
    bookingId: string
}

export interface IGetBookingDto {
    userId: string
}




// models/participant.model.ts
export interface IParticipant {
  email: string;
  displayNameAr: string;
  displayNameEn: string;
  jobTitleEn: string;
  jobTitleAr: string;
  departmentEn: string;
  departmentAr: string;
}

// models/book-meeting.dto.ts
export interface IBookMeetingDto {
  roomId: string;    
  meetingId:string;     
  meetingDate: string;   // Format: "YYYY-MM-DD" or ISO "2026-01-18T00:00:00"
  startTime: string;     // Format: "HH:mm:ss" (Matches C# TimeSpan)
  endTime: string;       // Format: "HH:mm:ss"
  userId: string;        // UUID string
  title: string;
  roomNameAr: string;
  roomNameEn: string;
 floor: string;       
 location: string;       
  participants: IParticipant[];
}
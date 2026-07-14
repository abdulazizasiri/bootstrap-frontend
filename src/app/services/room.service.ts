import { Injectable, Injector } from '@angular/core';
import { ICancelRoomDto, IRoomListDto, IUpdateRoomDateDto } from '../models/room.model';
import { Observable } from 'rxjs';
import { IHttpResponse } from '../models/http-response.model';
import { IPaginationResponse } from '../models/paginations.model';
import { ApiUrls } from './apis';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class RoomService   extends BaseService {

    constructor(injector: Injector ) {
        super(injector);
    }

    getAllRooms(): Observable<IPaginationResponse<IRoomListDto[]>> { // for internal all contracts only
        return this.get<IRoomListDto[]>(ApiUrls.Rooms.GetAllRooms);
    }


    getRoomById(id: string): Observable<IHttpResponse<IRoomListDto>> {
        const url = `${ApiUrls.Rooms.getRoomById}/${id}`
        return this.get<IRoomListDto>(url);
    }
    updateRoom(data: IUpdateRoomDateDto): Observable<IHttpResponse<boolean>> {
        return this.post<boolean>(ApiUrls.Rooms.updateRoom, data);
    }

    cancelRoom(data: ICancelRoomDto): Observable<IHttpResponse<boolean>> {
        return this.post<boolean>(`${ApiUrls.Rooms.cancelRoom}`, data);
    }

}

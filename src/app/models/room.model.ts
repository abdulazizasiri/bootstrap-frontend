export interface IRoomListDto {
  roomId: number;
  roomNameAr: string;
  roomNameEn: string;
  capacity: number;
  location?: string;
  floorNumber?: string;
  amenities?: string;
  available?: boolean;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: string;
}
  //  "roomId": "a5bf05cb-ddd1-483e-46ed-08de52a7a143",
  //     "roomNameAr": "قاعة رعوم",
  //     "roomNameEn": "Raoum",
  //     "floorNumber": 1,
  //     "location": "يمكـن الوصـول لهـا بعـد الخـروج مـن المصعـد وااللتفـاف مباشـرة يميًنًـا للدخـول مـن البـاب فـي الواجهـة.",
  //     "capacity": 5

export interface IUpdateRoomDateDto {
  roomId: string;
  nameAr: string;
  nameEn: string;
  capacity: number;
  location: string;
  floor: string;
  amenities: string;
  available: boolean;
}

export interface ICancelRoomDto {
  roomId: string;
}

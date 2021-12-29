export interface Room {
  id: number;
  name: string;
  public: Boolean;
}

export interface TeamPageParams {
  teamId: string;
  roomId: string;
}

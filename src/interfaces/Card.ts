export interface Card {
  _id?: string;
  bizName: string;
  bizAddress: string;
  bizDescription: string;
  bizPhone: string;
  bizImage: string;
  cardNumber?: number;
  user_id?: string;
}

export interface NFCUser {
  name: string;
  cardId: string;
}

export interface NFCPaymentData {
  user: NFCUser;
  timestamp: number;
}
declare global {
  namespace Express {
    export interface Request {
      merchant?: {
        merchant_id: string;
      };
    }
  }
}

export {};
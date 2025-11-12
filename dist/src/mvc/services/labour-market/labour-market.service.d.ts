declare const getLabourMarketStats: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          stats: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          stats?: undefined;
      }
>;
export { getLabourMarketStats };

export interface Home{
    user:{
        name : string
    }
    weather: {
        search: string,
        oneday: any,
        days: any,
        latest: any,
        loading: boolean,
        history: any[],
        mycoord: MyCoords,

    }
}
export interface MyCoords{
    lon: number |null ,
    lat: number | null,
}

export interface Details {
    country_code: string;
    country_name: string;
    city: string;
    postal: string;
    latitude: number;
    longitude: number;
    IPv4: string;
    state: string;
  }

  
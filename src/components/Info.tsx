class NetworkService {
    async get<T>(url: number): Promise<T> {
        const string: string = "https://api.openweathermap.org/data/2.5/weather?id=" + url + "&appid=6bcb75fd7a9411cd87f83c225d8a88ba";
        const response = await fetch(string);
        // console.log(response.json());
        return response.json();
    }
}

export const networkService = new NetworkService();
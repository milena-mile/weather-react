import { Coordinates } from "./types";

const getCoordinates = async (): Promise<Coordinates> => {
	const coordinates = async (): Promise<Coordinates> => {

		return new Promise<Coordinates>((resolve, reject) => {
			const success = (position: GeolocationPosition) => {
				const lat = position.coords.latitude;
				const long = position.coords.longitude;
				resolve({ latitude: lat, longitude: long });
			};
	
			const error = (err: GeolocationPositionError) => {
				console.error("Error getting geolocation:", err);
				reject(err);
			};
	
			navigator.geolocation.getCurrentPosition(success, error);
		});
	};

	try {
		const result = await coordinates();
		return result;
	} catch (error) {
		throw new Error(`Error: ${error}`);
	}
}



export default getCoordinates;

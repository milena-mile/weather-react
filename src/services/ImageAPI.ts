import { createApi } from 'unsplash-js';

const unsplash = createApi({ accessKey: 'mrPOb4v7LtLILDWijCFGh2ZfJJF17vdSM-pACjhmRTg' });
    
const CityPhoto = (city: string, setImage: React.Dispatch<React.SetStateAction<string | null>>) => 

    unsplash.search.getPhotos({ query: city }).then(result => {
        if (result.type === 'success') {

            if (result.response.results.length !== 0) {
                const random = Math.floor(Math.random() * result.response.results.length);
                setImage(result.response.results[random].urls.regular); 
            } else {
                CityPhoto('countryside', setImage);
            }
        } 

    }).catch(error => {
        console.error('Error fetching photo data:', error);
    });

export default CityPhoto;
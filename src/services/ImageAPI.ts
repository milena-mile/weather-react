import { createApi } from 'unsplash-js';

const unsplash = createApi({ accessKey: 'mrPOb4v7LtLILDWijCFGh2ZfJJF17vdSM-pACjhmRTg' });
    
const cityPhoto = async (city: string): Promise<string | undefined> => {
    const getPhoto = async (): Promise<string | undefined> => {
        return unsplash.search.getPhotos({ query: city }).then(result => {

            if (result.type === 'success') {
                
                if (result.response.total !== 0) {
                    const random = Math.floor(Math.random() * result.response.results.length);
                    const image = result.response.results[random].urls.regular;
                    return image;
                } else {
                    return cityPhoto('village houses');
                }
            } 

        }) 
    }

    try {
        const image = await getPhoto();
        return image;
    } catch (error) {
        console.log("No image");
    }
}

export default cityPhoto;
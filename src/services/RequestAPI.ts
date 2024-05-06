import { NetworkState } from "../components/Weather/types";

const requestAPI = async (link: string)  => {
    const request = async () => {
        return await fetch(link)
            .then(async response => {
                const res = await response.json();
                const state: "success" | "failed" = response.ok ? "success" : "failed";
                return {response: res, state: state};
            })
    }

    try {
        const data: NetworkState = await request();
        return data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
    
}

export default requestAPI;
import { defineStore } from "pinia";
import axios from "axios";
import { Storage } from "@ionic/storage";
const apiUrl = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";



export const useAddressStore = defineStore({
    id: "address",
    state: () => ({
        addressResponse: null,
        addressError: null,
streetResponse: null,
streetError: null,
houseError: null,
houseResponse: null,


    }),
    getters: {
        getPostsPerAuthor: (state) => {
            return (authorId) =>
                state.posts.filter((post) => post.userId === authorId);
        },
    },
    actions: {

        async getAddress(data) {
            const store = new Storage();
            await store.create();
            // let token = await store.get("token");
            // let tokenNew = JSON.parse(token)
            const token = "ee63c72fa9590201881afe30fe183845d05bd730";
            const secret = "84c2420618777d6f6a7dd20b197af4fecd456963";
            if (data?.name == 'city') {
                try {
                    await axios
                        .post(
                            `${apiUrl}`,
                            { query: data?.query, count: 15, from_bound: { value: 'city' }, to_bound: { value: 'settlement' } },
                            {
                                mode: 'cors',
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    "Content-Type": "application/json",
                                    Authorization: `Token ${token}`,
                                    // 'X-Secret': secret,
                                    // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                                    // "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
                                }
                            }
                        )
                        .then((response) => {
                            this.addressResponse = response.data
                            /* if (response.data?.status == false) {
                                this.$router.push('/auth')
                            } */
                        });
                } catch (error) {
                    this.addressError = error;
                }
            }
            if (data?.name == 'street') {
                try {
                    await axios
                        .post(
                            `${apiUrl}`,
                            {
                                query: data?.query,
                                count: 5,
                                from_bound: { value: 'street' },
                                to_bound: { value: 'street' },
                                locations: [
                                    {
                                        country_iso_code: "RU",
                                        region_iso_code: "RU-SA",
                                        city_fias_id: data?.city_fias_id,
                                        region_fias_id: data?.region_fias_id,
                                    },
                                ]
                            },
                            {
                                mode: 'cors',
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    "Content-Type": "application/json",
                                    Authorization: `Token ${token}`,
                                }
                            }
                        )
                        .then((response) => {
                            this.streetResponse = response.data
                        });
                } catch (error) {
                    this.streetError = error;
                }
            }
            if (data?.name == 'house') {
                try {
                    await axios
                        .post(
                            `${apiUrl}`,
                            {
                                query: data?.query,
                                count: 5,
                                from_bound: { value: 'house' },
                                to_bound: { value: 'house' },
                                locations: [
                                    {
                                        country_iso_code: "RU",
                                        region_iso_code: "RU-SA",
                                        city_fias_id: data?.city_fias_id,
                                        region_fias_id: data?.region_fias_id,
                                        street_fias_id: data?.street_fias_id,
                                    },
                                ]
                            },
                            {
                                mode: 'cors',
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    "Content-Type": "application/json",
                                    Authorization: `Token ${token}`,
                                }
                            }
                        )
                        .then((response) => {
                            this.houseResponse = response.data
                        });
                } catch (error) {
                    this.houseError = error;
                }
            }
            
        },
    },
});
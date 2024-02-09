import { defineStore } from "pinia";
import axios from "axios";
import { Storage } from "@ionic/storage";
const apiUrl = "https://crazy-haslett.89-253-229-86.plesk.page/api/mob/lc/";



export const useLcStore = defineStore({
    id: "lc",
    state: () => ({
        paymentsResponse: null,
        paymentsError: null,
        lcResponse: null,
        lcError: null,
        addLcResponse: null,
        addLcError: null,
    }),
    getters: {
        getPostsPerAuthor: (state) => {
            return (authorId) =>
                state.posts.filter((post) => post.userId === authorId);
        },
    },
    actions: {
        async getLcs() {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .get(
                        `${apiUrl}get`,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then(async(response) => { 
                        const store = new Storage();
                        await store.create();
                        await store.set("lc", JSON.stringify(response.data?.data));
                        this.lcResponse = response.data 
                    });
            } catch (error) {
                this.lcError = error;
            }
        },
        async addLc(data){
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .post(
                        `${apiUrl}add`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then(async(response) => { 
                        /* const store = new Storage();
                        await store.create();
                        await store.set("lc", JSON.stringify(response.data?.data)); */
                        this.addLcResponse = response.data 
                    });
            } catch (error) {
                this.addLcError = error;
            }
        },
        async getPayments(lc) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .get(
                        `${apiUrl}get/${lc}/payments`,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then((response) => (this.paymentsResponse = response.data));
            } catch (error) {
                this.paymentsError = error;
            }
        },

    },
});
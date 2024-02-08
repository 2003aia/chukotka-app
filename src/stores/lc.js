import { defineStore } from "pinia";
import axios from "axios";
import { Storage } from "@ionic/storage";
const apiUrl = "https://crazy-haslett.89-253-229-86.plesk.page/api/mob/lc/";



export const useLcStore = defineStore({
    id: "lc",
    state: () => ({
        notifResponse: null,
        notifError: null,
        lcResponse: null,
        lcError: null,
        
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
                    .then((response) => (this.lcResponse = response.data));
            } catch (error) {
                this.lcError = error;
            }
        },
        async getPayments(data) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .get(
                        `${apiUrl}get/${data.lc}/payments`,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then((response) => (this.notifResponse = response.data));
            } catch (error) {
                this.notifError = error;
            }
        },
        
    },
});
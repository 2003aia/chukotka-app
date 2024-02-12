import { defineStore } from "pinia";
import axios from "axios";
import { Storage } from "@ionic/storage";
const apiUrl = "https://crazy-haslett.89-253-229-86.plesk.page/api/mob/ticket/";



export const useAppealsStore = defineStore({
    id: "appeals",
    state: () => ({
        ticketResponse: null,
        ticketError: null,


    }),
    getters: {
        getPostsPerAuthor: (state) => {
            return (authorId) =>
                state.posts.filter((post) => post.userId === authorId);
        },
    },
    actions: {

        async getAppeals() {
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
                    .then((response) => {
                        this.ticketResponse = response.data
                        if (response.data?.status == false) {
                            this.$router.push('/auth')
                        }
                    });
            } catch (error) {
                this.ticketError = error;
            }
        },
        async followNotif() {
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
                    .then((response) => {
                        this.notifResponse = response.data
                        if (response.data?.status == false) {
                            this.$router.push('/auth')
                        }
                    });
            } catch (error) {
                this.notifError = error;
            }
        },
    },
});
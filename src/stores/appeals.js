import { defineStore } from "pinia";
import axios from "axios";
import { Storage } from "@ionic/storage";
const apiUrl = "https://crazy-haslett.89-253-229-86.plesk.page/api/mob/ticket/";



export const useAppealsStore = defineStore({
    id: "appeals",
    state: () => ({
        ticketResponse: null,
        ticketError: null,
        createResponse: null,
        createError: null,

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
        async createTicket(data) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            let formData = new FormData
            formData.append('file', data?.files)
            formData.append('category_id', data?.category_id)
            formData.append('message', data?.message)

            try {
                await axios
                    .post(
                        `${apiUrl}create`,
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then((response) => {
                        this.createResponse = response.data
                       /*  if (response.data?.status == false) {
                            this.$router.push('/auth')
                        } */
                    });
            } catch (error) {
                this.createError = error;
            }
        },
    },
});
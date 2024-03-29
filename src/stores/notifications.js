import { defineStore } from "pinia";
import axios from "axios";
import { Storage } from "@ionic/storage";
const apiUrl = "https://crazy-haslett.89-253-229-86.plesk.page/api/mob/notice/";



export const useNotifStore = defineStore({
    id: "notif",
    state: () => ({
        notifResponse: null,
        notifError: null,
        subscribeResponse: null,
        subscribeError: null,

    }),
    getters: {
        getPostsPerAuthor: (state) => {
            return (authorId) =>
                state.posts.filter((post) => post.userId === authorId);
        },
    },
    actions: {

        async getNotif() {
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
                            // this.$router.push('/auth')
                        }
                    });
            } catch (error) {
                this.notifError = error;
            }
        },
        async subscribe() {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .get(
                        `${apiUrl}subscribe`,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then(async (response) => {
                        if (response.data?.status == true) {
                            const store = new Storage();
                            await store.create();
                            await store.set("subscribe", true);
                        } else {
                            // this.$router.push('/auth')
                        }

                        this.subscribeResponse = response.data
                    });
            } catch (error) {
                this.subscribeError = error;
            }
        },
        async unsubscribe() {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .get(
                        `${apiUrl}unsubscribe`,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then(async (response) => {
                        if (response.data?.status == true) {
                            const store = new Storage();
                            await store.create();
                            await store.set("subscribe", false);
                        } else {
                            // this.$router.push('/auth')
                        }
                        this.subscribeResponse = response.data
                    });
            } catch (error) {
                this.subscribeError = error;
            }
        },
    },
});
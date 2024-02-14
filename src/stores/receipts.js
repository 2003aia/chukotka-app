import { defineStore } from "pinia";
import axios from "axios";
import { Storage } from "@ionic/storage";
const apiUrl = "https://crazy-haslett.89-253-229-86.plesk.page/api/mob/document/";



export const useReceiptStore = defineStore({
    id: "receipt",
    state: () => ({
        receiptsResponse: null,
        receiptsError: null,
        contractsError: null,
        contractsResponse : null,
        noticesError: null,
        noticesResponse: null,
        sendAllResponse: null,
        sendAllError: null,
        downloadAllResponse: null,
        downloadAllError: null,
        downloadResponse: null,
        downloadError: null,
    
    }),
    getters: {
        getPostsPerAuthor: (state) => {
            return (authorId) =>
                state.posts.filter((post) => post.userId === authorId);
        },
    },
    actions: {

        async getReceipts(lc) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            
            try {
                await axios
                    .get(
                        `${apiUrl}get/receipts${lc?.length > 0 ? `?lc=${lc}` : ''}`,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then((response) => {
                        this.receiptsResponse = response.data
                        if (response.data?.status == false) {
                            // this.$router.push('/auth')
                        }
                    });
            } catch (error) {
                this.receiptsError = error;
            }
        },
        async getContracts(lc) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .get(
                        `${apiUrl}get/contracts${lc?.length > 0 ? `?lc=${lc}` : ''}`,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then((response) => {
                        this.contractsResponse = response.data
                        if (response.data?.status == false) {
                            // this.$router.push('/auth')
                        }
                    });
            } catch (error) {
                this.contractsError = error;
            }
        },
        async getNotices(lc) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .get(
                        `${apiUrl}get/notices${lc?.length > 0 ? `?lc=${lc}` : ''}`,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then((response) => {
                        this.noticesResponse = response.data
                        if (response.data?.status == false) {
                            // this.$router.push('/auth')
                        }
                    });
            } catch (error) {
                this.noticesError = error;
            }
        },
        async downloadReceipt(data) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .post(
                        `${apiUrl}download`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then(async (response) => {
                        if (response.data?.status == true) {
                            console.log('sendAll')
                        } else {
                            // this.$router.push('/auth')
                        }

                        this.downloadResponse = response.data
                    });
            } catch (error) {
                this.downloadError = error;
            }
        },
        async downloadAllReceipts(data) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .post(
                        `${apiUrl}archieve`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then(async (response) => {
                        if (response.data?.status == true) {
                            console.log('sendAll')
                        } else {
                            // this.$router.push('/auth')
                        }

                        this.downloadAllResponse = response.data
                    });
            } catch (error) {
                this.downloadAllError = error;
            }
        },
        async sendAllReceiptsToEmail(data) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .post(
                        `${apiUrl}send`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then(async (response) => {
                        if (response.data?.status == true) {
                            console.log('sendAll')
                        } else {
                            // this.$router.push('/auth')
                        }

                        this.sendAllResponse = response.data
                    });
            } catch (error) {
                this.sendAllError = error;
            }
        },

    },
});
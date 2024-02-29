import { defineStore } from "pinia";
import axios from "axios";
import { Storage } from "@ionic/storage";
const apiUrl = "https://crazy-haslett.89-253-229-86.plesk.page/api/mob/lc/";
const apiUrl2 = "https://crazy-haslett.89-253-229-86.plesk.page/api/mob/meter/send/";


export const useLcStore = defineStore({
    id: "lc",
    state: () => ({
        paymentsResponse: null,
        paymentsError: null,
        invoicesResponse: null,
        invoicesError: null,
        lcResponse: null,
        lcsMod: [],
        lcError: null,
        lcInfoResponse: null,
        lcInfoError: null,
        addLcResponse: null,
        addLcError: null,
        deleteLcResponse: null,
        deleteLcError: null,
        addIndiceResponse: null,
        addIndiceError: null,
    }),
    getters: {
        getPostsPerAuthor: (state) => {
            return (authorId) =>
                state.posts.filter((post) => post.userId === authorId);
        },
    },
    actions: {
        async getLcs() {
            this.lcsMod = []
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
                    .then(async (response) => {
                        const store = new Storage();
                        await store.create();
                        await store.set("lc", JSON.stringify(response.data?.data));
                        this.lcResponse = response.data
                        if (response.data?.status == false) {
                            // this.$router.push('/auth')
                        }
                    });
            } catch (error) {
                this.lcError = error;
            }
        },
        async getLc(lc) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .get(
                        `${apiUrl}get/${lc}/main`,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then(async (response) => {
                        this.lcInfoResponse = response.data
                        if (response.data?.status == false) {
                            // this.$router.push('/auth')
                        }
                    });
            } catch (error) {
                this.lcInfoError = error;
            }
        },
        async addIndice(data) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .post(
                        `${apiUrl2}${data?.lc}`,
                        {
                            number: data?.number,
                            p1: data?.p1,
                            p2: data?.p2
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then(async (response) => {
                        /* const store = new Storage();
                        await store.create();
                        await store.set("lc", JSON.stringify(response.data?.data)); */
                        this.addIndiceResponse = response.data
                        if (response.data?.status == false) {
                            // this.$router.push('/auth')
                        }
                    });
            } catch (error) {
                this.addIndiceError = error;
            }
        },
        async deleteLc(lc) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .post(
                        `${apiUrl}delete`,
                        { lc_id: lc },
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then(async (response) => {
                        /* const store = new Storage();
                        await store.create();
                        await store.set("lc", JSON.stringify(response.data?.data)); */
                        this.deleteLcResponse = response.data
                        if (response.data?.status == false) {
                            // this.$router.push('/auth')
                        }
                    });
            } catch (error) {
                this.deleteLcError = error;
            }
        },
        async addLc(data) {
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
                    .then(async (response) => {
                        /* const store = new Storage();
                        await store.create();
                        await store.set("lc", JSON.stringify(response.data?.data)); */
                        this.addLcResponse = response.data
                        if (response.data?.status == false) {
                            // this.$router.push('/auth')
                        }
                    });
            } catch (error) {
                this.addLcError = error;
            }
        },
        async getInvoices(lc) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .get(
                        `${apiUrl}get/${lc}/invoices`,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then((response) => {
                        this.invoicesResponse = response.data
                        if (response.data?.status == false) {
                            // this.$router.push('/auth')
                        }
                    });
            } catch (error) {
                this.invoicesError = error;
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
                    .then((response) => {
                        this.paymentsResponse = response.data
                        if (response.data?.status == false) {
                            // this.$router.push('/auth')
                        }
                    });
            } catch (error) {
                this.paymentsError = error;
            }
        },
    },
});
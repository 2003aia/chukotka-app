import { defineStore } from "pinia";
import axios from "axios";
import { Storage } from "@ionic/storage";
const apiUrl = "https://crazy-haslett.89-253-229-86.plesk.page/api/mob/user/";



export const useLoginStore = defineStore({
    id: "login",
    state: () => ({
        registrResponse: null,
        registrError: null,
        registrResponse2: null,
        authError: null,
        authResponse: null,
        passRecoveryResponse: null,
        passRecoveryError: null,
        changePassResponse: null,
        changePassError: null,
        updateLogin: false,
        userResponse: null,
        userError: null,
        codeResponse: null,
        codeError: null,
    }),
    getters: {
        getPostsPerAuthor: (state) => {
            return (authorId) =>
                state.posts.filter((post) => post.userId === authorId);
        },
    },
    actions: {
        async authUser(login, password) {
            
            try {
                await axios
                    .post(
                        `${apiUrl}auth`,
                        {
                            login: login,
                            password: password
                        },
                    )
                    .then(async(response) => {
                        this.authResponse = response.data
                        if(response.data.status == true) {
                            const store = new Storage();
                            await store.create();
                            await store.set("token", JSON.stringify(response.data?.data?.token?.access_token));
                        }
                        
                    });
            } catch (error) {
                this.authError = error;
            }
        },
        async registrUser(data) {
            console.log(data)
            // const store = new Storage();
            // await store.create();
            // await store.set("token", JSON.stringify({ login: login }));
            try {
                await axios
                    .post(
                        `${apiUrl}register/fiz`,
                        {
                            name: data.name,
                            lastname: data.lastname,
                            secondname: data.secondname,
                            email: data.email,
                            tel: data.tel,
                            login: data.login,
                            password: data.password,
                            password_confirm: data.password
                        },
                    )
                    .then(async(response) => {
                        const store = new Storage();
                        await store.create();
                        let token = await store.get("token");
                        let tokenNew = JSON.parse(token)
                        await axios.get(
                            `${apiUrl}verification`,
                            {
                                headers: {
                                    Authorization: `Bearer ${tokenNew}`
                                }
                            }
                        )
                        this.registrResponse = response.data
                    });
            } catch (error) {
                this.registrError = error;
            }
        },
        async confirm(data) {
            console.log(data)
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .post(
                        `${apiUrl}confirmation`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then((response) => (this.codeResponse = response.data));
            } catch (error) {
                this.codeError = error;
            }
        },
        async passwordRecovery(data) {
            console.log(data)
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios
                    .post(
                        `${apiUrl}recovery`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then((response) => (this.passRecoveryResponse = response.data));
            } catch (error) {
                this.passRecoveryError = error;
            }
        },
        async getUser() {
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
                        this.userResponse = response.data
                        if(response.data.status == true) {
                            const store = new Storage();
                            await store.create();
                            await store.set("user", JSON.stringify(response.data?.data));
                        }
                       
                    });
            } catch (error) {
                this.userError = error;
            }
        },
        async editUser(data) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios.post(
                        `${apiUrl}edit`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then(async(response) => {
                        this.userResponse = response.data
                        if(response.data.status == true) {
                            const store = new Storage();
                            await store.create();
                            await store.set("user", JSON.stringify(response.data?.data));
                        }
                       
                    });
            } catch (error) {
                this.userError = error;
            }
        },
        async editPassword(data) {
            const store = new Storage();
            await store.create();
            let token = await store.get("token");
            let tokenNew = JSON.parse(token)
            try {
                await axios.post(
                        `${apiUrl}changepassword`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenNew}`
                            }
                        }
                    )
                    .then(async(response) => {
                        this.changePassResponse = response.data
                        /* if(response.data.status == true) {
                            const store = new Storage();
                            await store.create();
                            await store.set("user", JSON.stringify(response.data?.data));
                        } */
                       
                    });
            } catch (error) {
                this.changePassError = error;
            }
        },
    },
});
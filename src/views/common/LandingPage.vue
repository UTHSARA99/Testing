<template>
    <v-app>
        <v-layout>
            <v-app-bar id="app-bar" color="rgba(241, 244, 254, 1)">
                <v-row align="center">
                    <v-col cols="auto">
                        <!-- Image on the left, 10px from the left corner -->
                        <router-link to="/"><v-img src="@/assets/survey-y-logo.png" alt="Your Image"
                                style="margin-left: 50px; height: 40px; width: 90px"></v-img></router-link>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                        <span class="title">Already a user! &nbsp; &nbsp;</span>
                        <router-link to="/login" style="text-decoration: none; color: black;"><v-btn class="custom-button"
                                color="blue" variant="outlined" position="relative">
                                Login
                            </v-btn>
                        </router-link>
                    </v-col>
                </v-row>
            </v-app-bar>


            <!-- <div class="main_content"> -->
            <v-img src="/src/assets/survey-data-collecting-background.png" alt="Your Image" class="main_content_img"
                cover></v-img>
            <v-container fluid class="d-flex align-center justify-center" style="height: 100vh; width: 100vh;">

                <v-main style="margin-bottom: 80px;">

                    <v-row>
                        <v-col cols="12">
                            <h1 style="font-weight:800;">Welcome to Survey Y.</h1>
                            <h1>Conducting Researches and Surveys has never been easier.</h1>
                            <h2 class="">Whole new experience in conducting, <br><span id="typewriter">{{ text }}</span>
                            </h2>
                            <br>
                            <h4> Not registered yet?</h4>
                            <router-link to="/signup"><v-btn color="blue">Register Today</v-btn></router-link>

                            <br>
                            <br>


                            <v-btn color="blue" flat>Get Started ></v-btn>

                        </v-col>
                    </v-row>
                    <FooterDefault></FooterDefault>
                </v-main>

            </v-container>
            <!-- </div> -->
        </v-layout>
    </v-app>
</template>
  
<script>
import FooterDefault from "../../components/common/Footer-Default.vue";
export default {

    components: {
        FooterDefault,
    },

    name: 'LandingPage',

    data() {
        return {
            messages: ["Researches", "Surveys", "Questionnaires"], // Messages to be displayed
            text: "", // The text being typed
            currentMessage: "", // The current message
            messageIndex: 0, // Index of the current message
            timer: null, // Timer for changing the message
            typingSpeed: 50, // Adjust typing speed in milliseconds
        };
    },

    created() {
        this.startTyping();
    },

    methods: {
        redirectToLogin() {
            this.$router.push({ name: 'login' }); // Add a route for the login page
        },
        redirectToSignup() {
            this.$router.push({ name: 'signup' }); // Add a route for the signup page
        },


        async typeMessage() {
            const message = this.messages[this.currentMessageIndex];

            for (let i = 0; i <= message.length; i++) {
                this.text = message.slice(0, i);
                await new Promise((resolve) => setTimeout(resolve, this.typingSpeed));
            }
        },

        async startTyping() {
            this.currentMessageIndex = 0;
            while (true) {
                await this.typeMessage();
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
                this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
            }
        },


    },

    beforeDestroy() {
        // Clean up the timer to avoid memory leaks
        clearInterval(this.timer);
    },



};
</script>
  
<style scoped>
.main_content_img {
    opacity: 0.15;
    margin: 0;
    padding: 0;
    position: absolute;
    z-index: -2;
    height: 100vh;
    width: 100vw;
}

#typewriter {
    border-right: 0.15em solid orange;
    white-space: nowrap;
    overflow: hidden;
    width: 10ch;
    animation: typing 3s steps(10, end), blink-caret 0.75s step-end infinite;
    text-decoration: solid;
    color: white;
    background-color: black;
    padding: 4px;
    border-radius: 5px;
}</style>

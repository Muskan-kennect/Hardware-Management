<template>
    <div class="landing-page">
      <v-app>
        <v-main>
          <v-container fluid>
            <v-row align="center" justify="center">
              <v-col class="text-center">
                <!-- Animated logo -->
                <div class="animated-logo"><div class="lds-hourglass"></div></div>
  
                <!-- Title with 40% top margin -->
                <h1 class="display-2 title">Hardware Management System</h1>
  
                <!-- Loading spinner -->
                <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
  
                <!-- Animated text (fade-in) -->
                <transition name="fade">
                  <p v-if="!loading" class="animated-text">Welcome to our system!</p>
                </transition>
  
                <!-- Login button (fade-in after loading) -->
                <transition name="fade">
                    <router-link v-if="!loading" :to="{ path: '/login' }" class="login-btn">
                        <v-btn color="primary">Get Started</v-btn>
                    </router-link>
                </transition>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loading: true,
      };
    },
    mounted() {
      // Simulate loading for demonstration purposes
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
    methods: {
      login() {
        // Handle login logic here
        console.log("Login button clicked!");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  .landing-page {
    height: 100vh;
    display: flex;
    background-color: white  !important;;
    background-color: inherit;
    align-items: center;
    justify-content: center;
  }
  
  .title {
    margin-top: 10vh; /* 40% from the top */
    font-size: larger;
  }
  
  .animated-logo {
    width: 100px; /* Set the desired width */
    height: 100px; /* Set the desired height */
    background-color: #3498db; /* Set the background color */
    border-radius: 50%; /* Make it a circle */
    margin-top: 40%;
    margin-left: 30%;
    animation: spin 2s linear infinite; /* Add a spinning animation */
  }
  
  .animated-text {
    opacity: 0;
    animation: fadeIn 2s ease-in-out;
  }
  
  .login-btn {
    margin-top: 20px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 1;
  }
  
  .lds-hourglass {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-hourglass 1.2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
  </style>
  
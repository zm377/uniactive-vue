<script setup lang="ts">
import {ref, onMounted, reactive} from "vue";

// images
import classesBg from "@/assets/images/classes-bg.png";
import heroBg from "@/assets/images/hero-bg.png";
import footerBg from "@/assets/images/footer-bg.png";

// Components form libraries
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiArrowUpDropCircleOutline} from '@mdi/js';
import {mdiFacebook} from '@mdi/js';
import {mdiInstagram} from '@mdi/js';
import {mdiMapMarker} from '@mdi/js';
import {mdiPhone} from '@mdi/js';
import {mdiHeartPulse} from '@mdi/js';

// Define data variables
const header = ref();
let activeHeader = ref(false);
let activeNavbar = ref(false);

let thisYear = reactive(() => {
  return new Date().getFullYear();
})


onMounted(() => {
  /**
   * header & back top btn active
   */
  window.addEventListener("scroll", () => {
    activeHeader.value = window.scrollY >= 100;
  });
});

const closeNavbar = function () {
  activeNavbar.value = false;
}

</script>

<template>
  <div class="welcome">

    <!--
      - #HEADER
    -->
    <header
        ref="header"
        class="header"
        :class="{ active: activeHeader }"
        data-header
    >
      <div class="container">
        <a href="#" class="logo"> Uni<span class="span">Active</span> </a>

        <nav class="navbar" :class="activeNavbar">
          <button class="nav-close-btn" aria-label="close menu" @click="()=>{activeNavbar=!activeNavbar}">
            <ion-icon name="close-sharp" aria-hidden="true"></ion-icon>
          </button>

          <ul class="navbar-list">
            <li>
              <a href="#" class="navbar-link active" @click="closeNavbar">Home</a>
            </li>

            <li>
              <a href="#about" class="navbar-link" @click="closeNavbar">About Us</a>
            </li>

            <li>
              <a href="#class" class="navbar-link" @click="closeNavbar">Classes</a>
            </li>

            <li>
              <a href="#event" class="navbar-link" @click="closeNavbar">Event</a>
            </li>

            <li>
              <a href="#" class="navbar-link" @click="closeNavbar">Contact Us</a>
            </li>
          </ul>
        </nav>

        <a href="/login" class="btn btn-secondary">Member Login</a>

        <button class="nav-open-btn" aria-label="open menu" data-nav-toggler>
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </button>
      </div>
    </header>

    <main>
      <article>
        <!--
          - #HERO
        -->

        <section
            class="section hero bg-dark has-after has-bg-image"
            id="home"
            aria-label="hero"
            data-section
            :style="{ 'background-image': `url(${heroBg})` }"
        >
          <div class="container">
            <div class="hero-content">
              <h1 class="h1 hero-title">YOUR ULTIMATE FITNESS DESTINATION</h1>

              <a href="/signup" class="btn btn-primary">Join Now</a>
            </div>

            <div class="hero-banner">
              <img
                  src="@/assets/images/hero-banner.png"
                  width="660"
                  height="753"
                  alt="hero banner"
                  class="w-100"
              />

              <img
                  src="@/assets/images/hero-circle-one.png"
                  width="666"
                  height="666"
                  aria-hidden="true"
                  alt=""
                  class="circle circle-1"
              />
              <img
                  src="@/assets/images/hero-circle-two.png"
                  width="666"
                  height="666"
                  aria-hidden="true"
                  alt=""
                  class="circle circle-2"
              />

              <img
                  src="@/assets/images/heart-rate.svg"
                  width="255"
                  height="270"
                  alt="heart rate"
                  class="abs-img abs-img-1"
              />
              <img
                  src="@/assets/images/calories.svg"
                  width="348"
                  height="224"
                  alt="calories"
                  class="abs-img abs-img-2"
              />
            </div>
          </div>
        </section>

        <!--
          - #ABOUT
        -->

        <section class="section about" id="about" aria-label="about">
          <div class="container">
            <div class="about-banner has-after">
              <img
                  src="@/assets/images/about-banner.png"
                  width="660"
                  height="648"
                  loading="lazy"
                  alt="about banner"
                  class="w-100"
              />

              <img
                  src="@/assets/images/about-circle-one.png"
                  width="660"
                  height="534"
                  loading="lazy"
                  aria-hidden="true"
                  alt=""
                  class="circle circle-1"
              />
              <img
                  src="@/assets/images/about-circle-two.png"
                  width="660"
                  height="534"
                  loading="lazy"
                  aria-hidden="true"
                  alt=""
                  class="circle circle-2"
              />

              <img
                  src="@/assets/images/fitness.png"
                  width="650"
                  height="154"
                  loading="lazy"
                  alt="fitness"
                  class="abs-img w-100"
              />
            </div>

            <div class="about-content">
              <h3 class="h3 section-title">OPERATING HOURS</h3>
              <h4 class="h4 font-weight-bold">WOLLONGONG MAIN CAMPUS</h4>
              <p class="border pa-2">
                Monday – Friday
                <br/>
                Gym: 5:30AM – 9PM
                <br/>
                Reception: 8AM – 9PM
                <br/>
                Saturday & Sunday
                <br/>
                Gym: 8AM – 5PM
                <br/>
                Reception: 8AM – 5PM
                <br/>
                To book the squash courts, tennis courts and the sports hall, call 4221 4700.
              </p>

              <h4 class="h4 font-weight-bold">AQUATIC CENTRE</h4>
              <p class="border pa-2">
                Monday, Wednesday & Friday: 5.30AM – 6PM
                <br/>
                Tuesday & Thursday: 5:30AM – 7:30PM
                <br/>
                Saturday: 8AM – 12PM
                <br/>
                Sunday: 8AM – 12PM
                <br/>
                For Lap Swimming times please refer to our Lane Availability Schedules.
              </p>

              <div class="wrapper">
                <a href="#" class="btn btn-primary">Join Now</a>
              </div>
            </div>
          </div>
        </section>

        <!--
          - #CLASS
        -->

        <section
            class="section class bg-dark has-bg-image"
            id="class"
            aria-label="class"
            :style="{ 'background-image': `url(${classesBg})` }"
        >
          <div class="container">
            <p class="section-subtitle">Our Classes</p>

            <h2 class="h2 section-title text-center">
              Fitness Classes For Every Goal
            </h2>

            <ul class="class-list has-scrollbar">
              <li class="scrollbar-item">
                <div class="class-card">
                  <figure
                      class="card-banner img-holder"
                      style="--width: 416; --height: 240"
                  >
                    <img
                        src="@/assets/images/class-1.jpg"
                        width="416"
                        height="240"
                        loading="lazy"
                        alt="Weight Lifting"
                        class="img-cover"
                    />
                  </figure>

                  <div class="card-content">
                    <div class="title-wrapper">
                      <img
                          src="@/assets/images/class-icon-1.png"
                          width="52"
                          height="52"
                          aria-hidden="true"
                          alt=""
                          class="title-icon"
                      />

                      <h3 class="h3">
                        <a href="#" class="card-title">STRENGTH & WEIGHTS</a>
                      </h3>
                    </div>

                    <p class="card-text">
                      A wide variety of the most up to date Hammer Strength professional training equipment.
                    </p>

                    <div class="card-progress">
                      <div class="progress-wrapper">
                        <p class="progress-label">Class Full</p>

                        <span class="progress-value">85%</span>
                      </div>

                      <div class="progress-bg">
                        <div class="progress-bar" style="width: 85%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li class="scrollbar-item">
                <div class="class-card">
                  <figure
                      class="card-banner img-holder"
                      style="--width: 416; --height: 240"
                  >
                    <img
                        src="@/assets/images/class-2.jpg"
                        width="416"
                        height="240"
                        loading="lazy"
                        alt="Cardio & Strenght"
                        class="img-cover"
                    />
                  </figure>

                  <div class="card-content">
                    <div class="title-wrapper">
                      <img
                          src="@/assets/images/class-icon-2.png"
                          width="52"
                          height="52"
                          aria-hidden="true"
                          alt=""
                          class="title-icon"
                      />

                      <h3 class="h3">
                        <a href="#" class="card-title">CARDIO</a>
                      </h3>
                    </div>

                    <p class="card-text">
                      Over 40 pieces of cardio equipment featuring the latest interactive technology.
                      Track your workouts, watch TV and listen to music whilst you train.
                    </p>

                    <div class="card-progress">
                      <div class="progress-wrapper">
                        <p class="progress-label">Class Full</p>

                        <span class="progress-value">83%</span>
                      </div>

                      <div class="progress-bg">
                        <div class="progress-bar" style="width: 70%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li class="scrollbar-item">
                <div class="class-card">
                  <figure
                      class="card-banner img-holder"
                      style="--width: 416; --height: 240"
                  >
                    <img
                        src="@/assets/images/class-3.jpg"
                        width="416"
                        height="240"
                        loading="lazy"
                        alt="Power Yoga"
                        class="img-cover"
                    />
                  </figure>

                  <div class="card-content">
                    <div class="title-wrapper">
                      <img
                          src="@/assets/images/class-icon-3.png"
                          width="52"
                          height="52"
                          aria-hidden="true"
                          alt=""
                          class="title-icon"
                      />

                      <h3 class="h3">
                        <a href="#" class="card-title">GROUP FITNESS</a>
                      </h3>
                    </div>

                    <p class="card-text">
                      Offering over 75 Group Fitness classes each week across two great locations.
                      A mix of Les Mills classes, FMT & HITT, yoga program plus a number of water classes.
                    </p>

                    <div class="card-progress">
                      <div class="progress-wrapper">
                        <p class="progress-label">Class Full</p>

                        <span class="progress-value">91%</span>
                      </div>

                      <div class="progress-bg">
                        <div class="progress-bar" style="width: 90%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li class="scrollbar-item">
                <div class="class-card">
                  <figure
                      class="card-banner img-holder"
                      style="--width: 416; --height: 240"
                  >
                    <img
                        src="@/assets/images/class-4.jpg"
                        width="416"
                        height="240"
                        loading="lazy"
                        alt="The Fitness Pack"
                        class="img-cover"
                    />
                  </figure>

                  <div class="card-content">
                    <div class="title-wrapper">
                      <img
                          src="@/assets/images/class-icon-4.png"
                          width="52"
                          height="52"
                          aria-hidden="true"
                          alt=""
                          class="title-icon"
                      />

                      <h3 class="h3">
                        <a href="#" class="card-title">FITNESS SERVICES</a>
                      </h3>
                    </div>

                    <p class="card-text">
                      Motivated and highly skilled trainers ready to assist in programs aimed at reaching your
                      individual fitness goals.
                    </p>

                    <div class="card-progress">
                      <div class="progress-wrapper">
                        <p class="progress-label">Class Full</p>

                        <span class="progress-value">72%</span>
                      </div>

                      <div class="progress-bg">
                        <div class="progress-bar" style="width: 60%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!--
          - #Event
        -->

        <section class="section event" id="event" aria-label="Event">
          <div class="container">
            <ul class="event-list has-scrollbar">
              <li class="scrollbar-item">
                <div class="event-card">
                  <div
                      class="card-banner img-holder"
                      style="--width: 440; --height: 270"
                  >
                    <img
                        src="@/assets/images/event-1.jpg"
                        width="440"
                        height="270"
                        loading="lazy"
                        alt="Going to the gym for the first time"
                        class="img-cover"
                    />

                    <time class="card-meta" datetime="2022-07-07"
                    >7 July 2022
                    </time
                    >
                  </div>

                  <div class="card-content">
                    <h3 class="h3">
                      <a href="#" class="card-title"
                      >24/7 Facility</a
                      >
                    </h3>

                    <p class="card-text">
                      Whether you’re into lifting weights, joining a group exercise class,
                      some laps in the pool or prefer to jump on a treadmill or bike, we have a membership pass to suit
                      you.
                    </p>

                    <a href="#" class="btn-link has-before">Read More</a>
                  </div>
                </div>
              </li>

              <li class="scrollbar-item">
                <div class="event-card">
                  <div
                      class="card-banner img-holder"
                      style="--width: 440; --height: 270"
                  >
                    <img
                        src="@/assets/images/event-2.jpg"
                        width="440"
                        height="270"
                        loading="lazy"
                        alt="Parturient accumsan cacus pulvinar magna"
                        class="img-cover"
                    />

                    <time class="card-meta" datetime="2022-07-07"
                    >7 July 2022
                    </time
                    >
                  </div>

                  <div class="card-content">
                    <h3 class="h3">
                      <a href="#" class="card-title"
                      >Flexibility</a
                      >
                    </h3>

                    <p class="card-text">
                      You read that correctly – we offer flexibility to opt-out or place your membership on hold at any
                      time.
                    </p>

                    <a href="#" class="btn-link has-before">Read More</a>
                  </div>
                </div>
              </li>

              <li class="scrollbar-item">
                <div class="event-card">
                  <div
                      class="card-banner img-holder"
                      style="--width: 440; --height: 270"
                  >
                    <img
                        src="@/assets/images/event-3.jpg"
                        width="440"
                        height="270"
                        loading="lazy"
                        alt="Pool Lane Availability"
                        class="img-cover"
                    />

                    <time class="card-meta" datetime="2022-07-07"
                    >7 July 2022
                    </time
                    >
                  </div>

                  <div class="card-content">
                    <h3 class="h3">
                      <a href="#" class="card-title"
                      >Memberships For Every Fit </a
                      >
                    </h3>

                    <p class="card-text">
                      Whether you’re into lifting weights, joining a group exercise class,
                      some laps in the pool or prefer to jump on a treadmill or bike, we have a membership pass to suit
                      you.
                    </p>

                    <a href="#" class="btn-link has-before">Read More</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </article>
    </main>

    <!--
      - #FOOTER
    -->

    <footer class="footer">
      <div
          class="section footer-top bg-dark has-bg-image"
          :style="{ 'background-image': `url(${footerBg})` }"
      >
        <div class="container">
          <div class="footer-brand">
            <p>
              <a href="https://www.uow.edu.au/" class="logo">
                <img src="@/assets/images/footer-uow.png" width="300" height="247" alt="logo"/>
              </a>
            </p>
            <p class="footer-brand-text">
              <a href="https://www.uow.edu.au/" class="logo">
                <img src="@/assets/images/footer-pulse.png" width="320" alt="logo"/>
              </a>
            </p>
            <p class="footer-brand-text">
              <img src="@/assets/images/footer-acnc.png" width="120" alt="logo"/>
            </p>
          </div>

          <ul class="footer-list">
            <li>
              <p class="footer-list-title has-before">Our Links</p>
            </li>

            <li>
              <a href="#" class="footer-link">Home</a>
            </li>

            <li>
              <a href="#" class="footer-link">About Us</a>
            </li>

            <li>
              <a href="#" class="footer-link">Classes</a>
            </li>

            <li>
              <a href="#" class="footer-link">Event</a>
            </li>

            <li>
              <a href="#" class="footer-link">Contact Us</a>
            </li>
          </ul>

          <ul class="footer-list">
            <li>
              <p class="footer-list-title has-before">Contact Us</p>
            </li>

            <li class="footer-list-item">
              <div class="icon">
                <svg-icon type="mdi" :path="mdiPhone"></svg-icon>
              </div>

              <div>
                <a href="tel:28915832337" class="footer-link">ABN 28 915 832 337</a>

                <a href="tel:081114089" class="footer-link"
                >ACN 081 114 089</a
                >
              </div>
            </li>

            <li class="footer-list-item contact">
              <div class="icon">
                <svg-icon type="mdi" :path="mdiMapMarker"></svg-icon>
              </div>

              <address class="address footer-link">
                Building 11, University of Wollongong NSW 2522 Australia
              </address>
            </li>

            <li class="footer-list-item">
              <div class="icon">
                <svg-icon type="mdi" :path="mdiHeartPulse"></svg-icon>
              </div>

              <div>
                UOW Pulse provides top quality campus life and services.
              </div>
            </li>
          </ul>

          <ul class="footer-list">
            <li>
              <p class="footer-list-title has-before">Find Us On</p>
            </li>
            <li>
              <ul class="social-list">
                <li>
                  <a href="https://www.facebook.com/uowuniactive/" target="_blank" class="social-link">
                    <svg-icon type="mdi" :path="mdiFacebook"></svg-icon>
                  </a>
                </li>

                <li>
                  <a href="https://www.instagram.com/uowuniactive/" target="_blank" class="social-link">
                    <svg-icon type="mdi" :path="mdiInstagram"></svg-icon>
                  </a>
                </li>

                <li>
                  <a href="https://twitter.com/uow_uniactive" target="_blank" class="social-link svg-font">
                    <svg viewBox="0 0 24 24" aria-hidden="true"
                         class="r-18jsvk2 r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp">
                      <g>
                        <path
                            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                      </g>
                    </svg>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container">
          <p class="copyright">
            &copy; {{ thisYear() }} UniActive. All Rights Reserved By
            <a href="https://github.com/zm377" class="copyright-link">Zhifei Mi.</a>
          </p>

          <ul class="footer-bottom-list">
            <li>
              <a href="https://pulse.uow.edu.au/governance/#policy-dir" class="footer-bottom-link has-before">Privacy
                Policy</a>
            </li>

            <li>
              <a href="https://www.uow.edu.au/about/feedback/?ssSourceSiteId=unicentre/"
                 class="footer-bottom-link has-before"
              >Feedback</a
              >
            </li>
          </ul>
        </div>
      </div>
    </footer>

    <!--
      - #BACK TO TOP
    -->

    <a
        href="#top"
        class="back-top-btn"
        :class="{ active: activeHeader }"
        aria-label="back to top"
    >
      <svg-icon type="mdi" size="36" :path="mdiArrowUpDropCircleOutline"></svg-icon>
    </a>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/css/welcome";
</style>

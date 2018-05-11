import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';

declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      window["ApiAIPlugin"].init(
        {
          clientAccessToken: "c66829bebb57406da609fb1bcebbb440",
          lang: "en"
        },
        function (result) {
          alert(result)
        },
        function (error) {
          alert(error)
        }
      );
    });
  }
}


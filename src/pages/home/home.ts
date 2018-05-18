import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { TextToSpeech } from "@ionic-native/text-to-speech";

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: any[] = [];
  text: string = "";
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public ngZone: NgZone, public tts: TextToSpeech) {

    // Display initial message
    this.messages.push({
      text: "Hi, how can I help you?",
      sender: "api"
    })

  }

  sendText() {
    if (this.text.length == 0)
      return;

    let message = this.text;

    // Display user's message
    this.messages.push({
      text: message,
      sender: 'me'
    });
    this.content.scrollToBottom(200);

    this.text = "";

    window["ApiAIPlugin"].requestText({
      query: message
    }, (response) => {

      this.ngZone.run(() => {
        // Display AI's response
        this.messages.push({
          text: response.result.fulfillment.speech,
          sender: "api"
        });
        this.content.scrollToBottom(200);
      })
    }, (error) => {
      alert(JSON.stringify(error))
    })
  }

  sendVoice() {
    window["ApiAIPlugin"].requestVoice({},
      (response) => {
        this.ngZone.run(() => {
          // Display user's message
          this.messages.push({
            text: response.result.resolvedQuery,
            sender: "me"
          });
          this.content.scrollToBottom(200);

          // Display AI's response
          this.messages.push({
            text: response.result.fulfillment.speech,
            sender: "api"
          });
          this.content.scrollToBottom(200);

          // AI's voice response
          this.tts.speak({
            text: response.result.fulfillment.speech,
            locale: "en-US",
            rate: 1
          });
        })
      }, (error) => {
        alert(error)
      }
    )
  }
}
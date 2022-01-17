import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {
  chatList: any = [];
  constructor() {
    this.chatList = [
      {
        initalName: 'SR',
        fullName: 'Sangeeta Roy',
        lastMsg: 'a co-rider friend',
        timeStamp: '09:16 AM'
      },
      {
        initalName: 'SB',
        fullName: 'Sanjay Bankar',
        lastMsg: 'a co-rider friend',
        timeStamp: '04:00 PM'
      },
      {
        initalName: 'AV',
        fullName: 'Avinash Kumkar',
        lastMsg: 'when will you reach ?',
        timeStamp: '02:00 PM'
      },
      {
        initalName: 'NP',
        fullName: 'Narendra Patil',
        lastMsg: 'are you available',
        timeStamp: '10:16 AM'
      },
      {
        initalName: 'PK',
        fullName: 'Pratik Kamble',
        lastMsg: 'a co-rider friend',
        timeStamp: '06:18 PM'
      }
    ]
  }

  ngOnInit() {
  }

}

import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service'; 
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sga-ui-app';
  public onlineEvent: Observable<Event>;
  public offlineEvent: Observable<Event>;
  public subscriptions: Subscription[] = [];
  public connectionStatusMessage: string;
  public connectionStatus: string;

  isConnected = true;  
  noInternetConnection: boolean;  
  status = "online"
  
  constructor(private connectionService: ConnectionService) {  
    // this.connectionService.monitor().subscribe(isConnected => {  
    //   this.isConnected = isConnected;  
    //   if (this.isConnected) {  
    //     this.noInternetConnection = false; 
    //     this.status = "online"
     
    //    // alert("THERE IS INTERNET CONNECTION");
    //   }  
    //   else {  
    //     this.noInternetConnection = true;  
    //     this.status = "offline"
    //   //  alert("THERE IS NO INTERNET CONNECTION")
    //   }  
    //   alert("THERE IS INTERNET CONNECTION");
    // })  
  }  
  ngOnInit(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(this.onlineEvent.subscribe(event => {
        this.connectionStatusMessage = 'Connected to internet!';
      this.connectionStatus = 'online';
      alert(this.connectionStatusMessage)
    }));
    this.subscriptions.push(this.offlineEvent.subscribe(e => {
        this.connectionStatusMessage = 'You are Internet Connection lost! ';
      this.connectionStatus = 'offline';
      alert(this.connectionStatusMessage)
    }));
}
ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
}
}

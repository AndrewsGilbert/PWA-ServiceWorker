import { ApplicationRef, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'testPwa';

  httpClient:HttpClient


  constructor(updates:SwUpdate, appRef:ApplicationRef){

    updates.available.subscribe(event => {
      console.log('current version is', event.current)
      console.log('available version is', event.available)
      if(confirm('update available')){
      updates.activateUpdate().then(() => location.reload())
      }
    })

    updates.activated.subscribe(event => {
      console.log('old version was', event.previous)
      console.log('new version is', event.current)
    })

    appRef.isStable.subscribe((isStable) => {
      if(isStable){
        const timeInt = interval(1*60*60*1000)
        timeInt.subscribe(()=>{
          updates.checkForUpdate().then(() => console.log('checked'))
          console.log('update checked')
        })
      }
    })

  }

    


 async  getdate(){

    const sendreq = await fetch ('http://localhost:8566/getDate', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
    })
    const fetchobject = await sendreq.json()
    console.log(fetchobject)


  }



}

import { ApplicationRef, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testPwa';


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
        const timeInt = interval(20000)
        timeInt.subscribe(()=>{
          updates.checkForUpdate().then(() => console.log('checked'))
          console.log('update checked')
        })
      }
    })

  }

    


 async  getdate(){
    console.log(Math.floor(new Date().getTime()))
    const sendreq = await fetch ('http://localhost:8566/getDate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
    })
    const fetchobject = await sendreq.json()
    console.log(fetchobject.timestamp)
  }




}

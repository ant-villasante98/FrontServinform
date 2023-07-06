import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _state: StateService) { }

  ngOnInit(): void {



  }

  logout() {
    sessionStorage.removeItem("tokenServinform");
    this._state.stateSesion = false;
  }

  get stateSesion() {
    return this._state.stateSesion
  }


}

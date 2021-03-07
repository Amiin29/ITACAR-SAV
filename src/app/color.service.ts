import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
 theme={
  color:''
}
  constructor() { }
  setcolro(color){
    this.theme.color=color
  }
  getcolor(){
    return this.theme
  }
}

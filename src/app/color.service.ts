import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
 theme={
  color:'',
  id:''
}
  constructor() { }
  setcolro(color){
    this.theme.color=color
  }
  getcolor(){
    return this.theme
  }
  setid(id){
    this.theme.id=id
  }
  getid(){
    return this.theme.id
  }
}

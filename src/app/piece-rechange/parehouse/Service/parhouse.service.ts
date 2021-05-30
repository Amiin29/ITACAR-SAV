import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParhouseService {
  idparehouse=null;
  CodeWHS=null;
  constructor() { }

  SetIDParehouse(idparehouse){
    this.idparehouse=idparehouse;
  }
  GetIDParehouse(){
    return this.idparehouse;
  }

  SetCodeWHS(CodeWHS){
    this.CodeWHS=CodeWHS;
  }
  GetCodeWHS(){
    return this.CodeWHS;
  }
}

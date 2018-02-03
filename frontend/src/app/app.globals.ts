import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
  readonly baseAppDomain: string = 'http://jwt.macrobug.dev:3000';
  readonly baseAppUrl: string = this.baseAppDomain+'/api';
}

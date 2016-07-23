import { Injectable } from '@angular/core';
import { COLORS } from './mock-colors';

@Injectable()
export class ColorService {
  getColors() {
      return Promise.resolve(COLORS);
  }

}
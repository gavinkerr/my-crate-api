import { Injectable } from '@angular/core';

@Injectable()
export class ImagingService {

  constructor() { }

  getUrlForFile(file: File): Promise<string> {
    const reader = new FileReader();
    reader.readAsDataURL(file);


    const prom = new Promise(resolve => reader.onload = resolve);

    return prom.then((event: any) => event.target.result);
  }

}

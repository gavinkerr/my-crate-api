import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appAppFileInput]'
})
export class AppFileInputDirective {


  constructor(private el: ElementRef) { }

  @Output()
  filesChanged = new EventEmitter<FileList>();

  @HostListener('change') change() {
    const x = this.el;
    this.filesChanged.emit(this.el.nativeElement.files);
  }
}

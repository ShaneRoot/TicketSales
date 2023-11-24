import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)',
  },
  exportAs: 'blockStyle'
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {
  @Input() selector: string;
  @Input() initFirst: boolean = false;
  @Input() items = []
  @Input() data: any = null;
  @Output() renderComplete = new EventEmitter();
  private index: number = 0;
  public activeElementIndex: number;
  $event: KeyboardEvent;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit():void {
  this.render();
  };

  ngOnChanges(changes: SimpleChanges):void {
    console.log('ch', changes);
    if (changes['data'].currentValue && changes['data'].firstChange){
      setTimeout(()=>{
        this.render();
      }, 1000)
    }
    /*    console.log(data);*/
  };


  initKeyUp(ev: KeyboardEvent): void {
    console.log('ev', ev);

    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft'){
      (this.items[this.index] as HTMLElement)?.removeAttribute('style');
    }

    if (ev.key === 'ArrowRight') {
      if (this.index !== this.items.length - 1) {
        this.index++;
        if (this.items[this.index]) {
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
        }
      }

    } else if (ev.key === 'ArrowLeft') {
      if (this.index !== 0) {
        this.index--;
        if (this.items[this.index]) {
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
        }
      }
    }
    this.activeElementIndex = this.index
  }

  initStyle(index: number) {
    if (this.items[index]) {

      (this.items[index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
    }
  }

  updateItems(): void {
    this.items = this.el.nativeElement.querySelectorAll(this.selector);
    this.index=0;
  };
 render() {
   this.activeElementIndex = 0

   if (this.selector) {
     this.items = this.el.nativeElement.querySelectorAll(this.selector);
     /*console.log(this.el.nativeElement);
     console.log(this.items);*/
     if (this.initFirst) {
       if (this.items[0]) {
         /*this.items[0].classList.add('border');
         this.items[0].classList.add('border-primary');*/
         (this.items [0] as HTMLElement).setAttribute('style', 'border: 2px solid red');
       }
     }
   } else {
     console.error('No selector')
   }


   setTimeout(() => {
     this.renderComplete.emit(true)},0)
 }
}
 /*   if (ev.key === 'ArrowRight') {
      if (this.index + 1 >= this.items.length) {
        return;
      }
      (this.items[this.index] as HTMLElement) ? this.items[this.index].classList.remove('border', 'border-primary') : null;
      this.index++;
      if (this.items[this.index]) {
        this.items[this.index].classList.add('border', 'border-primary');
      }
    } else if (ev.key === 'ArrowLeft') {
      if (this.index - 1 < 0) {
        return;
      }
      (this.items[this.index] as HTMLElement) ? this.items[this.index].classList.remove('border', 'border-primary') : null;
      this.index--;
      if (this.items[this.index]) {
        this.items[this.index].classList.add('border', 'border-primary');*/


/*  initStyle(index: number) {
    if (this.items[index]) {
      this.index = index;
      this.items[this.index].classList.add('border', 'border-primary');
    }
  }

  updateItems(): void {
    this.items = this.el.nativeElement.querySelectorAll(this.selector);
  }*/


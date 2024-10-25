import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  
 
  private debouncer: Subject<string> = new Subject<string>(); //Subject -> tipo especial de observable.
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';
  @Input()
  public initialValue: string = "";
  @Output()
  public onValue = new EventEmitter<string>();
  @Output()
  public onDebounce = new EventEmitter<string>();
  
  
  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(debounceTime(300))
    .subscribe(valor => {this.onDebounce.emit(valor);})
  }

  ngOnDestroy(): void { //Para desuscribirse del evento y no este escuchando siempre
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(value:string):void{
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string){
    this.debouncer.next(searchTerm);
  }
}

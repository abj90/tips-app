import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
} from 'rxjs';
import { KEYUP_EVENT } from 'src/common/constants';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('input', { static: true }) input: ElementRef;
  @Output() searchEvent = new EventEmitter<string>();
  private subcription: Subscription;

  ngAfterViewInit(): void {
    this.subcription = fromEvent(this.input.nativeElement, KEYUP_EVENT)
      .pipe(filter(Boolean), debounceTime(1000), distinctUntilChanged())
      .subscribe({
        next: () => this.searchEvent.next(this.input.nativeElement.value),
      });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}

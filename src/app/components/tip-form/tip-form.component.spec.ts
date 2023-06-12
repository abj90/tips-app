import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipFormComponent } from './tip-form.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TipFormComponent', () => {
  let component: TipFormComponent;
  let fixture: ComponentFixture<TipFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatInputModule, ReactiveFormsModule, NoopAnimationsModule],
      declarations: [TipFormComponent],
    });
    fixture = TestBed.createComponent(TipFormComponent);
    component = fixture.componentInstance;
    component.data = { title: '', text: '', datetime: '' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    const data = {
      title: 'Test Title',
      text: 'Test Text',
      datetime: new Date().toDateString(),
    };
    component.data = data;
    component.ngOnInit();
    expect(component.form.value).toEqual({
      title: data.title,
      text: data.text,
      datetime: new Date().toDateString(),
    });
  });
});

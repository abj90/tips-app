import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTipModalComponent } from './create-tip-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipFormComponent } from '../tip-form/tip-form.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateTipModalComponent', () => {
  let component: CreateTipModalComponent;
  let fixture: ComponentFixture<CreateTipModalComponent>;
  let dialogRef: MatDialogRef<CreateTipModalComponent>;

  beforeEach(() => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      imports: [MatInputModule, ReactiveFormsModule, NoopAnimationsModule],
      declarations: [CreateTipModalComponent, TipFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(CreateTipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with tip data', () => {
    const tip = {
      title: 'Sample Title',
      text: 'Sample Text',
      datetime: new Date().toDateString(),
    };
    component.submitForm(tip);
    expect(dialogRef.close).toHaveBeenCalledWith({ data: tip });
  });

  it('should close the dialog', () => {
    component.onCloseModal();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});

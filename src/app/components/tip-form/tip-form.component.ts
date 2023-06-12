import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IHealthTip } from 'src/common/interfaces';

@Component({
  selector: 'tip-form',
  templateUrl: './tip-form.component.html',
  styleUrls: ['./tip-form.component.scss'],
})
export class TipFormComponent implements OnInit {
  @Input() data: IHealthTip;
  @Output() submitForm = new EventEmitter<IHealthTip>();
  @Output() cancel = new EventEmitter<void>();
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      title: [this.data.title, Validators.required],
      text: [this.data.text, Validators.required],
      datetime: [this.checkDateTime(this.data.datetime), []],
    });
  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    this.submitForm.emit(this.form.value);
  }

  onCancel() {
    this.cancel.emit();
  }

  checkDateTime(date: string): string | Date {
    return date !== '' ? date : new Date();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IHealthTip } from 'src/common/interfaces';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-create-tip-modal',
  templateUrl: './create-tip-modal.component.html',
  styleUrls: ['./create-tip-modal.component.scss'],
})
export class CreateTipModalComponent implements OnInit {
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateTipModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IHealthTip,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [this.data.id, []],
      title: [this.data.title, Validators.required],
      text: [this.data.text, Validators.required],
    });
  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    this.dialogRef.close({
      data: { ...this.data, ...this.form.value, datetime: new Date() },
    });
  }

  onCloseModal(): void {
    this.dialogRef.close();
  }
}

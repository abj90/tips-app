import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IHealthTip } from 'src/common/interfaces';

@Component({
  selector: 'app-create-tip-modal',
  templateUrl: './create-tip-modal.component.html',
  styleUrls: ['./create-tip-modal.component.scss'],
})
export class CreateTipModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateTipModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IHealthTip
  ) {}

  submitForm(tip: IHealthTip) {
    this.dialogRef.close({
      data: { ...tip },
    });
  }

  onCloseModal(): void {
    this.dialogRef.close();
  }
}

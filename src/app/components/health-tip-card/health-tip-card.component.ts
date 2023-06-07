import { Component, Input, OnInit } from '@angular/core';
import { cardColor } from 'src/common/constants';
import { IHealthTip, IHealthTipCard } from 'src/common/interfaces';

@Component({
  selector: 'health-tip-card',
  templateUrl: './health-tip-card.component.html',
  styleUrls: ['./health-tip-card.component.scss'],
})
export class HealthTipCardComponent implements OnInit {
  @Input() item: IHealthTip;
  public data: IHealthTipCard;

  public test = cardColor;
  ngOnInit(): void {
    this.data = this.getCardData(this.item);
  }

  getCardData(healthTips: IHealthTip): IHealthTipCard {
    return {
      ...healthTips,
      cardColor: cardColor.get(healthTips.type)!,
    };
  }
}

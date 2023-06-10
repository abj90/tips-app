import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTipModalComponent } from './create-tip-modal.component';

describe('CreateTipModalComponent', () => {
  let component: CreateTipModalComponent;
  let fixture: ComponentFixture<CreateTipModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTipModalComponent]
    });
    fixture = TestBed.createComponent(CreateTipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentHandlingPeroformaceRtgComponent } from './equipment-handling-peroformace-rtg.component';

describe('EquipmentHandlingPeroformaceRtgComponent', () => {
  let component: EquipmentHandlingPeroformaceRtgComponent;
  let fixture: ComponentFixture<EquipmentHandlingPeroformaceRtgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentHandlingPeroformaceRtgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentHandlingPeroformaceRtgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

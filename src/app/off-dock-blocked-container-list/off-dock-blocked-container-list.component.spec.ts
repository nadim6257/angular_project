import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffDockBlockedContainerListComponent } from './off-dock-blocked-container-list.component';

describe('OffDockBlockedContainerListComponent', () => {
  let component: OffDockBlockedContainerListComponent;
  let fixture: ComponentFixture<OffDockBlockedContainerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffDockBlockedContainerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffDockBlockedContainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

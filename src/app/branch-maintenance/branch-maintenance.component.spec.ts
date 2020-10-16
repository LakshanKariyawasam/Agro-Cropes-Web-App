import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchMaintenanceComponent } from './branch-maintenance.component';

describe('BranchMaintenanceComponent', () => {
  let component: BranchMaintenanceComponent;
  let fixture: ComponentFixture<BranchMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BranchMaintenanceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

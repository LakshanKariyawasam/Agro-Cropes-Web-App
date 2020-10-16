import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceMaintenanceComponent } from './distance-maintenance.component';

describe('DistanceMaintenanceComponent', () => {
  let component: DistanceMaintenanceComponent;
  let fixture: ComponentFixture<DistanceMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistanceMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

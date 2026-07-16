import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRequestsManagementComponent } from './change-requests-management.component';

describe('ChangeRequestsManagementComponent', () => {
  let component: ChangeRequestsManagementComponent;
  let fixture: ComponentFixture<ChangeRequestsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeRequestsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeRequestsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

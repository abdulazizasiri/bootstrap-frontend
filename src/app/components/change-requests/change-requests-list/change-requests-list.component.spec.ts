import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRequestsListComponent } from './change-requests-list.component';

describe('ChangeRequestsListComponent', () => {
  let component: ChangeRequestsListComponent;
  let fixture: ComponentFixture<ChangeRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeRequestsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

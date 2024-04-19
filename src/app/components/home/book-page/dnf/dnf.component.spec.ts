import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnfComponent } from './dnf.component';

describe('DnfComponent', () => {
  let component: DnfComponent;
  let fixture: ComponentFixture<DnfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

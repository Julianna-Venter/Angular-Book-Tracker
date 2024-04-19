import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbrComponent } from './tbr.component';

describe('TbrComponent', () => {
  let component: TbrComponent;
  let fixture: ComponentFixture<TbrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TbrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

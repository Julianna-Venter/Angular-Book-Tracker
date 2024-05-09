import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotlightSvgComponent } from './spotlight-svg.component';

describe('SpotlightSvgComponent', () => {
  let component: SpotlightSvgComponent;
  let fixture: ComponentFixture<SpotlightSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotlightSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpotlightSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

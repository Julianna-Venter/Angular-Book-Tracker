import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaveReadComponent } from './have-read.component';

describe('HaveReadComponent', () => {
  let component: HaveReadComponent;
  let fixture: ComponentFixture<HaveReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HaveReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HaveReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

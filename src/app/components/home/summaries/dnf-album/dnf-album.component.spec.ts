import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnfAlbumComponent } from './dnf-album.component';

describe('DnfAlbumComponent', () => {
  let component: DnfAlbumComponent;
  let fixture: ComponentFixture<DnfAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnfAlbumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnfAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

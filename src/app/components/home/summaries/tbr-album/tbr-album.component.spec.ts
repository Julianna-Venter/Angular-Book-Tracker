import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbrAlbumComponent } from './tbr-album.component';

describe('TbrAlbumComponent', () => {
  let component: TbrAlbumComponent;
  let fixture: ComponentFixture<TbrAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TbrAlbumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbrAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

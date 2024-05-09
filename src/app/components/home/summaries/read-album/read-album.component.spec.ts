import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAlbumComponent } from './read-album.component';

describe('ReadAlbumComponent', () => {
  let component: ReadAlbumComponent;
  let fixture: ComponentFixture<ReadAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadAlbumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAlbumComponent } from './book-album.component';

describe('BookAlbumComponent', () => {
  let component: BookAlbumComponent;
  let fixture: ComponentFixture<BookAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAlbumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

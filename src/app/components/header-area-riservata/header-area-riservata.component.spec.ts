import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAreaRiservataComponent } from './header-area-riservata.component';

describe('HeaderAreaRiservataComponent', () => {
  let component: HeaderAreaRiservataComponent;
  let fixture: ComponentFixture<HeaderAreaRiservataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAreaRiservataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAreaRiservataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

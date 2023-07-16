import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterViewComponent } from './footer-view.component';

describe('FooterViewComponent', () => {
  let component: FooterViewComponent;
  let fixture: ComponentFixture<FooterViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterViewComponent]
    });
    fixture = TestBed.createComponent(FooterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

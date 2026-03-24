import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWordPage } from './add-word.page';

describe('AddWordPage', () => {
  let component: AddWordPage;
  let fixture: ComponentFixture<AddWordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

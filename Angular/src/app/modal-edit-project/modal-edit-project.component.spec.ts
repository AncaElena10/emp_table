import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditProjectComponent } from './modal-edit-project.component';

describe('ModalEditProjectComponent', () => {
  let component: ModalEditProjectComponent;
  let fixture: ComponentFixture<ModalEditProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

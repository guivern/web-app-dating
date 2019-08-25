import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoEditorComponent } from './foto-editor.component';

describe('FotoEditorComponent', () => {
  let component: FotoEditorComponent;
  let fixture: ComponentFixture<FotoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

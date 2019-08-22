import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent) {
    if (component.editForm.dirty) { // el form está sucio
      return confirm('Estás seguro que deseas salir? Se perderá cualquier cambio que no haya sido guardado.');
    }
    // el form no está sucio
    return true;
  }
}

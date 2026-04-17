import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Directive({ selector: '[appLoading]', standalone: true })
export class Loading {
  @Input() set appLoading(loading: boolean | string) {
    this.viewContainer.clear();
    if (loading) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef); // original content
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
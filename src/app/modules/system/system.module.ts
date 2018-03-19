import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogComponent } from './changelog/changelog.component';
import { ClauseComponent } from './clause/clause.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChangelogComponent, ClauseComponent, HelpComponent]
})
export class SystemModule { }

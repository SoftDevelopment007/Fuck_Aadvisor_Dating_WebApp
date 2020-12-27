import { NgModule } from '@angular/core';

import { DateFormatPipe } from './date-format.pipe';
import { FileSizePipe } from './file-size.pipe';
import { CountryPipe } from './country.pipe';
import { ViewsPipe } from './views.pipe';
import { StandardDatePipe } from './standard-date.pipe';
import { DocPipe } from './doc.pipe';

@NgModule({
  declarations: [DateFormatPipe, FileSizePipe, CountryPipe, ViewsPipe, StandardDatePipe, DocPipe],
  imports: [],
  exports: [DateFormatPipe, FileSizePipe, CountryPipe, ViewsPipe, StandardDatePipe, DocPipe]
})
export class PipesModule {}

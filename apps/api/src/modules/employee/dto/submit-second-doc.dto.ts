import { Matches } from 'class-validator';
import { FILE_KEY_PATTERN } from '../../files/file-storage.service';

/** The previous-organisation document that was missing at joining (BR-05). */
export class SubmitSecondDocDto {
  @Matches(FILE_KEY_PATTERN, { message: 'documentUrl must be a storage key returned by the upload endpoint' })
  documentUrl: string;
}

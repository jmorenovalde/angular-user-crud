import { HttpUrlEncodingCodec } from '@angular/common/http';

/**
 * CustomHttpUrlEncodingCodec
 * Fix plus sign (+) not encoding, so sent as blank space
 * See: https://github.com/angular/angular/issues/11058#issuecomment-247367318
 */
export class CustomHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
  /**
   * Decodificar la key
   * @param k cadena de la key a decodificar
   */
  encodeKey(k: string): string {
    k = super.encodeKey(k);
    return k.replace(/\+/gi, '%2B');
  }

  /**
   * Decodificar un valor
   * @param v valor a decodificar
   */
  encodeValue(v: string): string {
    v = super.encodeValue(v);
    return v.replace(/\+/gi, '%2B');
  }
}


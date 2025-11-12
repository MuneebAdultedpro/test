export declare enum MessageDigest {
    sha1 = 'sha1',
    sha256 = 'sha256',
    sha384 = 'sha384',
    sha512 = 'sha512',
    md5 = 'md5',
}
export type SignatureSpec = {
    signature: string;
    md?: MessageDigest;
};
export declare const SEPARATOR = '::';
export type BaseHashingEncoding = 'base64' | 'base64url' | 'hex';
export interface SymmetricCryptoOptions {
    readonly encryptionKey: string;
    readonly encryptionAlgorithm: string;
    readonly salt?: string;
}
export interface AsymmetricCryptoOptions {
    readonly key: string;
}
export interface HashingOptions {
    hashingAlgorithm: string;
    hashingBaseEncoding?: BaseHashingEncoding;
}
export declare class CryptoMethods {
    static isEscaped(html: string): boolean;
    static escape(html: string): string;
    static unEscape(escapedHtml: string): string;
    static isBase64Encoded(encodedString: string): boolean;
    static base64Encode(data: string): string;
    static base64Decode(encodedString: string): string;
    static getMessageDigest(messageDigest?: MessageDigest): any;
    /**
     * Verifies a message
     *
     * @param {String} issuerPublicKey Public key in PEM format
     * @param {String} signatureObject Signature in JSON string format
     * @param {String} decryptedMessage Decrypted message
     *
     * @return {Boolean} Tells whether verification were successful or not
     * @method
     */
    static verifyAsymmetric(
        issuerPublicKey: string | Object,
        signatureObject: SignatureSpec,
        decryptedMessage: string
    ): any;
}

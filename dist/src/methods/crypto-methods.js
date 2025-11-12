'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CryptoMethods = exports.SEPARATOR = exports.MessageDigest = void 0;
const tslib_1 = require('tslib');
const Forge = tslib_1.__importStar(require('node-forge'));
var MessageDigest;
(function (MessageDigest) {
    MessageDigest['sha1'] = 'sha1';
    MessageDigest['sha256'] = 'sha256';
    MessageDigest['sha384'] = 'sha384';
    MessageDigest['sha512'] = 'sha512';
    MessageDigest['md5'] = 'md5';
})((MessageDigest = exports.MessageDigest || (exports.MessageDigest = {})));
exports.SEPARATOR = '::';
class CryptoMethods {
    static isEscaped(html) {
        return new RegExp(/&amp;|&lt;|&gt;|&quot;/g, 'gi').test(html);
    }
    static escape(html) {
        return html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;');
    }
    static unEscape(escapedHtml) {
        return escapedHtml
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"');
    }
    static isBase64Encoded(encodedString) {
        return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(
            encodedString
        );
    }
    static base64Encode(data) {
        return Buffer.from(data).toString('base64');
    }
    static base64Decode(encodedString) {
        if (this.isBase64Encoded(encodedString)) {
            const buffer = Buffer.from(encodedString, 'base64');
            let decoded = buffer.toString();
            let unEscaped = decoded;
            if (CryptoMethods.isEscaped(decoded)) {
                unEscaped = CryptoMethods.unEscape(decoded);
            }
            return unEscaped;
        } else {
            throw 'Given data is not base64 encoded';
        }
    }
    static getMessageDigest(messageDigest = MessageDigest.sha256) {
        switch (messageDigest) {
            case MessageDigest.sha1:
                return Forge.md.sha1.create();
            case MessageDigest.sha384:
                return Forge.md.sha384.create();
            case MessageDigest.sha512:
                return Forge.md.sha512.create();
            case MessageDigest.md5:
                return Forge.md.md5.create();
            case MessageDigest.sha256:
            default:
                return Forge.md.sha256.create();
        }
    }
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
        issuerPublicKey,
        signatureObject,
        decryptedMessage
    ) {
        // Return false if no signature is defined
        if (!signatureObject) return false;
        // Create SHA-1 checksum
        const checkSum = CryptoMethods.getMessageDigest(signatureObject.md);
        checkSum.update(decryptedMessage, 'utf8');
        // Base64 decode signature
        const signature = Forge.util.decode64(signatureObject.signature);
        // Accept both PEMs and forge private key objects
        if (typeof issuerPublicKey === 'string')
            issuerPublicKey = Forge.pki.publicKeyFromPem(issuerPublicKey);
        // Verify signature
        //@ts-ignore
        return issuerPublicKey.verify(checkSum.digest().getBytes(), signature);
    }
}
exports.CryptoMethods = CryptoMethods;
//# sourceMappingURL=crypto-methods.js.map

// The alphabet set used for base58 encoding.
const BASE58_ALPHABET = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";

/**
 * Decodes a base58-encoded string to a number.
 * @param {string} encodedStr - The base58-encoded string.
 * @returns {number} - The decoded number.
 */
const decodeBase58 = (encodedStr: string): number =>
    [...encodedStr].reduce((prev, currChar) => (prev * BASE58_ALPHABET.length + BASE58_ALPHABET.indexOf(currChar)) | 0, 0);

/**
 * Creates a seed array from a given hash by decoding each segment.
 * @param {string} hash - The hash to create a seed from.
 * @returns {number[]} - The array of seed numbers.
 */
const generateSeedFromHash = (hash: string): number[] => {
    const truncatedHash = hash.slice(2);
    const segmentSize = ((hash.length / 4) | 0);
    const regexPattern = new RegExp(`.{${segmentSize}}`, "g");
    return truncatedHash.match(regexPattern)!.map((segment) => decodeBase58(segment));
};

/**
 * A pseudorandom number generator function based on sfc32 algorithm.
 * @param {number} a - Seed value.
 * @param {number} b - Seed value.
 * @param {number} c - Seed value.
 * @param {number} d - Seed value.
 * @returns {Function} - A function that generates pseudorandom numbers.
 */
const sfc32PRNG = (a: number, b: number, c: number, d: number): () => number => {
    return () => {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let temp = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + temp) | 0;
        return (temp >>> 0) / 4294967296;
    };
};

/**
 * Generates a pseudorandom number generator seeded with a random hash.
 * @returns {Function} - A function that generates pseudorandom numbers.
 */
export const getRandomGenerator = (): (() => number) => {
    // Generate a random hash prefixed with 'oo' and consisting of 49 random characters from the BASE58_ALPHABET.
    const randomHash = "oo" + Array.from({ length: 49 }, () => BASE58_ALPHABET[Math.floor(Math.random() * BASE58_ALPHABET.length)]).join("");
    // Create a seed from the random hash.
    const seedValues = generateSeedFromHash(randomHash);
    // Return a pseudorandom number generator function seeded with the hash.
    return sfc32PRNG(...seedValues);
};

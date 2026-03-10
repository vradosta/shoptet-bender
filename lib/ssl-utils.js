import os from 'os';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get the local IP address of the machine
 * Prioritizes non-internal IPv4 addresses
 * @returns {string|null} The local IP address or null if not found
 */
export function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();

  // Try to find a non-internal IPv4 address
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }

  // Fallback to localhost if no network interface found
  return '127.0.0.1';
}

/**
 * Convert an IP address to local-ip.co format
 * Example: 192.168.1.100 -> 192-168-1-100
 * @param {string} ip - The IP address to convert
 * @returns {string} The converted IP in local-ip.co format
 */
export function ipToLocalIpCoFormat(ip) {
  return ip.replace(/\./g, '-');
}

/**
 * Generate the local-ip.co domain for the current machine
 * @param {number} port - The port number (optional)
 * @returns {string} The full local-ip.co URL
 */
export function getLocalIpCoUrl(port = null) {
  const ip = getLocalIpAddress();
  const formattedIp = ipToLocalIpCoFormat(ip);
  const domain = `${formattedIp}.my.local-ip.co`;

  if (port) {
    return `https://${domain}:${port}`;
  }

  return `https://${domain}`;
}

/**
 * Get the SSL certificate paths
 * @returns {Object} Object containing paths to cert, key, and chain
 */
export function getSslCertPaths() {
  const certsDir = path.join(__dirname, '..', 'certs');

  return {
    cert: path.join(certsDir, 'server.pem'),
    key: path.join(certsDir, 'server.key'),
    ca: path.join(certsDir, 'chain.pem'),
  };
}

/**
 * Check if SSL certificates exist
 * @returns {boolean} True if all required certificate files exist
 */
export function sslCertsExist() {
  const paths = getSslCertPaths();

  return fs.existsSync(paths.cert) && fs.existsSync(paths.key) && fs.existsSync(paths.ca);
}

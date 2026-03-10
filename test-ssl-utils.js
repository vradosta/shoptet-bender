#!/usr/bin/env node
import {
  getLocalIpAddress,
  ipToLocalIpCoFormat,
  getLocalIpCoUrl,
  getSslCertPaths,
  sslCertsExist,
} from './lib/ssl-utils.js';

console.log('Testing SSL Utilities...\n');

console.log('1. Local IP Address:', getLocalIpAddress());
console.log('2. Formatted IP:', ipToLocalIpCoFormat(getLocalIpAddress()));
console.log('3. Local-IP.co URL:', getLocalIpCoUrl(3010));
console.log('4. SSL Cert Paths:', getSslCertPaths());
console.log('5. SSL Certs Exist:', sslCertsExist() ? '✅ Yes' : '❌ No');

if (sslCertsExist()) {
  console.log('\n✅ SSL setup is complete and ready to use!');
  console.log('Run with: shp-bender --remote https://classic.shoptet.cz/ --ssl');
} else {
  console.log('\n❌ SSL certificates not found. Please download them first.');
}

# SSL Certificates for local-ip.co

This directory contains SSL certificates from [local-ip.co](https://local-ip.co) that enable HTTPS for local development.

## What is local-ip.co?

local-ip.co is a free DNS service that provides wildcard SSL certificates for local development. It resolves domain names to local IP addresses while providing trusted SSL certificates.

## How it works

- Your IP address `192.168.1.100` becomes `192-168-1-100.my.local-ip.co`
- The wildcard certificate `*.my.local-ip.co` is trusted by all major browsers
- No self-signed certificate warnings!

## Certificate Files

- **server.pem** - The SSL certificate for `*.my.local-ip.co
- **chain.pem** - Intermediate certificates for the certificate chain
- **server.key** - Private key for the SSL certificate

## Important Notes

⚠️ **Security Notice**: These certificates are publicly available and shared by all users of local-ip.co. They are suitable for local development only, never for production use.

✅ **Valid Use Cases**:
- Local development with HTTPS
- Testing HTTPS-only features (Service Workers, PWAs, Geolocation, etc.)
- Sharing development environment with team members on the same network

❌ **Do NOT use for**:
- Production environments
- Handling sensitive data
- Public-facing applications

## Updating Certificates

To update the certificates to the latest version:

```bash
curl -L -o server.pem https://local-ip.co/cert/server.pem
curl -L -o chain.pem https://local-ip.co/cert/chain.pem
curl -L -o server.key https://local-ip.co/cert/server.key
```

## Using SSL

Enable SSL in two ways:

**1. Via CLI flag (temporary):**
```bash
shp-bender --remote https://example.com/ --ssl
```

**2. Via config.json (permanent):**
```json
{
  "ssl": true
}
```

## More Information

Visit [https://local-ip.co](https://local-ip.co) for more details and documentation.

# moritakumi
A portfolio website developed by Anti-Matter Studios for Caillaud Michele's master thesis.

## Encrypted content

Production builds encrypt the translation and image content with `MORITAKUMI_CONTENT_PASSWORD`.

```sh
MORITAKUMI_CONTENT_PASSWORD="your password" bun run build
```

For GitHub Pages, add a repository secret named `MORITAKUMI_CONTENT_PASSWORD`.

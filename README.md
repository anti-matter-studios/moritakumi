# moritakumi
A portfolio website developed by Anti-Matter Studios for Caillaud Michele's master thesis.

## Encrypted content

Production builds use `MORITAKUMI_CONTENT_PASSWORD` to protect translation and
image content.

```sh
MORITAKUMI_CONTENT_PASSWORD="your password" bun run build
```

For GitHub Pages, add a repository secret named `MORITAKUMI_CONTENT_PASSWORD`.

### Encrypting source content at rest

Plaintext content paths are ignored locally:

- `src/locales`
- `public/images`

Create or refresh the committed encrypted vault with:

```sh
MORITAKUMI_CONTENT_PASSWORD="your password" bun run content:seal
```

This writes encrypted content to `src/content-vault` and leaves your local
plaintext files untouched. Commit the vault, then stop tracking previously
committed plaintext content:

```sh
git rm --cached -r src/locales public/images
```

To restore local plaintext files from the vault later:

```sh
MORITAKUMI_CONTENT_PASSWORD="your password" bun run content:open
```

If plaintext content was already pushed to a public repository, rotate the
password before sealing and consider rewriting repository history if the old
content must be removed from past commits too.

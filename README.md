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

## Responsive slide content

Every page supports explicit breaks inside a translated `paragraphs` array:

```yaml
paragraphs:
  - "First part"
  - <slide-break screen-size="medium" />
  - "Continued on another slide at medium and small sizes"
```

Individual paragraphs can also be shown or hidden for selected layouts:

```yaml
paragraphs:
  - '<responsive-text hide-on="small">Desktop and tablet detail</responsive-text>'
  - '<responsive-text show-on="small medium">Compact-screen summary</responsive-text>'
```

The available sizes are `large`, `medium`, and `small`. Multiple values may be
separated by spaces or commas. `medium` applies at widths up to `64rem` or
heights up to `56rem`; `small` applies at widths or heights up to `42rem`.

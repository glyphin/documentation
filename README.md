# web/documentation
this repo has the mkdocs md files for the documentation found at https://glyphin.clickette.org/docs/

## mkdocs.yml (amazing workaround)
```yaml
site_name: Glyphin
site_url: https://glyphin.hamium.xyz/docs
theme:
  logo: assets/icons/glyphicon.svg
  favicon: assets/icons/glyphicon.svg
  name: material
  font:
    text: Inter
  palette:
    scheme: slate
    primary: custom
    accent: custom
  features:
    - navigation.sections
    - navigation.top
    - navigation.footer

markdown_extensions:
  - md_in_html
  - attr_list
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg

extra_javascript:
  - assets/javascript/background.js

extra_css:
  - assets/stylesheets/extra.css

copyright: Copyright &copy; 2024 Glyphin
extra:
  generator: true
  social:
    - icon: fontawesome/brands/discord
      link: https://glyphin.hamium.xyz/discord
      name: Support Server
```

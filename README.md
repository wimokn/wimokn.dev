# wimokn.dev

Personal website written in Rust

## Build

To build docker, follow these steps:

ARM64:

```console
docker build -t website:1.1.1 --platform linux/arm64/v8 -f Dockerfile.arm64 .
```

## Inspiration and Credits

Here are some inspiration for this kind of terminal website.

- [dpbriggs-blog](https://github.com/dpbriggs/dpbriggs-blog)
- [aterm](https://github.com/alvaldes/aterm)
- [TermPort](https://github.com/SX-9/term-port)

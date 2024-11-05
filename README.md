# Resume Doc Builder

Original purpose was to write my resume in Markdown format, or near-markdown, and then output to PDF. Has now rolled into a typescript defined data model, to markdown, to pdf.

This is primarily achieved with pandoc and weasyprint. Execution wrapped in devbox and docker.

# Running
Requires [devbox](https://www.jetify.com/devbox) and [docker](https://docs.docker.com/get-started/get-docker/)

1. `devbox shell`
1. `task run-all`

Hopefully, a pdf appears in `bin` dir. Worst case, helpful output explaining the issue.

### Summary
#### Runtime components
Devbox brings in binary dependencies, but nix-packaging does not have a pandoc binary for Apple Silicon, so using docker for pandoc (based heavily on [this example](https://github.com/spawnia/md-to-pdf))

#### Formats
This now jumps through a few hoops. Typescript `inputs/user-content.ts` has a typed structure, that is then templated to Markdown and styled with Sass. 

How it works:
* go-task `run-all` defines task execution
* deno-ts transforms `ts -> json`
* deno-ts transforms `json -> markdown`
* scss transforms `sass -> css`
* docker-pandoc transforms `markdown+css -> html`
* docker-pandoc transforms `markdown+css -> pdf`

# Thanks
* [devbox](https://www.jetify.com/devbox) and [docker](https://docs.docker.com/get-started/get-docker/), amazing tools
* [Benedikt Franke](https://github.com/spawnia): pandoc & weasyprint w docker examples in [md-to-pdf](https://github.com/spawnia/md-to-pdf)

# Resume Doc Builder

Purpose is to write my resume in Markdown format, or near-markdown, and then output to PDF.

This is primarily achieved with pandoc and weasyprint. Execution wrapped in devbox and docker.

# Running
Requires [devbox](https://www.jetify.com/devbox) and [docker](https://docs.docker.com/get-started/get-docker/)

1. `devbox shell`
1. `task convert`

Hopefully, a pdf appears in `bin` dir

### Summary
Devbox brings in binary dependencies, but nix-packaging does not have a pandoc binary for Apple Silicon, so using docker for pandoc (based heavily on [this example](https://github.com/spawnia/md-to-pdf))

How it works:
* go-task defines task execution
    * copies markdown file
    * converts sass to css
    * builds and runs docker
* docker pandoc creates html and pdf


# Thanks
* Devshell and Docker
* [Benedikt Franke](https://github.com/spawnia): pandoc, weasyprint examples in [md-to-pdf](https://github.com/spawnia/md-to-pdf)

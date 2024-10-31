FROM alpine:edge
RUN apk add pandoc-cli py3-pip
RUN apk add build-base
RUN apk add glib
RUN apk add pango

RUN pip3 install --break-system-packages weasyprint

RUN apk add texlive
RUN apk add fontconfig ttf-freefont font-noto terminus-font
# RUN apk add fontconfig=2.15.0-r1 font-noto=23.7.1-r0

WORKDIR /workspace
ENTRYPOINT ["pandoc"]

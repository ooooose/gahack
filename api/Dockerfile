#applicationのディレクトリ名で置き換えてください
ARG APP_NAME=Gahack
#使いたいrubyのimage名に置き換えてください
ARG RUBY_IMAGE=ruby:2.7.4
#使いたいnodeのversionに置き換えてください(`15.14.0`ではなく`15`とか`16`とかのメジャーバージョン形式で書いてください)
ARG NODE_VERSION='15'
#インストールするbundlerのversionに置き換えてください
ARG BUNDLER_VERSION=2.3.16

FROM $RUBY_IMAGE
ARG APP_NAME
ARG RUBY_VERSION
ARG NODE_VERSION
ARG BUNDLER_VERSION

ENV RAILS_ENV production
ENV BUNDLE_DEPLOYMENT true
ENV BUNDLE_WITHOUT development:test
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true

RUN mkdir /$APP_NAME
WORKDIR /$APP_NAME

RUN cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

# 別途インストールが必要なものがある場合は追加してください
RUN apt-get update -qq && apt-get install -y build-essential

RUN gem install bundler:$BUNDLER_VERSION

COPY Gemfile /$APP_NAME/Gemfile
COPY Gemfile.lock /$APP_NAME/Gemfile.lock

RUN bundle install

COPY . /$APP_NAME/

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

FROM ruby:2.7.4
ENV TZ Asia/Tokyo

# 必要なパッケージをインストール
RUN apt-get update 
RUN apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    default-mysql-client \
    yarn

# 作業ディレクトリを指定
WORKDIR /myapp

# ローカルからコンテナにファイルをコピー
COPY Gemfile Gemfile.lock /myapp/
RUN bundle install
COPY . /myapp

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]

# Node.jsの公式イメージをベースイメージとして使用
FROM node:20-slim

# コンテナ内の作業ディレクトリを設定
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピーしてDockerのキャッシュを活用
COPY package*.json ./

# アプリケーションの依存関係をインストール
RUN npm install

# アプリケーションのソースコードをバンドル
COPY . .

# root権限なしでアプリを実行するために "node" ユーザーを作成
RUN useradd -m node
USER node

# アプリケーションを実行するコマンドを定義
CMD [ "node", "src/index.js" ]

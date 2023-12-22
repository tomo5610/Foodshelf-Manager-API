# 食品管理アプリ

## 概要

食品の賞味期限を管理するアプリ

- それぞれの食品の賞味期限を管理して、賞味期限が近づけばお知らせを通知するアプリ。
- 食品（食品名、賞味期限の日付、通知送付回数)の情報を持ち、それぞれ登録、修正、削除ができる。 また、いくつかの項目で検索ができる。

## 作成背景

筋トレが趣味で私自身が料理を作るとき、食品の賞味期限の管理ができておらず、気がつけば賞味期限が過ぎていて、破棄することがあった。そこで賞味期限管理アプリを作成すれば紙やスマートフォンのメモ機能などで記録せず、アプリで一括管理でき、フードロス削減できるため作成する。

## 使用技術

- バックエンド
    - Java 17.0.7
    - SpringBoot 3.2.0
    - MyBatis
- フロントエンド
    - React (JavaScript)
    - Chakra UI
- その他
    - MySQL 8.0.35
    - Docker 24.0.5
    - 自動テスト
    - CI (Checkstyle, Discordへの通知, 自動テストを実行)
    - AWSデプロイ

## アプリケーション概略図
![アプリケーション概略図](https://github.com/tomo5610/Foodshelf-Manager-API/assets/132969138/42423295-1dea-4489-a200-49b9f5b8b573)

## アプリケーション機能一覧

- 食品新規登録機能  
  食品情報を新規登録できる。
- 食品検索機能  
  食品情報を検索できる。『食品名』、『賞味期限』、『お知らせ送付回数』の3項目で入力した項目で検索する。何も入力せずに検索した場合、全件表示する。
- 食品更新機能  
  食品情報を更新できる。
- 食品削除機能  
  食品情報を削除できる。

## 使用イメージ

## 画面詳細図

## API仕様書

[swaggerを用いたAPI仕様書](https://tomo5610.github.io/Foodshelf-Manager-API/)

## インフラ構成図

## ローカルでのアプリケーション起動方法

- Git, Java, Node.js, Dockerをインストールする。

- リポジトリをgit cloneする。  
  ```git clone https://github.com/kima-s/Notification-Management-API.git```

- クローンしたディレクトリに移動する。

- Dockerを起動する。  
  ```docker compose up```

- Spring Bootを起動する。  
  ```./gradlew bootRun```

- frontendディレクトリに移動する。  
  ```cd frontend/```

- 依存関係をインストールし、Reactのアプリケーションを起動す る。  
  ```npm install```  
  ```npm start```

## 自動テスト

以下のテストコードを実装。

- 単体テスト  
  NotificationServiceImpl  
  NotificationMapper
- 結合テスト  
  NotificationController

自動テストの実行結果

## 苦労したこと

## 振り返り

## 今後の展望


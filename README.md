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
    - React 18.2.0(TypeScript)
    - Chakra UI
- その他
    - MySQL 8.0.35
    - Docker 24.0.5
    - 自動テスト
    - CI (Checkstyle, Discordへの通知, 自動テストを実行)
    - AWSデプロイ

## アプリケーション概略図
![アプリケーション概略図 (1)](https://github.com/tomo5610/Foodshelf-Manager-API/assets/132969138/6107f6ff-cf5c-4785-88e9-cc6152eafe71)

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

### 登録
https://github.com/tomo5610/Foodshelf-Manager-API/assets/132969138/9b431798-323e-4810-85a1-968df1c0e0d0


### 検索
https://github.com/tomo5610/Foodshelf-Manager-API/assets/132969138/9afc316a-f3ef-4d8a-8496-b1ca837b3748


### 更新
https://github.com/tomo5610/Foodshelf-Manager-API/assets/132969138/0bbcdc1f-ae19-4ad8-ab0f-fa8223cc3fe3


### 削除
https://github.com/tomo5610/Foodshelf-Manager-API/assets/132969138/3a1d558a-dba0-4087-8387-d31b6fef329b

### メール通知機能
<img width="471" alt="スクリーンショット 2024-01-31 12 19 17" src="https://github.com/tomo5610/Foodshelf-Manager-API/assets/132969138/72ddac13-9ba2-446d-960f-750bb57728cf">


## 画面詳細図

## API仕様書

[swaggerを用いたAPI仕様書](https://tomo5610.github.io/Foodshelf-Manager-API/)

## インフラ構成図
![foodshelf-aws](https://github.com/tomo5610/Foodshelf-Manager-API/assets/132969138/80cacd1b-00ac-4f22-8715-cb9e71b8ec61)


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
  FoodshelfServiceImpl  
  FoodshelfMapper
- 結合テスト  
  FoodshelfController

自動テストの実行結果
<table><tr><th><th>Tests</th><th>Passed ✅</th><th>Skipped ⏭️</th><th>Failed ❌</th></tr><tr><td>JUnit Test Report</td><td>22 ran</td><td>22 passed</td><td>0 skipped</td><td>0 failed</td></tr></table>

自動テストの実行結果

## 苦労したこと

## 振り返り

## 今後の展望


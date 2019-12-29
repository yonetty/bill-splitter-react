# Bill Splitter (React example)

## What's this?
* React勉強のために作ったサンプル。
* `create-react-app` で作成し、TypeScriptでコードを書いた。

## How to execute?
```
$ yarn install
$ yarn start
```

## Memo
TypeScriptでReactアプリを書く場合のメモ書き。

### プロジェクトの作成
npm 5.2以降は入ってるとして、以下でプロジェクトを作成。
```
$ npx create-react-app bill-splitter-react --typescript
```

### ステートフルコンポーネントの作成
* TypeScriptなので、プロパティとステートはちゃんと型を定義して。

```typescript
import React, { Component } from 'react';

type DetailProps = {
  name: string;
  kind: string;
  amount: number;
  deletable: boolean;
  rowIndex: number;
  onNameChange: (rowIndex: number, name: string) => void;
  onKindChange: (rowIndex: number, kind: string) => void;
  onAmountChange: (rowIndex: number, amount: number) => void;
  onDeleteClick: (rowIndex: number) => void;
  onAddClick: (rowIndex: number) => void;
}
```

* `Component` 継承時に、プロパティとステートの型パラメータを指定する。
* `render()` で `JSX` を返す。
* TypeScriptの場合、 `class` は `className` と書かないと怒られる。同様に `<label>` の `for` は `htmlFor` で。

```typescript
// 明細コンポーネント
class Detail extends Component<DetailProps, {}> {
  render() {
    return (
      <div className="bs-detail">
        <input
          type="text"
          value={this.props.name}
          placeholder="名前を入力"
          onChange={e => this.handleNameChange(e)}
        />
```

* イベントの型は `any` でもいいんだけど、ちゃんと書くとこんな感じ

```typescript
    handlePaymentChange(e: React.ChangeEvent<HTMLInputElement>) {
        const payment = Number(e.target.value);
        if (payment) {
            this.props.onChange(payment);
        }
    }
```


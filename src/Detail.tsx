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
        <label>
          <input
            type="radio"
            value="fix"
            checked={this.props.kind === 'fix'}
            onChange={e => this.handleKindChange(e)}
          />固定
        </label>
        <label>
          <input
            type="radio"
            value="split"
            checked={this.props.kind === 'split'}
            onChange={e => this.handleKindChange(e)}
          />割り勘
        </label>
        <input
          type="text" className="numeral"
          value={this.props.amount}
          onChange={e => this.handleAmountChange(e)}
        />
        <input
          type="button"
          value="削除"
          disabled={!this.props.deletable}
          onClick={e => this.handleDeleteClick(e)}
        />
        <input
          type="button"
          value="追加"
          onClick={e => this.handleAddClick(e)}
        />
      </div>
    );
  }

  handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onNameChange(this.props.rowIndex, e.target.value);
  }

  handleKindChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onKindChange(this.props.rowIndex, e.target.value);
  }

  handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const amount = Number(e.target.value);
    if (amount) {
      this.props.onAmountChange(this.props.rowIndex, amount);
    }
  }

  handleDeleteClick(e: React.MouseEvent<HTMLInputElement>) {
    this.props.onDeleteClick(this.props.rowIndex);
  }

  handleAddClick(e: React.MouseEvent<HTMLInputElement>) {
    this.props.onAddClick(this.props.rowIndex);
  }

}

export default Detail;
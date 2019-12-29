import React, { Component } from 'react';
import Header from "./Header";
import Detail from "./Detail";

type Participant = {
  name: string;
  kind: string;
  amount: number;
}

type BillSplitterState = {
  payment: number;
  total: number;
  remainder: number;
  participants: Participant[];
}

// 割り勘計算機コンポーネント
class BillSplitter extends Component<{}, BillSplitterState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      payment: 0, //支払額
      total: 0, //合計額
      remainder: 0, //端数
      participants: new Array(3).fill(null).map(() => ({ name: '', kind: 'split', amount: 0 })), //参加者
    };
  }

  handlePaymentChange(payment: number) {
    this.recalcSplitAmount(payment, this.state.participants);
  }

  recalcSplitAmount(payment: number, participants: Participant[]) {
    // (支払額 - 固定支払いの人の合計) / (割り勘支払い人数) => 一人あたり割り勘金額
    const fixSum = participants.filter(p => p.kind === 'fix').map(p => p.amount).reduce((a, x) => a += x, 0);
    const splitNum = participants.filter(p => p.kind === 'split').length;
    let splitAmount: number;
    if (payment > fixSum && splitNum) {
      // 100円単位で切り捨て
      const splitAmountTmp = (payment - fixSum) / splitNum;
      splitAmount = Math.floor(splitAmountTmp / 100) * 100;
    } else {
      splitAmount = 0;
    }

    const newParticipants = participants.map(p => {
      const amount = p.kind === 'fix' ? p.amount : splitAmount;
      return Object.assign({}, p, { amount: amount });
    });
    const total = newParticipants.map(p => p.amount).reduce((a, x) => a += x, 0);
    const remainder = payment - total;

    // 状態更新
    this.setState({
      payment: payment,
      total: total,
      remainder: remainder,
      participants: newParticipants,
    });
  }

  handleParticipantNameChange(index: number, newName: string) {
    const participants = this.state.participants.map((p, i) => {
      const name = (i === index) ? newName : p.name;
      return Object.assign({}, p, { name: name });
    })
    // 金額の変更はないので、参加者のデータ更新のみ
    this.setState({
      participants: participants,
    });
  }

  handleParticipantKindChange(index: number, newKind: string) {
    const participants = this.state.participants.map((p, i) => {
      const kind = (i === index) ? newKind : p.kind;
      return Object.assign({}, p, { kind: kind });
    })
    this.recalcSplitAmount(this.state.payment, participants);
  }

  handleParticipantAmountChange(index: number, newAmount: number) {
    const participants = this.state.participants.map((p, i) => {
      const amount = (i === index) ? newAmount : p.amount;
      return Object.assign({}, p, { amount: amount });
    })
    this.recalcSplitAmount(this.state.payment, participants);
  }

  handleParticipantDeleteClick(index: number) {
    const p1 = this.state.participants.slice(0, index)
    const p2 = this.state.participants.slice(index + 1);
    const participants = p1.concat(p2);
    this.recalcSplitAmount(this.state.payment, participants);
  }

  handleParticipantAddClick(index: number) {
    const p1 = this.state.participants.slice(0, index + 1)
    const p2 = this.state.participants.slice(index + 1);
    const participants = p1.concat({ name: '', kind: 'split', amount: 0 }).concat(p2);
    this.recalcSplitAmount(this.state.payment, participants);
  }

  render() {
    const details = this.state.participants.map((person, idx) => {
      return (
        <Detail
          key={idx}
          rowIndex={idx}
          {...person}
          deletable={this.state.participants.length > 2}
          onNameChange={(i, n) => this.handleParticipantNameChange(i, n)}
          onKindChange={(i, k) => this.handleParticipantKindChange(i, k)}
          onAmountChange={(i, a) => this.handleParticipantAmountChange(i, a)}
          onDeleteClick={(i) => this.handleParticipantDeleteClick(i)}
          onAddClick={(i) => this.handleParticipantAddClick(i)}
        />
      );
    })
    return (
      <div className="bs">
        <Header
          payment={this.state.payment}
          total={this.state.total}
          remainder={this.state.remainder}
          participantsNumber={this.state.participants.length}
          onChange={(p) => this.handlePaymentChange(p)}
        />
        {details}
      </div>
    );
  }

}

export default BillSplitter;

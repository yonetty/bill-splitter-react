import React, { Component } from 'react';

type HeaderProps = {
    payment: number;
    total: number;
    remainder: number;
    participantsNumber: number;
    onChange: (p: number) => void;
}

// ヘッダーコンポーネント
class Header extends Component<HeaderProps, {}> {
    render() {
        return (
            <div className="bs-header">
                <div>
                    <label htmlFor="hdr-payment">支払額:</label>
                    <input id="hdr-payment" type="text" className="numeral"
                        value={this.props.payment}
                        onChange={e => this.handlePaymentChange(e)} />
                </div>
                <div>
                    <label htmlFor="hdr-total">合計額:</label>
                    <input id="hdr-total" type="text" className="numeral"
                        value={this.props.total} readOnly />
                </div>
                <div>
                    <label htmlFor="hdr-remainder">端数:</label>
                    <input id="hdr-remainder" type="text" className="numeral"
                        value={this.props.remainder} readOnly />
                </div>
                <div>
                    <label htmlFor="hdr-participants">人数:</label>
                    <input id="hdr-participants" type="text" className="numeral"
                        value={this.props.participantsNumber} readOnly />
                </div>
            </div>
        );
    }

    handlePaymentChange(e: React.ChangeEvent<HTMLInputElement>) {
        const payment = Number(e.target.value);
        if (payment) {
            this.props.onChange(payment);
        }
    }
}

export default Header;
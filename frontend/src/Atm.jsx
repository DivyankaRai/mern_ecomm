import React, { useState } from 'react';
import { ATMCard } from 'atm-card-react';

const Atm = () => {

    const [number, setNumber] = useState('');
    const [month, setMonth] = useState(2);
    const [year, setYear] = useState(22);
    const [holder, setHolder] = useState('');
    const [cvv, setCvv] = useState('');

  return (
    <div style={{marginTop: "9%"}}>
      <ATMCard
            style={{backgroundColor:"blue"}}
              year={year}
              month={month}
              cvv={cvv}
              number={number}
              holderName={holder}
              bankLogo={
                <img src='data:image/png;base64,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'/>
              }
              lifted
              system="mastercard"
              onChange={(data) => {
                setNumber(data.number);
                setCvv(data.cvv);
                setMonth(data.month);
                setYear(data.year);
                setHolder(data.holder);
              }}/>
    </div>
  )
}

export default Atm

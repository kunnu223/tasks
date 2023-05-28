import React, { useState, useEffect } from 'react';

export default function App() {
  const [args, setArgs] = useState([{
    name: 'My Arg',
    value: false
  }]);

  const [result, setResult] = useState(undefined);

  return <div>
    {args.map((arg, i) => {
      return <div key={i}>
        <input type="text" value={arg.name} onChange={e => {
          const newArgs = [...args];
          newArgs[i].name = e.target.value;
          setArgs(newArgs);
        }} />
        <select value={arg.value} onChange={e => {
          const newArgs = [...args];
          newArgs[i].value = e.target.value;
          setArgs(newArgs);
        }}>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
      </div>
    })}
    <button onClick={() => {
      const newArgs = [...args];
      newArgs.push({
        name: 'newarg',
        value: false
      });
      setArgs(newArgs);
    }}>
      + add arg
    </button>
    <div style={{ marginTop: '30px' }}>

    </div>
    <LogicHandler args={args} result={result} setResult={setResult} />

    <div style={{ marginTop: '30px' }}>result: {result !== undefined ? result.toString() : 'undefined'}</div>
  </div>
}

function LogicHandler({ args, result, setResult }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedConstant, setSelectedConstant] = useState(true);
  const [selectedArgument, setSelectedArgument] = useState(0);

  const [result1, setResult1] = useState(true);
  const [result2, setResult2] = useState(true);

  useEffect(() => {
    if (selectedOption) {
      if (selectedOption === 'constant') {
        setResult(selectedConstant);
      } else if (selectedOption === 'argument') {
        setResult(args[selectedArgument].value);
      } else if (selectedOption === "and") {
        setResult(result1 && result2);
      } else if (selectedOption === "or") {
        setResult(result1 || result2);
      }
    } else {
      setResult(undefined);
    }
  }, [selectedOption, selectedConstant, selectedArgument, args, setResult, result1, result2]);

  return (<div>
    <div>
      <div>

      </div>
      {(!selectedOption) &&
        <div>
          <select value={selectedOption} onChange={e => {
            setSelectedOption(e.target.value);
          }}>
            <option value={null}>select...</option>
            <option value="constant">constant</option>
            <option value="argument">argument</option>
            <option value="and">and</option>
            <option value="or">or</option>
          </select>
          <button onClick={() => setSelectedOption(null)}>x</button>
        </div>
      }
      {
        selectedOption === 'constant' &&
        <div>
          <select value={selectedConstant.toString()} onChange={e => {
            setSelectedConstant((e.target.value === 'true'));
          }}>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <button onClick={() => setSelectedOption(null)}>x</button>
        </div>
      }
      {
        selectedOption === "argument" &&
        <div>
          <select value={selectedArgument} onChange={e => {
            setSelectedArgument(parseInt(e.target.value));
          }}>
            {args.map((arg, i) => {
              return <option value={i} key={i}>{arg.name}</option>
            })}
          </select>
          <button onClick={() => setSelectedOption(null)}>x</button>
        </div>
      }
      {
        (selectedOption === "and" || selectedOption === "or") &&
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: 'fit-content' }}>
          <div style={{width: '100%', display: 'flex'}}>
            <select value={selectedOption} onChange={e => {
              setSelectedOption(e.target.value);
            }}>
              <option value={null}>select...</option>
              <option value="constant">constant</option>
              <option value="argument">argument</option>
              <option value="and">and</option>
              <option value="or">or</option>
            </select>
            <button style={{marginLeft: 'auto'}} onClick={() => setSelectedOption(null)}>x</button>
          </div>
          <div style={{ marginLeft: '20px', marginRight: '22px'}}>
            <div><LogicHandler args={args} result={result1} setResult={setResult1} /></div>
            <div><LogicHandler args={args} result={result2} setResult={setResult2} /></div>
          </div>
        </div>
      }
    </div>
  </div>)
}